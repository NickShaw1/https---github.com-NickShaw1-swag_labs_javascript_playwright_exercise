import { test, expect } from '@playwright/test';

// Test for Checkout field validation
test('checkout_field_validation', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add items to the shopping cart
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Proceed to shopping cart
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

    // Check that "Description" and "QTY" labels are visible in the cart
    await expect(page.locator('text=Swag Labs')).toBeVisible();  // Check for 'Swag Labs' label
    await expect(page.locator('text=Checkout: Your Information')).toBeVisible();  // Check for 'Checkout' label

  // Fill in checkout information
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Test123');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Test123');
  
  // Continue to the next step
  await page.locator('[data-test="continue"]').click();

  // Handle missing postal code error
  await page.locator('[data-test="checkout-info-container"] div')
    .filter({ hasText: 'Error: Postal Code is required' })
    .nth(2)
    .click();
  await page.locator('[data-test="error-button"]').click();

  // Test: Clear first name and submit to check missing field error
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('Test123');
  await page.locator('[data-test="continue"]').click();

  // Handle missing first name error
  await page.locator('[data-test="checkout-info-container"] div')
    .filter({ hasText: 'Error: First Name is required' })
    .nth(2)
    .click();
  await page.locator('[data-test="error"]').click();
  await page.locator('[data-test="error-button"]').click();

  // Test: Clear postal code and submit to check missing field error
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Test123');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill(''); // Clear postal code
  await page.locator('[data-test="continue"]').click();

  // Handle missing postal code error
  await page.locator('[data-test="checkout-info-container"] div')
    .filter({ hasText: 'Error: Postal Code is required' })
    .nth(2)
    .click();
  await page.locator('[data-test="error"]').click();
  await page.locator('[data-test="error-button"]').click();

  // Complete the form with valid data and proceed
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('Test123');
  await page.locator('[data-test="continue"]').click();

  // Finish the checkout process
  await page.locator('[data-test="finish"]').click();

  // Return to products page
  await page.locator('[data-test="back-to-products"]').click();

  // Log out from the menu
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
