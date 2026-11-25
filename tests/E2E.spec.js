const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/pageobject/LoginPage');
const RegistrationPage = require('../pages/pageobject/RegistrationPage');
const DashboardPage = require('../pages/pageobject/DashboardPage');
const CartPage = require('../pages/pageobject/CartPage');
const CheckoutPage = require('../pages/pageobject/CheckoutPage');
const OrdersPage = require('../pages/pageobject/OrdersPage');

test('@Webst Client App login', async ({ page }) => {

   const loginPage = new LoginPage(page);
   const registrationPage = new RegistrationPage(page);
   const dashboardPage = new DashboardPage(page);
   const cartPage = new CartPage(page);
   const checkoutPage = new CheckoutPage(page);
   const ordersPage = new OrdersPage(page);
   await page.goto(loginPage.applicationUrl);
   const productName = dashboardPage.productName;

await loginPage.registerHereLink.click();
const uniqueEmail = `subhosree+${Date.now()}@example.com`;
console.log(uniqueEmail);
await registrationPage.firstName.fill(registrationPage.firstNameValue);
await registrationPage.lastName.fill(registrationPage.lastNameValue);
await registrationPage.email.fill(uniqueEmail);
await registrationPage.phNo.fill(registrationPage.phoneValue);
await registrationPage.gender.click();
await registrationPage.occupation.selectOption(registrationPage.occupationValue);
await registrationPage.password.fill(registrationPage.passwordValue);
await registrationPage.confirmPassword.fill(registrationPage.passwordValue);
await registrationPage.ageConfirmation.click();
await registrationPage.registerBtn.click();
await expect(registrationPage.accountCreationSuccess).toContainText("Account Created Successfully");
await registrationPage.loginAfterRegistrationBtn.click();

console.log("Logging in with:" +uniqueEmail);
await loginPage.email.fill(uniqueEmail);
await loginPage.password.fill(registrationPage.passwordValue);
await loginPage.loginBtn.click();

await dashboardPage.productCard.first().waitFor();
await dashboardPage.productCard
   .filter({ hasText: productName })
   .getByRole("button", { name: /Add To Cart/i })
   .click();
await dashboardPage.cartBtn.click();

await cartPage.cartItem.first().waitFor();
const cartProduct = cartPage.cartItem.filter({ hasText: productName });
await expect(cartProduct).toBeVisible();
await cartPage.checkoutBtn.click();

await checkoutPage.countryInput.pressSequentially("ind", { delay: 150 });
await checkoutPage.countryDropdown.waitFor();
const countryOptions = checkoutPage.countryDropdown.locator("button");
const countryCount = await countryOptions.count();
for (let i = 0; i < countryCount; i++) {
   const option = countryOptions.nth(i);
   if ((await option.textContent()).includes("India")) {
      await option.click();
      break;
   }
}
await expect(checkoutPage.emailSummary).toHaveText(uniqueEmail);
await checkoutPage.placeOrderBtn.click();
await checkoutPage.confirmationMessage.waitFor();
const orderId = (await checkoutPage.orderId.textContent()).replaceAll("|", "").trim();
await expect(checkoutPage.confirmationMessage).toHaveText(" Thankyou for the order. ");
console.log("Order ID: " + orderId);

await ordersPage.orderButton.click();
await ordersPage.orderRows.first().waitFor();
const orderCount = await ordersPage.orderRows.count();
for (let i = 0; i < orderCount; i++) {
   const row = ordersPage.orderRows.nth(i);
   const rowOrderId = (await row.locator("th").textContent()).trim();
   if (orderId.includes(rowOrderId)) {
      await row.locator("button").first().click();
      break;
   }
}
await ordersPage.orderIdSummaryPage.waitFor();
await expect(ordersPage.orderIdSummaryPage).toContainText(orderId);
});