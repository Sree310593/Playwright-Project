const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/pageobject_E2E/LoginPage');
const RegistrationPage = require('../pages/pageobject_E2E/RegistrationPage');
const DashboardPage = require('../pages/pageobject_E2E/DashboardPage');
const CartPage = require('../pages/pageobject_E2E/CartPage');
const CheckoutPage = require('../pages/pageobject_E2E/CheckoutPage');
const OrdersPage = require('../pages/pageobject_E2E/OrdersPage');
const dataSets = require("../utils/placeorderTestData.json");

for (const dataSet of dataSets) {
test(`@Webst Client App login for ${dataSet.productName}`, async ({ page }) => {
   const loginPage = new LoginPage(page);
   const registrationPage = new RegistrationPage(page);
   const dashboardPage = new DashboardPage(page);
   const cartPage = new CartPage(page);
   const checkoutPage = new CheckoutPage(page);
   const ordersPage = new OrdersPage(page);
   await loginPage.open();
   const { emailName, emailDomain, password, productName } = dataSet;

await loginPage.openRegistration();
const uniqueEmail = `${emailName}+${Date.now()}${emailDomain}`;
console.log(uniqueEmail);
await registrationPage.register(uniqueEmail, password);
await expect(registrationPage.accountCreationSuccess).toContainText("Account Created Successfully");
await registrationPage.continueToLogin();

console.log("Logging in with:" +uniqueEmail);
await loginPage.login(uniqueEmail, password);

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
}