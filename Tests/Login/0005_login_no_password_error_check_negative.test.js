import { test, expect } from '@playwright/test';

// Test when no password is added, but a user clicks login
test('no_password', async ({ page }) => {
  // Add a valid username
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');

  // Click on the login button without entering a password
  await page.locator('[data-test="login-button"]').click();

  // Locate the error message element
  const errorMessage = await page.locator('[data-test="error"]');

  // Check if the error message is visible and contains the correct text
  await expect(errorMessage).toBeVisible(); // Ensure the error message is visible
  await expect(errorMessage).toHaveText('Epic sadface: Password is required'); // Ensure the correct error message appears
});
