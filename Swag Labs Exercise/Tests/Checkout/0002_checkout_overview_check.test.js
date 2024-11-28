import { test, expect } from '@playwright/test';

// Test checkout overview screen
test('checkout_overview', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add items to the shopping cart
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();

  // Navigate to the shopping cart and proceed to checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  // Fill in checkout information
  await page.locator('[data-test="firstName"]').click(); // First name field
  await page.locator('[data-test="firstName"]').fill('Test123');
  
  await page.locator('[data-test="lastName"]').click(); // Last name field
  await page.locator('[data-test="lastName"]').fill('Test123');
  
  await page.locator('[data-test="postalCode"]').click(); // Postal code field
  await page.locator('[data-test="postalCode"]').fill('Test123');
  
  // Attempt to continue to the next step
  await page.locator('[data-test="continue"]').click();

  // Calculate expected total (item total + tax)
  const itemTotal = 29.99 + 9.99 + 15.99; // sum of item prices
  const taxAmount = itemTotal * 0.08; // 8% tax
  const expectedTotalAmount = itemTotal + taxAmount;

  // Log the expected total to the console for reference
  console.log("Expected total is: ", expectedTotalAmount); // Should log 60.45

  // Verify front-end value
  const totalAmountElement = await page.locator('[data-test="total-label"]'); // The element showing total value
  const totalAmountText = await totalAmountElement.textContent(); // Get the total text
  console.log("Total text content: ", totalAmountText); // Log the raw text content

  // Parse the value from the text content, removing any non-numeric characters (like $)
  const displayedTotalAmount = parseFloat(totalAmountText.replace(/[^\d.-]/g, '').trim()); // Regex to remove non-numeric characters

  console.log("Displayed total amount is: ", displayedTotalAmount); // Log the displayed value for comparison

  // Compare the displayed total with the expected total (60.45)
  expect(displayedTotalAmount).toBeCloseTo(expectedTotalAmount, 1); // Use `toBeCloseTo` for floating-point precision

  // Page text checks
  await expect(page.locator('text=Swag Labs')).toBeVisible();  // Check for 'Swag Labs' label
  await expect(page.locator('text=Checkout: Overview')).toBeVisible();  // Check for 'Checkout' label
  await expect(page.locator('text=QTY')).toBeVisible();  // Check for 'QTY' label
  await expect(page.locator('text=Description')).toBeVisible();  // Check for 'Description' label
  
  // Finish the checkout process
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();

  // Open the menu and log out
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
