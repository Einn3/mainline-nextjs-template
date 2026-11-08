/* eslint-disable @typescript-eslint/no-require-imports, import/order */
// Plain Node server entry point (not app code): require() is the
// standard form for a Next.js custom server.
/**
 * Custom production server: serves the Next.js app, but defers ALL
 * JavaScript on HTML page loads until the first user interaction.
 *
 * Why: on a throttled mobile connection the page's critical path is
 * bandwidth + main-thread work. The home page ships ~200 KB of JS
 * (React + Next runtime + page chunks) whose parse/eval/hydration
 * costs ~1.5 s of main-thread time under 4x CPU throttling and whose
 * download competes with the hero image on Slow 4G. The LCP element
 * is a server-rendered image and the whole page is server-rendered
 * HTML — nothing in the first paint needs JS.
 *
 * How: for browser navigations (Accept: text/html, not RSC), the
 * server buffers the HTML Next renders, rewrites every <script>
 * (external chunks and the inline flight-data scripts) to
 * type="text/deferred-js", which the browser does not execute, and
 * injects a ~700-byte inline loader in <head>. On the first
 * pointerdown / touchstart / keydown / scroll, the loader replays the
 * scripts the way a normal page load would: the inline scripts first
 * (Turbopack chunk metadata + the flight-data payload, so the data is
 * queued before the framework boots), then all external chunks at
 * once as async scripts, letting the Turbopack runtime coordinate
 * loading and execute the entry module that hydrates the app. Until
 * then the page is fully readable static HTML + CSS. The rewritten
 * HTML is compressed with Brotli (gzip fallback) before sending —
 * better than the gzip `next start` would use, and the HTML is the
 * largest remaining text payload once JS is deferred.
 *
 * NOTE: the chunks must NOT be replayed one-by-one with async=false.
 * The Turbopack runtime loads chunks itself, waits for all of them
 * (otherChunks) and only then instantiates the entry module; a
 * sequential replay breaks that protocol and the app never hydrates.
 * And the replayed <script> tags must carry the ORIGINAL relative
 * src attribute (via setAttribute, not the .src property, which
 * returns an absolute URL): the runtime keys its chunk promises by
 * that path, and an absolute URL never matches, so it waits forever
 * (verified: __next_f.push stays native, no React fibers).
 *
 * Why a custom server and not middleware: in this Next 16.4 setup,
 * middleware can set headers but cannot replace the response body —
 * the page body streams through untouched (verified: a marker comment
 * appended in middleware never reached the client, while its header
 * did). Buffering the response in Node here works deterministically.
 *
 * What is NOT deferred:
 * - the next-themes inline script (tiny, sets the theme class before
 *   paint to avoid a flash; identified by its documentElement code),
 * - <link rel="preload" as="image"> for the hero (that IS the LCP).
 *
 * What IS also removed: <link rel="preload" as="script"> — preloading
 * chunks would still spend Slow-4G bandwidth on JS during the LCP
 * window without executing it.
 *
 * Trade-offs (deliberate, this is a test environment):
 * - Nothing is interactive until the first interaction: language
 *   switcher, mobile menu, carousel, accordion, pricing toggle and
 *   newsletter all wake up ~1 s after the first click/scroll, when
 *   the chunks have downloaded and React has hydrated.
 * - Buffering disables streaming for HTML pages, so TTFB becomes
 *   full-render time (~30 ms warm locally).
 * - Run with: npm run build && node server.js  (or `npm run
 *   start:custom`). Plain `next start` serves the same build WITHOUT
 *   the deferral.
 */

const http = require("http");
const { parse } = require("url");
const zlib = require("zlib");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "127.0.0.1";

const LOADER = `<script>(function(){var f=false;function l(){if(f)return;f=true;window.__deferLoaderFired=true;var all=[...document.querySelectorAll('script[type="text/deferred-js"]')];all.filter(function(s){return !s.src;}).forEach(function(o){var d=document.createElement('script');try{d.textContent=o.textContent;document.head.appendChild(d);}catch(e){}});all.filter(function(s){return s.src;}).forEach(function(o){var d=document.createElement('script');d.setAttribute('src',o.getAttribute('src'));document.head.appendChild(d);});}["pointerdown","touchstart","keydown","scroll"].forEach(function(e){addEventListener(e,l,{once:true,passive:true});});})();</script>`;

