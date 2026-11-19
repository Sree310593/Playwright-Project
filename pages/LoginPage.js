/**
 * LoginPage - Page Object Model for QA Care Pro Login
 * This class encapsulates all locators and actions for the login page
 */
const testData = require('../testData/testData');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.testData = testData;
    
    // Locators for login form elements using testData
    this.userNameInput = page.locator(testData.locators.username);
    this.passwordInput = page.locator(testData.locators.password);
    this.loginButton = page.locator(testData.locators.loginButton);
    this.userNameLabel = page.locator(testData.locators.userLabel);
    this.passwordLabel = page.locator(testData.locators.passwordLabel);
    this.validationMessage = page.locator(testData.locators.validationMessage);
    this.errorMessage = page.locator(testData.locators.errorMessage);
    this.rememberMeCheckbox = page.locator(testData.locators.rememberMe);
    this.userMenu = page.locator(testData.locators.userMenu);
    this.logoutButton = page.locator(testData.locators.logoutButton);
  }

  /**
   * Navigate to the QA Care Pro login page using testData URL
   */
  async goto() {
    await this.page.goto(testData.urls.login, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Enter username in the username field
   * @param {string} username - The username to enter
   */
  async enterUserName(username) {
    await this.userNameInput.click();
    await this.userNameInput.fill(username);
  }

  /**
   * Enter password in the password field
   * @param {string} password - The password to enter
   */
  async enterPassword(password) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Perform complete login flow
   * @param {string} username - Username to login with
   * @param {string} password - Password to login with
   */
  async login(username, password) {
    await this.enterUserName(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Login with Remember Me checkbox checked
   * @param {string} username - Username to login with
   * @param {string} password - Password to login with
   */
  async loginWithRememberMe(username, password) {
    await this.enterUserName(username);
    await this.enterPassword(password);
    await this.rememberMeCheckbox.check();
    await this.clickLoginButton();
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
    await this.page.waitForURL(testData.urls.login);
  }

  /**
   * Get validation error message
   * @returns {Promise<string>} The validation message text
   */
  async getValidationMessage() {
    return await this.validationMessage.textContent();
  }

  /**
   * Check if username field is visible
   * @returns {Promise<boolean>} True if visible
   */
  async isUserNameFieldVisible() {
    return await this.userNameInput.isVisible();
  }

  /**
   * Check if password field is visible
   * @returns {Promise<boolean>} True if visible
   */
  async isPasswordFieldVisible() {
    return await this.passwordInput.isVisible();
  }

  /**
   * Check if login button is visible
   * @returns {Promise<boolean>} True if visible
   */
  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }

  /**
   * Check if login button is enabled
   * @returns {Promise<boolean>} True if enabled
   */
  async isLoginButtonEnabled() {
    return await this.loginButton.isEnabled();
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await this.userNameInput.waitFor({ state: 'visible' });
  }

  /**
   * Clear username field
   */
  async clearUserName() {
    await this.userNameInput.clear();
  }

  /**
   * Clear password field
   */
  async clearPassword() {
    await this.passwordInput.clear();
  }

  /**
   * Get placeholder text from username field
   * @returns {Promise<string>} Placeholder text
   */
  async getUserNamePlaceholder() {
    return await this.userNameInput.getAttribute('placeholder');
  }

  /**
   * Get placeholder text from password field
   * @returns {Promise<string>} Placeholder text
   */
  async getPasswordPlaceholder() {
    return await this.passwordInput.getAttribute('placeholder');
  }
}

module.exports = LoginPage;
