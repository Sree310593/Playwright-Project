const { test, expect } = require('@playwright/test');
 
 
 
 
test('@Webst Client App login', async ({ page }) => {

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
   const productCard = ".card-body";
   const productName = "ZARA COAT 3"
   const cartBtn = "//button[contains(@routerlink,'cart')]";
   const checkoutBtn = "//button[contains(text(),'Checkout')]";
   const orderButton ="//i[@class='fa fa-handshake-o']"
   const orderRowId ="tbody tr"
   const orderIdSummaryPage ="//div[@class='col-text -main']"


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
//wait the card to be visible
await page.locator(productCard).first().waitFor();
//select the product from the list and add to cart
const products = page.locator(productCard);
const count = await products.count();
for (let i = 0; i < count; i++) {
 const name = (await products.nth(i).locator("b").textContent()).trim();
 if (name === productName) {
   // add to cart
   await products.nth(i).locator("text= Add To Cart").click();
   break;
 }
}
//click on cart button
await page.locator(cartBtn).click();
//wait for the first item in the cart to be visible by tag
await page.locator(`div li`).first().waitFor();
//assertion for product in cart - pseudo class
expect(page.locator(`h3:has-text('${productName}')`).isVisible()).toBeTruthy();
//click on checkout button
await page.locator(checkoutBtn).click();
//select country from dropdown type one by one letter
 await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
//wait for the dropdown to appear and select the country
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      //contains textincludes = contains check for India in the dropdown options
      if (text.includes("India")) {
         await dropdown.locator("button").nth(i).click();
         break;
}
      }
    await expect (page.locator('.user__name [type="text"]').first()).toHaveText(uniqueEmail);
   //click on the place order
   await page.locator(".action__submit").click();
   //assertion for order confirmation message
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   //get the order ID from the confirmation page
   const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent()).replaceAll("|", "").trim();
   console.log("Order ID: " + orderId);  
   await page.locator(orderButton).click();
   await page.locator(orderRowId).first().waitFor();
   // iterate through the order rows to find the matching order ID
   const rows = page.locator(orderRowId);
   const rowCount = await rows.count();
   for (let i = 0; i < rowCount; i++) {
    const rowOrderId = (await rows.nth(i).locator("th").textContent()).trim();
   if (orderId.includes(rowOrderId)) {
   await rows.nth(i).locator("button").first().click();
   break;
 }
}
       await page.locator(orderIdSummaryPage).waitFor();
       // get the order id  and assert it contains the order ID
       const orderSummaryText = await page.locator(orderIdSummaryPage).textContent();
       expect(orderSummaryText.includes(orderId)).toBeTruthy();
});