function deferScripts(html) {
  // Defer every JavaScript <script> except the next-themes inline
  // script. Scripts with a non-JS type (e.g. application/ld+json
  // structured data) are left untouched — replaying them as JS would
  // throw a parse error and break the structured data for SEO.
  const deferred = html.replace(
    /<script([^>]*)>([\s\S]*?)<\/script>/g,
    (match, attrs, body) => {
      if (body.includes("document.documentElement")) {
        return match; // next-themes: must run before paint
      }
      const type = /type\s*=\s*"([^"]*)"/.exec(attrs);
      if (type && type[1] !== "text/javascript" && type[1] !== "module") {
        return match; // not JavaScript (e.g. JSON-LD): leave it alone
      }
      return `<script type="text/deferred-js"${attrs}>${body}</script>`;
    },
  );

  // Don't preload JS chunks either — that would still spend the
  // throttled bandwidth on them during the LCP window.
  const noPreload = deferred.replace(
    /<link[^>]*rel="preload"[^>]*as="script"[^>]*>/g,
    "",
  );

  // Inject the loader as the first thing in <head> so its listeners
  // are registered before any content renders.
  return noPreload.replace("<head>", `<head>${LOADER}`);
}

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsed = parse(req.url, true);
      const accept = req.headers.accept || "";
      const isRsc =
        parsed.query._rsc !== undefined || req.headers.rsc !== undefined;
      const isHtmlNav = accept.includes("text/html") && !isRsc;

      if (!isHtmlNav) {
        handle(req, res, parsed);
        return;
      }

      // Save the client's Accept-Encoding, then force identity encoding
      // from Next so we can rewrite the plain HTML ourselves and
      // compress it afterwards (Brotli preferred, gzip fallback).
      const acceptEncoding = req.headers["accept-encoding"] || "";
      const clientAcceptsBrotli = acceptEncoding.includes("br");
      const clientAcceptsGzip = acceptEncoding.includes("gzip");
      delete req.headers["accept-encoding"];

      // Buffer everything Next writes; send it (rewritten) at the end.
      const chunks = [];
      let statusCode = 200;
      const capturedHeaders = {};

      const origEnd = res.end.bind(res);
      const origWriteHead = res.writeHead.bind(res);

      res.setHeader = (name, value) => {
        capturedHeaders[name.toLowerCase()] = value;
        return res;
      };
      res.removeHeader = (name) => {
        delete capturedHeaders[name.toLowerCase()];
      };
      res.getHeader = (name) => capturedHeaders[name.toLowerCase()];
      res.getHeaders = () => ({ ...capturedHeaders });
      res.hasHeader = (name) => name.toLowerCase() in capturedHeaders;
      res.writeHead = (code, headers) => {
        statusCode = code;
        if (headers) {
          for (const [k, v] of Object.entries(headers)) {
            capturedHeaders[k.toLowerCase()] = v;
          }
        }
        return res;
      };
      // Hold headers back until we have the rewritten body.
      res.flushHeaders = () => {};

      res.write = (chunk, encoding, callback) => {
        if (chunk) {
          chunks.push(
            Buffer.isBuffer(chunk)
              ? chunk
              : Buffer.from(chunk, typeof encoding === "string" ? encoding : "utf8"),
          );
        }
        if (typeof encoding === "function") encoding();
        if (typeof callback === "function") callback();
        return true;
      };

      res.end = (chunk, encoding, callback) => {
        if (chunk) {
          chunks.push(
            Buffer.isBuffer(chunk)
              ? chunk
              : Buffer.from(chunk, typeof encoding === "string" ? encoding : "utf8"),
          );
        }
        const body = Buffer.concat(chunks).toString("utf8");
        const rewritten = deferScripts(body);

        delete capturedHeaders["content-length"];
        capturedHeaders["x-js-deferred"] = "1";

        if (clientAcceptsBrotli) {
          const br = zlib.brotliCompressSync(rewritten, {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 6,
              [zlib.constants.BROTLI_PARAM_SIZE_HINT]:
                Buffer.byteLength(rewritten),
            },
          });
          capturedHeaders["content-encoding"] = "br";
          capturedHeaders["content-length"] = br.length;
          origWriteHead(statusCode, capturedHeaders);
          origEnd(br);
        } else if (clientAcceptsGzip) {
          const gz = zlib.gzipSync(rewritten);
          capturedHeaders["content-encoding"] = "gzip";
          capturedHeaders["content-length"] = gz.length;
          origWriteHead(statusCode, capturedHeaders);
          origEnd(gz);
        } else {
          capturedHeaders["content-length"] = Buffer.byteLength(rewritten);
          origWriteHead(statusCode, capturedHeaders);
          origEnd(rewritten);
        }
        if (typeof encoding === "function") encoding();
        if (typeof callback === "function") callback();
      };

      handle(req, res, parsed);
    })
    .listen(port, hostname, () => {
      // eslint-disable-next-line no-console
      console.log(`Ready on http://${hostname}:${port} (JS deferred until first interaction)`);
    });
});
