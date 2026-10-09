import { test, expect } from '@playwright/test';
// import { test, expect } from "../fixtures/myFixtures.js";
import path from 'path';

test.describe("Form Validation", ()=>{
test("Input Boxes", async ({ page, formPageFixture }) => {

//   await page.goto("/selenium/web/formPage.html");
  await page.locator("#email").fill('test@test.com');
  await page.locator("#age").fill('25');
  await page.locator('[value="Hello there"]').click();
  await expect(page.locator("#greeting")).toBeVisible();
   const text = await page.locator("#greeting").textContent();
console.log(text);
expect(text).toBe("Success!");

});

test("Check Boxes",async ({page,formPageFixture})=>{
    //   await page.goto("/selenium/web/formPage.html");
      await page.locator("#checky").check();
      await expect(page.locator("#checky")).toBeChecked();
    //   Uncheck the second checkbox
    await page.locator('#checkedchecky').uncheck();
    await expect(page.locator('#checkedchecky')).not.toBeChecked();
});

test("Dropdown",async ({page,formPageFixture})=>{
    // await page.goto("https://www.selenium.dev/selenium/web/formPage.html");
    await page.locator("[name='selectomatic']").selectOption('two');
    await page.locator("[name='selectomatic']").selectOption({label:'Four'});
    await expect (page.locator("[name='selectomatic']")).toHaveValue('four')
    await page.close();
});
})
test("File Upload",async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/upload");
    // const filePath = path.resolve('C:/Users/helejr/Documents/TestData/sampleExcel.xlsx');    await page.locator("#file-upload").setInputFiles(filePath);
    const filePath=path.resolve("test-data/sampleExcel.xlsx");
    await page.locator("#file-upload").setInputFiles(filePath);
    await page.locator("#file-submit").click();
    await expect(page.locator('h3')).toContainText('File Uploaded!')
    await page.close();
});



test("Alerts",async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
     page.on('dialog',dialog=>{
        dialog.accept('test123');
    })
     //   await page.locator("[onclick='jsConfirm()']").click();

    // await page.locator("[onclick='jsAlert()']").click();
    await page.locator("[onclick='jsPrompt()']").click();
   
    // await page.close();
});

test("Login Page with valid credentials",async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByLabel("Username").fill("tomsmith");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Welcome to the Secure Area. When you are done click logout below.")).toBeVisible();
});

test("Login Page with invalid credentials",async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByLabel("Username").fill("tomsmith1");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Your username is invalid!")).toBeVisible();

});


test("IFRAMES",async({page})=>{
    await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
    const iFrame=page.frameLocator("[rel-title='Photo Manager'] iframe");
    await iFrame.getByAltText("The peaks of High Tatras").dragTo(iFrame.locator("#trash"));
});

test.only("Handling Tables- Filters",async({page})=>{
    await page.goto("https://practice.expandtesting.com/challenging-dom");
    await page.getByRole('row').filter({hasText: 'Definiebas2'}).getByRole('link', {name:'Edit'}).click();
});

