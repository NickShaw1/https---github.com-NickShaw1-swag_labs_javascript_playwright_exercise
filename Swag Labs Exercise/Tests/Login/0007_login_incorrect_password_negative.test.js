import { test, expect } from '@playwright/test';

// Test with incorrect password entered, but user clicks login
test('incorrect_password', async ({ page }) => {
  // Enter a correct username and an incorrect password
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user'); // Correct username
  await page.locator('[data-test="password"]').fill('wrong_password'); // Incorrect password

  // Click the login button
  await page.locator('[data-test="login-button"]').click();

  // Check for error message for incorrect password
  const errorMessage = await page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();  // Ensure the error message is visible
  await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');  // Validate the correct error message
});