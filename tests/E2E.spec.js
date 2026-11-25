//Benefits:
// One place to initialize all page objects
// Less repeated code across test files
// Easier addition of new pages
// Cleaner test imports and setup
// It is useful when tests use several page objects, as your E2E test does.


const { test, expect } = require('@playwright/test');
const POManager = require('../pages/POManager');

test('@Webst Client App login', async ({ page }) => {

   const poManager = new POManager(page);
   const {
      loginPage,
      registrationPage,
      dashboardPage,
      cartPage,
      checkoutPage,
      ordersPage
   } = poManager;
   await loginPage.open();
   const productName = dashboardPage.productName;

await loginPage.openRegistration();
const uniqueEmail = `subhosree+${Date.now()}@example.com`;
console.log(uniqueEmail);
await registrationPage.register(uniqueEmail);
await expect(registrationPage.accountCreationSuccess).toContainText("Account Created Successfully");
await registrationPage.continueToLogin();

console.log("Logging in with:" +uniqueEmail);
await loginPage.login(uniqueEmail, registrationPage.passwordValue);

await dashboardPage.addProductToCart(productName);
await dashboardPage.openCart();

await cartPage.waitForItems();
const cartProduct = cartPage.getProduct(productName);
await expect(cartProduct).toBeVisible();
await cartPage.checkout();

await checkoutPage.selectCountry("ind", "India");
await expect(checkoutPage.emailSummary).toHaveText(uniqueEmail);
const orderId = await checkoutPage.placeOrder();
await expect(checkoutPage.confirmationMessage).toHaveText(" Thankyou for the order. ");
console.log("Order ID: " + orderId);

await ordersPage.openOrder(orderId);
await expect(ordersPage.orderIdSummaryPage).toContainText(orderId);
});