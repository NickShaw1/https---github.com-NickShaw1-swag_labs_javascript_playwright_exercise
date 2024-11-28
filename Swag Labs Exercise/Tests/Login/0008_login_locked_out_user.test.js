import { test, expect } from '@playwright/test';

// Test to check a locked-out user can't login
test('incorrect_password', async ({ page }) => {
  // Enter a correct username and an incorrect password
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('locked_out_user'); // Correct username
  await page.locator('[data-test="password"]').fill('secret_sauce'); // Incorrect password

  // Click the login button
  await page.locator('[data-test="login-button"]').click();

  // Check for error message for incorrect password
  const errorMessage = await page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();  // Ensure the error message is visible
  await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');  // Validate the correct error message
});