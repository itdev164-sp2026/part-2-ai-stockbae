import { expect, test, type Page } from "@playwright/test";

const testUserEmail = process.env.TEST_USER_EMAIL;
const testUserPassword = process.env.TEST_USER_PASSWORD;
const hasTestCredentials = Boolean(testUserEmail && testUserPassword);
const skipCredentialedTestsMessage =
  "Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run the authenticated auth tests.";

async function signIn(page: Page) {
  await page.goto("/login");
  await expect(page.getByText(/sign in to continue/i)).toBeVisible();

  await page.getByLabel("Email").fill(testUserEmail ?? "");
  await page.getByLabel("Password").fill(testUserPassword ?? "");
  await page.getByRole("button", { name: /^sign in$/i }).last().click();
  await page.waitForURL(/\/projects(?:\/)?$/);
}

test("Login page is visible with email, password, and submit controls", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByText(/sign in to continue/i)).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: /^sign in$/i }).last()).toBeVisible();
});

test.describe("Authenticated auth flow", () => {
  test.beforeEach(async ({ page }) => {
    test.skip(!hasTestCredentials, skipCredentialedTestsMessage);

    await signIn(page);
    await expect(page).toHaveURL(/\/projects(?:\/)?$/);
  });

  test("Redirects to the dashboard after a successful login", async ({ page }) => {
    await expect(page).toHaveURL(/\/projects(?:\/)?$/);
    await expect(page.getByRole("heading", { name: /projects/i })).toBeVisible();
  });

  test("Shows the sidebar navigation links after login", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Overview" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Settings" }).first()).toBeVisible();
  });
});
