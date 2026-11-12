const {test, expect} = require("@playwright/test");


//this test will run exclusively due to test.only
test('First Playwright test', async ({ browser})=>
{ 
    const context = await browser.newContext();
    const page = await context.newPage();

//open page directly
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
// define the username locator
    const username = page.locator("#username");

//css selector for username field
    await username.fill("Sree");
    await page.locator("#password").fill("1234");
    await page.locator("#signInBtn").click();
// in selenium wait for element to be visible
   console.log (await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText("Incorrect");
   await username.fill("");
   await username.fill("rahulshettyacademy");
   await page.locator("#password").fill("Learning@830$3mK2");
   await page.locator("#signInBtn").click();
   console.log(await page.locator(".card-body a").nth(0).inputValue());
//to get 2nd element
   //console.log(await page.locator(".card-body a").nth(1).textContent());
//to get 3rd element 
   //console.log(await page.locator(".card-body a").nth(2).textContent());
// to get all the text contents of the elements
  const allTexts = await page.locator(".card-body a").allTextContents();
  console.log(allTexts);   
  expect(allTexts.length).toBeGreaterThan(0);
}); 
 

test.only('UI Controls', async ({page})=>
{ 
//open page directly
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/", { waitUntil : 'domcontentloaded' });
// define the username locator
    const username = page.locator("#username");
    const dropdown = page.locator("select.form-control");
    const docLink = page.locator("a[href*='documents-request']");

 // fill in the username and password fields
   await username.fill("rahulshettyacademy");
   await page.locator("#password").fill("Learning@830$3mK2");
   // select the option from the dropdown
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();
   //await page.pause();
   // validate if the radio button is checked
   expect(await page.locator(".radiotextsty").last().isChecked());
  //lick on the terms checkbox
   await page.locator("#terms").last().click();
   // validate if the terms checkbox is checked
   expect(await page.locator("#terms").last().isChecked()).toBe(true);
  // validate if the terms checkbox is unchecked
   await page.locator("#terms").last().uncheck();
   expect(await page.locator("#terms").last().isChecked()).toBe(false);
  //log console for the document link
   await expect(docLink).toHaveAttribute("class","blinkingText");
 // Validate if the document link has the correct class attribute
  await expect(docLink).toHaveAttribute("class", "blinkingText");
   await page.locator("#signInBtn").click();
   console.log(await page.locator(".card-body a").nth(0).textContent());
//to get 2nd element
   //console.log(await page.locator(".card-body a").nth(1).textContent());
//to get 3rd element 
   //console.log(await page.locator(".card-body a").nth(2).textContent());
// to get all the text contents of the elements
  const allTexts = await page.locator(".card-body a").allTextContents();
  console.log(allTexts);   
  expect(allTexts.length).toBeGreaterThan(0);
}); 
 