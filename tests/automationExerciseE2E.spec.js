const { test } = require("@playwright/test");
const SignupPage = require('../pages/pageObject_AutomationExercise/SignupPage');
const testData = require('../utils/automationExerciseTestData.json');
const ProductListingPage = require('../pages/pageObject_AutomationExercise/ProductListingPage');
const Cart = require('../pages/pageObject_AutomationExercise/Cart');
const Payment = require('../pages/pageObject_AutomationExercise/Payment');
const OrderConfirmationPage = require('../pages/pageObject_AutomationExercise/OrderConfirmationPage');
const Invoice = require('../pages/pageObject_AutomationExercise/Invoice');

// Complete Automation Exercise journey: signup, purchase, payment, and invoice validation.
test('Automation Exercise E2E', async ({ page }) => {
const signup = new SignupPage(page);
const productListingPage = new ProductListingPage(page);
const {name,email,extension} = testData.signupData;
const uniqueEmail = `${email}+${Date.now()}${extension}`;

// Start with a unique account for every test run.
await page.goto(signup.applicationUrl);
await signup.openSignup();
//await signup.verifyRequiredFieldValidation(page.locator('#name'));
await signup.signup(name, uniqueEmail);
console.log('Login email is', uniqueEmail);

// Verify carried-over account details and complete registration.
await signup.verifyPrepopulatedName(name);
await signup.verifyPrepopulatedEmail(email);
await signup.enterPassword(testData.passwordData.password);
const { Day, Month, years } = testData.accountInformation.DOB;
await signup.selectDOB(Day, Month, years);
await signup.checkNewsletter();
const { firstName, lastName, address, country, state, city, zipcode, phone } = testData.addressInformation;
await signup.selectAddressInformation(
  firstName,
  lastName,
  address,
  country,
  state,
  city,
  zipcode,
  phone
);
await signup.createAccount();
await signup.verifyAccountCreated();
await signup.continueAfterAccountCreation();

// Add two data-driven products and open the cart.
const [firstProduct, secondProduct] = testData.PLP.productNames;
await productListingPage.addProductToCart(firstProduct);
await productListingPage.continueShopping();
await productListingPage.addProductToCart(secondProduct);
await productListingPage.viewCart();

// Verify the cart, preserve its total, and continue to checkout.
const cart = new Cart(page);
await cart.verifyProductInCart(firstProduct);
await cart.verifyProductInCart(secondProduct);
const productsTotal = await cart.getProductsTotal();
await cart.proceedToCheckout();
await cart.verifyDeliveryAddress(address);
await cart.placeOrder();

// Complete payment with test card data and verify order confirmation.
const payment = new Payment(page);
const { nameOnCard, cardNumber, cvc, expirationMonth, expirationYear } = testData.cart;
await payment.enterCardDetails(nameOnCard, cardNumber, cvc, expirationMonth, expirationYear);
await payment.payAndConfirmOrder();
const orderConfirmation = new OrderConfirmationPage(page);
await orderConfirmation.verifyOrderConfirmation();

// Download the invoice and compare its amount with the cart total.
const invoice = new Invoice(page);
const downloadedInvoice = await invoice.downloadInvoice();
console.log('filename is', downloadedInvoice.fileName);
console.log('filepath is', downloadedInvoice.filePath);
const invoiceText = await invoice.openInvoice(downloadedInvoice.filePath);
await invoice.verifyInvoiceTotal(invoiceText, productsTotal);
});
