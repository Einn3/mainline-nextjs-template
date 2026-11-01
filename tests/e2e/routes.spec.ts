import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/pricing",
  "/faq",
  "/contact",
  "/privacy",
  "/login",
  "/signup",
];

test("home page renders its primary heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1").first()).toBeVisible();
});

test("main routes respond successfully", async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response, `No response for ${route}`).not.toBeNull();
    expect(response!.status(), `Unexpected status for ${route}`).toBeLessThan(400);
  }
});
