const LoginPage = require('./pageobject/LoginPage');
const RegistrationPage = require('./pageobject/RegistrationPage');
const DashboardPage = require('./pageobject/DashboardPage');
const CartPage = require('./pageobject/CartPage');
const CheckoutPage = require('./pageobject/CheckoutPage');
const OrdersPage = require('./pageobject/OrdersPage');

class POManager {
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

module.exports = POManager;