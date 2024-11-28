import { test, expect } from '@playwright/test';

// Test for some general checks against the cart page
test('test', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  // Adding items to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // Navigate to the shopping cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Check that "Description" and "QTY" labels are visible in the cart
  await expect(page.locator('text=Swag Labs')).toBeVisible();  // Check for 'Swag Labs' label
  await expect(page.locator('text=Your Cart')).toBeVisible();  // Check for 'Your Cart' label
  await expect(page.locator('text=Description')).toBeVisible();  // Check for 'Description' label
  await expect(page.locator('text=QTY')).toBeVisible();  // Check for 'QTY' label

  // Continue with the rest of the test actions
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="continue-shopping"]').click();
  
  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
