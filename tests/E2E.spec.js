const { test, expect } = require('@playwright/test');
 
 
 
 
test.only('@Webst Client App login', async ({ page }) => {

   await page.goto("https://rahulshettyacademy.com/client");
   const registerHereLink = "//a[contains(text(),'Register here')]";
   const firstName = "#firstName";
   const lastName = "#lastName";
   const email = "#userEmail";
   const phNo = "#userMobile";
   const occupation = "//select[@formcontrolname='occupation']";
   const gender = "//input[@value='Female']";
   const password = "#userPassword";
   const confirmPassword = "#confirmPassword";
   const ageConfirmation = "//input[@formcontrolname='required']";
   const registerBtn = "#login";
   const logingBtn = "#login";
   const accountCreationSuccess = "//h1[contains(text(),'Account Created Successfully')]";


await page.locator(registerHereLink).click();
await page.locator(firstName).fill("Subho");
await page.locator(lastName).fill("Sree");
//await page.locator(email).fill("subhosree1@example.com");
//await page.locator(email).fill(uniqueEmail);
//mailid change this in every run
const uniqueEmail = `subhosree+${Date.now()}@example.com`;
await page.locator(email).fill(uniqueEmail);
console.log(uniqueEmail);
//fill phone number
await page.locator(phNo).fill("1234567890");
//select occupation from dropdown
await page.locator(gender).click();
await page.locator(occupation).selectOption("Engineer"); 
await page.locator(password).fill("Iamking@000");
await page.locator(confirmPassword).fill("Iamking@000");
await page.locator(ageConfirmation).click();
await page.locator(registerBtn).click()
//assertion for account creation message   
const accountCreationMessage = await page.locator(accountCreationSuccess).textContent();
expect(accountCreationMessage).toContain("Account Created Successfully");
//click on login button after account creation
await page.locator("//button[contains(text(),'Login')]").click();
//login after account creation
console.log("Logging in with:" +uniqueEmail);
await page.locator("#userEmail").fill(uniqueEmail);
await page.locator("#userPassword").fill("Iamking@000");
await page.locator(logingBtn).click();
}); 