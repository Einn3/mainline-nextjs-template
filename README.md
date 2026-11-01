# Mainline Next.js Template

Mainline is a responsive product and marketing website built with Next.js 15, React 19, Tailwind CSS 4, and shadcn/ui. This fork extends the original template with English and Spanish content, interactive language transitions, newsletter signup UI, and expanded SEO metadata.

- [Live demo](https://mainline-nextjs-template.vercel.app/)
- [Template documentation](https://docs.shadcnblocks.com/templates/getting-started)
- [Figma design](https://www.figma.com/design/cFCLMj7DFv0sK7EVsqKeTa/Mainline?node-id=23250-13201&t=I1nAdchDpknii5Bd-1)
- [Changelog](./CHANGELOG.md)

![Mainline Next.js Template screenshot](./public/og-image.jpg)

## Getting Started

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server on port 3000. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. Run `npm run build` first. |
| `npm run lint` | Run the configured Next.js lint command with automatic fixes. |
| `npm run format` | Format project files with Prettier. |

## Technology

- **Next.js 15 App Router** and **React 19**
- **TypeScript** and **Tailwind CSS 4**
- **shadcn/ui** and Radix UI primitives
- **Motion** animations, including animated transitions and counters
- **React Hook Form** and **Zod** validation
- **next-themes** for light and dark themes
- **MDX** for content pages
- **Lucide React** and **React Icons**
- **DM Sans** local font files

## Features

- English and Spanish translations across the main pages and shared interface.
- Animated language switching with a dissolve/rebuild transition and progress HUD.
- Light and dark themes, responsive layouts, and animated counters for statistics and pricing.
- Newsletter signup form with email validation and loading/success feedback.
- Reading progress indicator and a floating back-to-top button.
- Shared navigation, hero, feature, logo, resource allocation, testimonial, pricing, FAQ, and footer sections.
- Centralized SEO metadata with page titles and descriptions, canonical URLs, Open Graph and social cards, and SoftwareApplication JSON-LD.
- Search engine indexing directives, including `noindex` metadata for sign-in and sign-up pages.
- MDX content support, server actions through `next-safe-action`, and reusable form components.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/pricing` | Pricing |
| `/faq` | Frequently asked questions |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/login` | Sign in |
| `/signup` | Sign up |
| Not found | Custom 404 page |

## SEO Configuration

Page metadata is created in `src/lib/seo.ts`. Set `NEXT_PUBLIC_APP_URL` to the canonical public site URL when deploying. If it is not set, the app uses `VERCEL_URL` when available and otherwise falls back to `http://localhost:3000`.

## Deployment

The Next.js configuration enables standalone output. The project can be deployed to Vercel or run in an environment that supports Next.js standalone builds.

## Project Structure

- `src/app/` — App Router pages and layouts
- `src/components/blocks/` — page sections and shared content blocks
- `src/components/` — navigation, language, theme, and scroll components
- `src/context/language-context.tsx` — English and Spanish translations
- `src/lib/seo.ts` — shared site configuration and metadata helpers
- `CHANGELOG.md` — project changes and release history

## Credits

- Original template: [shadcnblocks.com](https://shadcnblocks.com)
- Design: [Callum Flack](https://x.com/callumflack)
- Development: [Yassine Zaanouni](https://x.com/YassineZaanouni)
- Production: [Rob Austin](https://x.com/ausrobdev)
