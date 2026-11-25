class LoginPage {

   constructor(page) {
        this.page = page;
       this.applicationUrl = "https://rahulshettyacademy.com/client";
        this.registerHereLink = page.locator("//a[contains(text(),'Register here')]");
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
    }

}

module.exports = LoginPage;