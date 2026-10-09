import { test as base, expect } from '@playwright/test';

const test = base.extend({
  // ✅ UI fixture
  formPageFixture: async ({ page }, use) => {
    await page.goto('https://www.selenium.dev/selenium/web/formPage.html');
    await use(page);
    await page.close();
  },

  // ✅ API fixture
  apifixures: async ({ request }, use) => {
    const apiResponse = await request.post(
      "https://simple-tool-rental-api.click/api-clients",
      {
        data: {
          clientName: "Postman App",
          clientEmail: `user${Date.now()}@demoapi.com` // ✅ IMPORTANT
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const jsonResponse = await apiResponse.json();
    console.log("Auth Response:", jsonResponse);
    const accessToken = jsonResponse.accessToken;
    await use(accessToken); // ✅ pass token
  }

});

export { test, expect };