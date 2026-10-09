import { test, expect,request } from '@playwright/test';

const APIrequest = {
  userEmail: "helen100@gmail.com",
  userPassword: "Helendaisy#5"
};

test.only("API", async () => {
  const apiContext = await request.newContext();

  const apiResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: APIrequest
    }
  );

  console.log("status:", apiResponse.status());
  expect(apiResponse.ok()).toBeTruthy();

  // ✅ FIX: await json()
  const loginResponse = await apiResponse.json();

  // ✅ Now token works correctly
  const token = loginResponse.token;

  console.log("Token:", token);
});


test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill('helen100@gmail.com');
    await page.locator('#userPassword').fill('Helendaisy#5');
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});