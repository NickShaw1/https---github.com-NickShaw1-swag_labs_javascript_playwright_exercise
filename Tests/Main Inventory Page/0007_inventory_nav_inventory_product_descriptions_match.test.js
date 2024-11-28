import { test, expect } from '@playwright/test';

// Test to determine that descriptions match on inventory (main) and product pages for each item
test('item_descriptions', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // List of inventory items with descriptions and data-test attributes
  const inventoryItems = [
    {
      name: 'Sauce Labs Backpack',
      description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
      dataTestTitle: '[data-test="item-4-title-link"]',
    },
    {
      name: 'Sauce Labs Bike Light',
      description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
      dataTestTitle: '[data-test="item-0-title-link"]',
    },
    {
      name: 'Sauce Labs Bolt T-Shirt',
      description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
      dataTestTitle: '[data-test="item-1-title-link"]',
    },
    {
      name: 'Sauce Labs Fleece Jacket',
      description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      dataTestTitle: '[data-test="item-5-title-link"]',
    },
    {
      name: 'Sauce Labs Onesie',
      description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
      dataTestTitle: '[data-test="item-2-title-link"]',
    },
    {
      name: 'Test.allTheThings() T-Shirt (Red)',
      description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
      dataTestTitle: '[data-test="item-3-title-link"]',
    },
  ];

  // Iterate over inventory items, verify descriptions, and add them to the cart
  for (const item of inventoryItems) {
    // Verify the description of the item on the Main Page before clicking
    const itemLocator = page.locator(item.dataTestTitle);
    const itemDescription = await itemLocator.locator('..').locator('.inventory_item_desc').textContent();
    expect(itemDescription).toBe(item.description);

    // Click the item link to navigate to the Product Details Page
    await itemLocator.click();

    // Verify the item description on the Product Details Page
    const actualDescription = await page.locator('.inventory_details_desc').textContent();
    expect(itemDescription).toBe(item.description);

    // Add the item to the cart
    await page.locator('[data-test="add-to-cart"]').click();

    // Go back to the inventory page
    await page.locator('[data-test="back-to-products"]').click();
  }

  // Navigate to the cart and verify all items are present
  await page.locator('[data-test="shopping-cart-link"]').click();
  for (const item of inventoryItems) {
    // Verify the item name and description in the cart
    const cartItem = await page.locator('.cart_item').filter({ hasText: item.name });
    const cartDescription = await cartItem.locator('.inventory_item_desc').textContent();
    expect(cartDescription?.trim()).toBe(item.description);
  }

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});
