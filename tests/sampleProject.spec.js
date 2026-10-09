import { test, expect } from '@playwright/test';

test('Login application', async ({ page, context }) => {
  await page.goto('https://community.cvent.com/training');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("	Training - Cvent Community");
  const allHeadings= await page.locator(".nav.navbar-nav > li > a").allTextContents();
  console.log(allHeadings)
  await page.locator('a[href="/resources"]').click();  
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.locator('a[href="/resources/product-news-event-management"]').click()
]);

await newPage.waitForLoadState();

console.log(await newPage.url());
});