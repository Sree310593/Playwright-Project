class LoginPage {

   constructor(page) {
        this.page = page;
        this.applicationUrl = "https://rahulshettyacademy.com/client";
        this.registerHereLink = page.locator("//a[contains(text(),'Register here')]");
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
    }

    async open() {
        await this.page.goto(this.applicationUrl);
    }

    async openRegistration() {
        await this.registerHereLink.click();
    }

    async login(username, password) {
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}

module.exports = LoginPage;