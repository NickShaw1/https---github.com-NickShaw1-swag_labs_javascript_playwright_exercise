import { test, expect } from '@playwright/test';

// Test that social links behave as expected
test('socials_check', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // X/Twitter
  const page1Promise = page.waitForEvent('popup');
  await page.locator('[data-test="social-twitter"]').click();
  const page1 = await page1Promise;
  await page1.close(); // Close the X/Twitter tab

  // Facebook
  const page2Promise = page.waitForEvent('popup');
  await page.locator('[data-test="social-facebook"]').click();
  const page2 = await page2Promise;
  await page2.close(); // Close the Facebook tab

  // Linkedin
  const page3Promise = page.waitForEvent('popup');
  await page.locator('[data-test="social-linkedin"]').click();
  const page3 = await page3Promise;
  await page3.close(); // Close the LinkedIn tab

  await expect(page.locator('text=© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')).toBeVisible();  // Check for All Rights Reserved

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});