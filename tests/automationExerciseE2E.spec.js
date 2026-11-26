const { test } = require("@playwright/test");
const testData = require('../utils/automationExerciseTestData.json');
const AutomationExercisePOManager = require('../pages/AutomationExercisePOManager');

// Complete Automation Exercise journey: signup, purchase, payment, and invoice validation.
test('Automation Exercise E2E', async ({ page }) => {
const poManager = new AutomationExercisePOManager(page);
const { signupPage, productListingPage, cart, payment, orderConfirmationPage, invoice } = poManager;
const {name,email,extension} = testData.signupData;
const uniqueEmail = `${email}+${Date.now()}${extension}`;

// Start with a unique account for every test run.
await page.goto(signupPage.applicationUrl);
await signupPage.openSignup();
//await signupPage.verifyRequiredFieldValidation(page.locator('#name'));
await signupPage.signup(name, uniqueEmail);
console.log('Login email is', uniqueEmail);

// Verify carried-over account details and complete registration.
await signupPage.verifyPrepopulatedName(name);
await signupPage.verifyPrepopulatedEmail(email);
await signupPage.enterPassword(testData.passwordData.password);
const { Day, Month, years } = testData.accountInformation.DOB;
await signupPage.selectDOB(Day, Month, years);
await signupPage.checkNewsletter();
const { firstName, lastName, address, country, state, city, zipcode, phone } = testData.addressInformation;
await signupPage.selectAddressInformation(
  firstName,
  lastName,
  address,
  country,
  state,
  city,
  zipcode,
  phone
);
await signupPage.createAccount();
await signupPage.verifyAccountCreated();
await signupPage.continueAfterAccountCreation();

// Add two data-driven products and open the cart.
const [firstProduct, secondProduct] = testData.PLP.productNames;
await productListingPage.addProductToCart(firstProduct);
await productListingPage.continueShopping();
await productListingPage.addProductToCart(secondProduct);
await productListingPage.viewCart();

// Verify the cart, preserve its total, and continue to checkout.
await cart.verifyProductInCart(firstProduct);
await cart.verifyProductInCart(secondProduct);
const productsTotal = await cart.getProductsTotal();
await cart.proceedToCheckout();
await cart.verifyDeliveryAddress(address);
await cart.placeOrder();

// Complete payment with test card data and verify order confirmation.
const { nameOnCard, cardNumber, cvc, expirationMonth, expirationYear } = testData.cart;
await payment.enterCardDetails(nameOnCard, cardNumber, cvc, expirationMonth, expirationYear);
await payment.payAndConfirmOrder();
await orderConfirmationPage.verifyOrderConfirmation();

// Download the invoice and compare its amount with the cart total.
const downloadedInvoice = await invoice.downloadInvoice();
console.log('filename is', downloadedInvoice.fileName);
console.log('filepath is', downloadedInvoice.filePath);
const invoiceText = await invoice.openInvoice(downloadedInvoice.filePath);
await invoice.verifyInvoiceTotal(invoiceText, productsTotal);
});
