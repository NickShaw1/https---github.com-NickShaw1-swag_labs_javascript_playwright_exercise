import { test, expect } from '@playwright/test';

// Test to check that products can be added to cart from inventory page
test('add_to_cart_1', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Inventory item 1 check
  await page.getByText('carry.allTheThings() with the').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Inventory item 2 check
  await page.getByText('A red light isn\'t the desired').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // Inventory item 3 check
  await page.getByText('Get your testing superhero on').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

  // Inventory item 4 check
  await page.getByText('It\'s not every day that you').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

  // Inventory item 5 check
  await page.getByText('Rib snap infant onesie for').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

  // Inventory item 6 check
  await page.getByText('This classic Sauce Labs t-').click();
  await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();

  // Go to Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify that 1 inventory item 1 has been added to cart
  await page.getByText('carry.allTheThings() with the').click();
  await page.locator('[data-test="cart-list"] div').filter({ hasText: '1Sauce Labs Backpackcarry.' }).locator('[data-test="item-quantity"]').click();

  // Verify that 1 inventory item 2 has been added to cart
  await page.getByText('A red light isn\'t the desired').click();
  await page.locator('[data-test="cart-list"] div').filter({ hasText: '1Sauce Labs Bike LightA red' }).locator('[data-test="item-quantity"]').click();
  
  // Verify that 1 inventory item 3 has been added to cart
  await page.getByText('Get your testing superhero on').click();
  await page.locator('[data-test="cart-list"] div').filter({ hasText: '1Sauce Labs Bolt T-ShirtGet' }).locator('[data-test="item-quantity"]').click();
  
  // Verify that 1 inventory item 4 has been added to cart
  await page.getByText('It\'s not every day that you').click();
  await page.locator('[data-test="cart-list"] div').filter({ hasText: '1Sauce Labs Fleece JacketIt\'s' }).locator('[data-test="item-quantity"]').click();
  
  // Verify that 1 inventory item 5 has been added to cart
  await page.getByText('Rib snap infant onesie for').click();
  await page.locator('[data-test="cart-list"] div').filter({ hasText: '1Sauce Labs OnesieRib snap' }).locator('[data-test="item-quantity"]').click();
  
  // Verify that 1 inventory item 6 has been added to cart
  await page.getByText('This classic Sauce Labs t-').click();
  await page.locator('[data-test="cart-list"] div').filter({ hasText: '1Test.allTheThings() T-Shirt' }).locator('[data-test="item-quantity"]').click();

  //Check 'Continue Shopping' button
  await page.locator('[data-test="continue-shopping"]').click();

  // Logout
  await page.locator('[data-test="primary-header"] div').filter({ hasText: 'Swag Labs' }).first().click();
});