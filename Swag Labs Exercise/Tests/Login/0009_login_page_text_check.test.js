import { test, expect } from '@playwright/test';

// Test to check text on the login page
test('all_text_on_page_check', async ({ page }) => {
  // Test for missing username
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="login-button"]').click();

  // Check for error message related to missing username
  const errorMessage = await page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/^Epic sadface: Username is required$/);  // Error for missing username

  // Open the login credentials section and check for accepted usernames
  await page.getByRole('heading', { name: 'Accepted usernames are:' }).click();
  const credentialsText = await page.locator('[data-test="login-credentials"]').textContent();
  await expect(credentialsText).toContain('standard_user');
  await expect(credentialsText).toContain('locked_out_user');
  await expect(credentialsText).toContain('problem_user');
  await expect(credentialsText).toContain('performance_glitch_user');
  await expect(credentialsText).toContain('error_user');
  await expect(credentialsText).toContain('visual_user');

  // Open the password section and verify it contains 'secret_sauce'
  await page.getByRole('heading', { name: 'Password for all users:' }).click();
  const passwordText = await page.locator('[data-test="login-password"]').textContent();
  await expect(passwordText).toContain('secret_sauce');
});
