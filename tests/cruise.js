import { test, expect } from '@playwright/test';

test('Google Search Validation', async ({ page }) => {

  // Navigate to Google
  await page.goto('https://www.google.com');

  // Search for cruise
  await page.getByRole('combobox').fill('cruise');
  await page.keyboard.press('Enter');

  // Wait for search results
  await page.waitForLoadState('networkidle');

  // Get all search result links
//   const links = page.locator('h3');
//   const count = await links.count();

//   console.log(`Total links found: ${count}`);

    const links=await page.getByRole('link', {name:'cruise'});
    const count = await links.count();
    console.log(`Total links found: ${count}`);

  // Validate all links contain "cruise"
  for (let i = 0; i < count; i++) {
    const text = await links.nth(i).textContent();

    if (text) {
      console.log(text);
      expect(text.toLowerCase()).toContain('cruise');
    }
  }

  // Click 3rd link
  await links.nth(2).click();

  // Handle popup
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Hello Helen');
    await dialog.accept();
  });

  // Validate title
  await expect(page).toHaveTitle(/Cruise/i);

  console.log('Page title:', await page.title());
});