import { test, expect } from "@playwright/test";
import { request } from "node:http";

// test("Amazon Test", async(page)=>{
//     page.goto("https://the-internet.herokuapp.com/");

// })

test("Handling Tables- Filters", async ({ page }) => {

    await page.goto("https://practice.expandtesting.com/challenging-dom");
    await page.getByRole('row').filter({ hasText: 'Definiebas2' }).getByRole('link', { name: 'Edit' }).click();
    // Locate footer text
    const footerText = page.locator('footer h4');
    // Scroll to footer
    await footerText.scrollIntoViewIfNeeded();
    const actualText = await footerText.textContent();
    const actualText1 = await footerText.innerText();
    const actualText2 = await footerText.all();

    console.log('Footer Text: ' + actualText);
    console.log('Footer Text: ' + actualText1);

    console.log('Footer Text: ' + actualText2);
    // Validate text
    await expect(footerText).toHaveText('Practice Test Automation WebSite for Web UI and Rest API');

    expect(await page.getByRole("link", { name: 'API Testing' })).toBeVisible();

    const responsePromise = page.waitForResponse(response => response.url().includes('/notes/api/swagger.json') && [200, 304].includes(response.status()) && response.request().method() === 'GET');
    await page.getByRole("link", { name: 'API Testing' }).click();
    await responsePromise;
    console.log(await page.getByRole('heading').first().textContent());

    await expect(page.getByRole('heading', { name: 'Notes API Documentation' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Notes API Documentation");
});

test("APITest", async ({ playwright }) => {
    const requestContext = await playwright.request.newContext({ ignoreHTTPSErrors: true });
    const formData = {
        name: 'HelenDais',
        email: 'helenDais123@gmail.com',
        password: 'HelenDais1'
    };
    // const context=await request.newContext();

    const response = await requestContext.post('https://practice.expandtesting.com/notes/api/users/register', {
        form: formData
    })
    console.log(await response.status());
        const responseBody = await response.json();
 
console.log(responseBody);

    // await expect(responseBody.message).toBe("User account created successfully");
    await expect(responseBody.data.email).toBe(formData.email);
})