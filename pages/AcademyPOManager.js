// One setup location for all page objects
// Cleaner test imports
// Less duplicate constructor code
// Easier maintenance when page objects are renamed or added
const LoginPage = require('./pageobject_E2E/LoginPage');
const RegistrationPage = require('./pageobject_E2E/RegistrationPage');
const DashboardPage = require('./pageobject_E2E/DashboardPage');
const CartPage = require('./pageobject_E2E/CartPage');
const CheckoutPage = require('./pageobject_E2E/CheckoutPage');
const OrdersPage = require('./pageobject_E2E/OrdersPage');

class AcademyPOManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.registrationPage = new RegistrationPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.ordersPage = new OrdersPage(page);
    }
}

module.exports = AcademyPOManager;