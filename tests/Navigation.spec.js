import{test,expect} from '@playwright/test';

test("Navigation Test",async({page,browser})=>{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.goto('https://www.bing.com');
    const context=await browser.newContext();
    const newPage=await context.newPage();
    const newPage1=await context.newPage();

    
     await newPage.goto("http://google.com");
     // Navigation on new page

    await newPage1.goto('https://www.bing.com');
     await newPage.goBack();
     await newPage.goForward();

    //  const[newPage2]=await Promise.all[{
    //     await context.waitForEvent(newPage2),
    //     await page.
    //  }

    //  ]
})
