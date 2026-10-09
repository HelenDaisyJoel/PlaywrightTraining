import {test,expect} from "@playwright/test";

test("Validate Test",async({page})=>{

    await page.goto("https://webtestingcourse.dequecloud.com/");
    // await page.getByRole("combobox").fill("cruise");
    // await page.getByRole("button", {name:"Google Search"});
    // await page.keyboard.press("Enter");
    // await page.waitForLoadState('networkidle');
    // const headings=await page.getByRole("heading").all();
    // console.log(headings);

    await page.getByRole("link", {name: 'Desktops'}).click();
    const links=await page.getByRole("link", {name: 'Desktops'}).getAttribute("href");
    console.log(links);
    // await page.locator("#footer").scrollIntoViewIfNeeded();
    const footer=await page.locator("#footer");
    const FooterHeading=await footer.locator("h2").allTextContents();
    console.log(FooterHeading);
    await footer.locator("a").filter({hasText:"Verrottet 875"}).click();

    // Verify whether navigated properly

// await expect(page.getByRole('link', { name: 'Gefälscht' })).toBeVisible();
await expect(page.locator('h1').first()).toHaveText('Gefälscht');
await expect(    page.getByRole('heading', { name: 'Gefälscht' })).toBeVisible();
const images= await page.locator(".listingImg").isVisible();
});