import { test, expect } from '@playwright/test';

test('has title', async ({ page, context }) => {
  await page.goto('https://practice-automation.com/window-operations/');
  const [newTab]= await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button',{name:"New Tab"}).click()
  ]);
  await newTab.waitForLoadState();

  console.log(await newTab.title());
});