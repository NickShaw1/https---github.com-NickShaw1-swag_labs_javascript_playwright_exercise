import { test, expect } from '@playwright/test';

// Test that sidebar behaves as expected
test('sidebar_nav_check', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

   // Sidebar navigation - All inventory
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="inventory-sidebar-link"]').click();
  await page.getByRole('button', { name: 'Close Menu' }).click();

  // Sidebar navigation - Sauce labs link
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="about-sidebar-link"]').click();
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Sidebar navigation - Reset inventory
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="reset-sidebar-link"]').click();
  await page.getByRole('button', { name: 'Close Menu' }).click();

  // Sidebar navigation - Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});