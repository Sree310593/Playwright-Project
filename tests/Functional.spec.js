const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('../testData/testData');
const { validUser, specialCharUser, mixedCaseUser } = testData.credentials;
const PROFILE_URL = /\/ProfileSelection\/index$/;
test.describe('Login page', () => {
 let loginPage;
 test.beforeEach(async ({ page }) => {
   loginPage = new LoginPage(page);
   await loginPage.goto();
   await loginPage.waitForPageLoad();
 });
 test('shows username, password and login button', { tag: '@Smoke' }, async () => {
   expect(await loginPage.isUserNameFieldVisible()).toBeTruthy();
   expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
   expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
   expect(await loginPage.isLoginButtonEnabled()).toBeTruthy();
 });
 test('URL and title are correct', { tag: '@Smoke' }, async ({ page }) => {
   await expect(page).toHaveURL(/qacarepro\.specialtycare\.corp\.evolenthealth\.com/);
   await expect(page).toHaveTitle(/\S/);
 });
 test('valid user lands on profile selection', { tag: '@Functional' }, async ({ page }) => {
   await loginPage.login(validUser.username, validUser.password);
   await expect(page).toHaveURL(PROFILE_URL);
 });
 test('empty username shows an error', { tag: '@Functional' }, async ({ page }) => {
   await loginPage.enterPassword(validUser.password);
   await loginPage.clickLoginButton();
   const error = page.locator('.field-validation-error, [role="alert"]').first();
   await expect(error).toBeVisible();
 });
 test('empty password shows an error', { tag: '@Functional' }, async ({ page }) => {
   await loginPage.enterUserName(validUser.username);
   await loginPage.clickLoginButton();
   const error = page.locator('.field-validation-error, [role="alert"]').first();
   await expect(error).toBeVisible();
 });
 test('fields can be cleared and filled again', { tag: '@Functional' }, async () => {
   const { username, password } = validUser;
   await loginPage.enterUserName(username);
   await loginPage.enterPassword(password);
   await expect(loginPage.userNameInput).toHaveValue(username);
   await expect(loginPage.passwordInput).toHaveValue(password);
   await loginPage.clearUserName();
   await loginPage.clearPassword();
   await expect(loginPage.userNameInput).toBeEmpty();
   await expect(loginPage.passwordInput).toBeEmpty();
   await loginPage.enterUserName(username);
   await loginPage.enterPassword(password);
   await expect(loginPage.userNameInput).toHaveValue(username);
   await expect(loginPage.passwordInput).toHaveValue(password);
 });
 // The current login form does not provide a Remember Me checkbox.
 // test('login with Remember Me ticked', { tag: '@Functional' }, async ({ page }) => {
 //   const hasRememberMe = (await loginPage.rememberMeCheckbox.count()) > 0;
 //   test.skip(!hasRememberMe, 'No Remember Me checkbox on this login form');
 //   await loginPage.loginWithRememberMe(validUser.username, validUser.password);
 //   await expect(page).toHaveURL(PROFILE_URL);
 // });
 test('placeholders are empty', { tag: '@UI' }, async () => {
   expect(await loginPage.getUserNamePlaceholder()).toBeNull();
   expect(await loginPage.getPasswordPlaceholder()).toBeNull();
 });
 test('Tab moves from username to password', { tag: '@Functional' }, async ({ page }) => {
   await loginPage.enterUserName(validUser.username);
   await page.keyboard.press('Tab');
   await expect(loginPage.passwordInput).toBeFocused();
   await page.keyboard.type(validUser.password);
   await expect(loginPage.passwordInput).toHaveValue(validUser.password);
 });
 test('special characters in username are rejected', { tag: '@Functional' }, async () => {
   await loginPage.login(specialCharUser.username, specialCharUser.password);
   await expect(loginPage.userNameInput).toBeVisible();
 });
 test('mixed-case username is kept as typed', { tag: '@Functional' }, async () => {
   await loginPage.login(mixedCaseUser.username, mixedCaseUser.password);
   await expect(loginPage.userNameInput).toHaveValue(mixedCaseUser.username);
 });
});
test.describe('After login', () => {
 let loginPage;
 test.beforeEach(async ({ page }) => {
   loginPage = new LoginPage(page);
   await loginPage.goto();
   await loginPage.waitForPageLoad();
   await loginPage.login(validUser.username, validUser.password);
   await expect(page).toHaveURL(PROFILE_URL);
 });
 test('user is on profile selection', { tag: '@Functional' }, async ({ page }) => {
   await expect(page).toHaveURL(PROFILE_URL);
 });
 test('user can log out', { tag: '@Functional' }, async ({ page }) => {
   await loginPage.logout();
   await expect(page).toHaveURL(testData.urls.login);
   await expect(loginPage.userNameInput).toBeVisible();
 });
});
