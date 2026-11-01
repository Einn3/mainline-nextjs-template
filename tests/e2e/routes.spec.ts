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

test("testimonials carousel responds to next and previous controls", async ({ page }) => {
  await page.goto("/");
  const carousel = page.locator('[aria-roledescription="carousel"]').first();
  await carousel.scrollIntoViewIfNeeded();

  const firstSlide = carousel.locator('[aria-roledescription="slide"]').first();
  const track = firstSlide.locator("xpath=..");
  const initialStyle = await track.getAttribute("style");

  await carousel.getByRole("button", { name: "Next slide" }).click();
  await expect.poll(() => track.getAttribute("style")).not.toBe(initialStyle);

  await carousel.getByRole("button", { name: "Previous slide" }).click();
  await expect.poll(() => track.getAttribute("style")).toBe(initialStyle);
});

test("FAQ accordion expands and collapses an answer", async ({ page }) => {
  await page.goto("/faq");

  const question = page
    .getByRole("button", {
      name: "How do I update my account without breaking my laptop?",
    })
    .first();

  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");

  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
});
