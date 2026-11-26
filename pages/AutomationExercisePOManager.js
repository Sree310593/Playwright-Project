// One setup location for all page objects
// Cleaner test imports
// Less duplicate constructor code
// Easier maintenance when page objects are renamed or added


const SignupPage = require('./pageObject_AutomationExercise/SignupPage');
const ProductListingPage = require('./pageObject_AutomationExercise/ProductListingPage');
const Cart = require('./pageObject_AutomationExercise/Cart');
const Payment = require('./pageObject_AutomationExercise/Payment');
const OrderConfirmationPage = require('./pageObject_AutomationExercise/OrderConfirmationPage');
const Invoice = require('./pageObject_AutomationExercise/Invoice');

class AutomationExercisePOManager {
    constructor(page) {
        this.signupPage = new SignupPage(page);
        this.productListingPage = new ProductListingPage(page);
        this.cart = new Cart(page);
        this.payment = new Payment(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.invoice = new Invoice(page);
    }
}

module.exports = AutomationExercisePOManager;
