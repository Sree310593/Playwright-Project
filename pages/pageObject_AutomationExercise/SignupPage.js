const { expect } = require("@playwright/test");

class SignupPage {
    constructor(page) {
        this.page = page;
        this.applicationUrl = 'https://automationexercise.com';

    }

    async openSignup() {
        // The header link opens the combined login/signup route.
        await this.page.locator('a[href="/login"]').click();
        const signupForm = this.page.locator('form[action="/signup"]');
        await signupForm.waitFor({ state: 'visible' });
    }

    async signup(name, email) {
        // nth(1) targets the signup email because the login email appears first.
        await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
        await this.page.getByPlaceholder('Email Address').nth(1).fill(email);
        await this.page.getByRole('button', { name: 'Signup' }).click();
    }

    // The account-information page should preserve the submitted name.
    async verifyPrepopulatedName(name) {
        await expect(this.page.locator('#name')).toHaveValue(name);

    }
    // The generated email should retain the base test email.
    async verifyPrepopulatedEmail(emailPart) {
        const actualEmail = await this.page.locator('#email').inputValue();
        expect(actualEmail).toContain(emailPart);
    }

    async enterPassword(password) {
        await this.page.locator('#password').fill(password);
    }

    async selectDOB(day, month, years) {
        // Day and year use HTML values; month uses visible option text.
        await this.page.locator('#days').selectOption({ value: day });
        await this.page.locator('#months').selectOption({ label: month });
        await this.page.locator('#years').selectOption({ value: years });

    }


    async checkNewsletter() {
        await this.page.locator('#optin').check();
    }

    // Verify that required fields show a validation message when left empty
    async verifyRequiredFieldValidation(field) {
        await expect(field).toHaveJSProperty(
            'validationMessage',
            'Please fill out this field.'
        );

        expect(await field.evaluate(element => element.validity.valueMissing)).toBeTruthy();
    }


    async selectAddressInformation(firstName, lastName, address, country, state, city, zipcode, phone) {
        // Fill the required address fields in the same order as the form.
        await this.page.locator('#first_name').fill(firstName);
        await this.page.locator('#last_name').fill(lastName);
        await this.page.locator('#country').selectOption({label: country});
        await this.page.locator('#address1').fill(address);
        await this.page.locator('#state').fill(state);
        await this.page.locator("#city").fill(city);
        await this.page.locator('#zipcode').fill(zipcode);
        await this.page.locator('#mobile_number').fill(phone);
    }

    async createAccount() {
        await this.page.getByRole('button', { name: 'Create Account' }).click();

    }

    async verifyAccountCreated() {
        await expect(this.page.getByText('Account Created!')).toBeVisible();
    }

    async continueAfterAccountCreation() {
        // Return to the main shopping page after account creation.
        await this.page.locator('a[data-qa="continue-button"]').click();
    }

}

module.exports = SignupPage;
