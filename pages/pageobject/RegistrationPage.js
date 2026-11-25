class RegistrationPage {
    constructor(page) {
        this.firstNameValue = "Subho";
        this.lastNameValue = "Sree";
        this.phoneValue = "1234567890";
        this.occupationValue = "Engineer";
        this.passwordValue = "Iamking@000";
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.email = page.locator("#userEmail");
        this.phNo = page.locator("#userMobile");
        this.occupation = page.locator("//select[@formcontrolname='occupation']");
        this.gender = page.locator("//input[@value='Female']");
        this.password = page.locator("#userPassword");
        this.confirmPassword = page.locator("#confirmPassword");
        this.ageConfirmation = page.locator("//input[@formcontrolname='required']");
        this.registerBtn = page.locator("#login");
        this.accountCreationSuccess = page.locator("//h1[contains(text(),'Account Created Successfully')]");
        this.loginAfterRegistrationBtn = page.locator("//button[contains(text(),'Login')]");
    }

    async register(email) {
        await this.firstName.fill(this.firstNameValue);
        await this.lastName.fill(this.lastNameValue);
        await this.email.fill(email);
        await this.phNo.fill(this.phoneValue);
        await this.gender.click();
        await this.occupation.selectOption(this.occupationValue);
        await this.password.fill(this.passwordValue);
        await this.confirmPassword.fill(this.passwordValue);
        await this.ageConfirmation.click();
        await this.registerBtn.click();
    }

    async continueToLogin() {
        await this.loginAfterRegistrationBtn.click();
    }
}

module.exports = RegistrationPage;
