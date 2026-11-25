const {test, expect} = require('@playwright/test');
test("Popup validations", async ({page}) =>
{
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   // IMP -Browser navigation validations
   // await page.goto("http://google.com");
   // await page.goBack();
   // await page.goForward();
   await expect(page.locator("#displayed-text")).toBeVisible();
   await page.locator("#hide-textbox").click();
   await expect(page.locator("#displayed-text")).toBeHidden();
   // await page.pause();
   // IMP - handaling dailog box
   page.on('dialog', dialog => dialog.accept());
   await page.locator("#confirmbtn").click();
   // IMP - Mouse hover validations
   await page.locator("#mousehover").hover();
   // IMP - Frame validations
   const framesPage = page.frameLocator("#courses-iframe");
   await framesPage.locator("li a[href*='lifetime-access']:visible").click();
   const textCheck = await framesPage.locator(".text h2").textContent();
   // IMP - Split Text content validations
   console.log(textCheck.split(" ")[1]);
});