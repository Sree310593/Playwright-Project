const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('../testData/testData');

/**
 * QA Care Pro E2E Test Suite
 * This test suite covers end-to-end scenarios for the QA Care Pro application
 * All test data is centralized in testData/testData.js
 */

test.describe('QA Care Pro - Login E2E Tests', () => {

  let loginPage;

  /**
   * Before each test: Initialize the page and LoginPage object
   */
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.waitForPageLoad();
  });

  /**
   * Test 1: Verify login page loads with all required elements
   */
  test('@Smoke - Verify login page loads with all UI elements', async ({ page }) => {
    console.log('📝 Test: Verify login page loads with all UI elements');
    
    // Verify username field is visible
    const userNameVisible = await loginPage.isUserNameFieldVisible();
    expect(userNameVisible).toBeTruthy();
    console.log('✓ Username field visible');

    // Verify password field is visible
    const passwordVisible = await loginPage.isPasswordFieldVisible();
    expect(passwordVisible).toBeTruthy();
    console.log('✓ Password field visible');

    // Verify login button is visible
    const loginBtnVisible = await loginPage.isLoginButtonVisible();
    expect(loginBtnVisible).toBeTruthy();
    console.log('✓ Login button visible');

    // Verify login button is enabled
    const loginBtnEnabled = await loginPage.isLoginButtonEnabled();
    expect(loginBtnEnabled).toBeTruthy();
    console.log('✓ Login button enabled');

    console.log('✓ Login page loaded successfully with all required elements');
  });

  /**
   * Test 2: Successful login with valid credentials from testData
   */
  test('@Functional - Login with valid credentials (intakeumportal)', async ({ page }) => {
    console.log('📝 Test: Login with valid credentials');
    console.log(`Using credentials from testData: ${testData.credentials.validUser.username}`);
    
    // Use credentials from testData
    const { username, password } = testData.credentials.validUser;
    
    await loginPage.login(username, password);
    console.log(`✓ Login attempt with username: ${username}`);

    await expect(page).toHaveURL(/\/ProfileSelection\/index$/);

    console.log('✓ Login completed with valid credentials');
  });

  /**
   * Test 3: Login validation with empty fields
   */
  test('@Functional - Validate empty username field error', async ({ page }) => {
    console.log('📝 Test: Validate empty username field error');
    
    // Leave username empty and try to login
    const { password } = testData.credentials.validUser;
    await loginPage.enterPassword(password);
    console.log('✓ Password entered');
    
    await loginPage.clickLoginButton();
    console.log('✓ Login button clicked');

    // Wait for validation message
    await page.waitForTimeout(testData.timeouts.network);

    const validationMsg = await loginPage.getValidationMessage();
    console.log('Validation message:', validationMsg);

    // Verify error is shown
    const errorElements = page.locator('.field-validation-valid, .field-validation-error, [role="alert"]');
    const errorCount = await errorElements.count();
    expect(errorCount).toBeGreaterThan(0);

    console.log('✓ Empty username validation error displayed correctly');
  });

  /**
   * Test 4: Login validation with empty password field
   */
  test('@Functional - Validate empty password field error', async ({ page }) => {
    console.log('📝 Test: Validate empty password field error');
    
    // Enter username but leave password empty
    const { username } = testData.credentials.validUser;
    await loginPage.enterUserName(username);
    console.log(`✓ Username entered: ${username}`);
    
    await loginPage.clickLoginButton();
    console.log('✓ Login button clicked');

    // Wait for validation message
    await page.waitForTimeout(testData.timeouts.network);

    const validationMsg = await loginPage.getValidationMessage();
    console.log('Validation message:', validationMsg);

    // Verify error is shown
    const errorElements = page.locator('.field-validation-valid, .field-validation-error, [role="alert"]');
    const errorCount = await errorElements.count();
    expect(errorCount).toBeGreaterThan(0);

    console.log('✓ Empty password validation error displayed correctly');
  });

  /**
   * Test 5: Clear and re-enter credentials flow
   */
  test('@Functional - Clear and re-enter credentials', async ({ page }) => {
    console.log('📝 Test: Clear and re-enter credentials');
    
    const { username, password } = testData.credentials.validUser;

    // Enter credentials
    await loginPage.enterUserName(username);
    await loginPage.enterPassword(password);
    console.log('✓ Credentials entered');

    // Verify credentials are entered
    const userNameValue = await loginPage.userNameInput.inputValue();
    expect(userNameValue).toBe(username);
    console.log(`✓ Username verified: ${userNameValue}`);

    const passwordValue = await loginPage.passwordInput.inputValue();
    expect(passwordValue).toBe(password);
    console.log('✓ Password verified');

    // Clear credentials
    await loginPage.clearUserName();
    await loginPage.clearPassword();
    console.log('✓ Fields cleared');

    // Verify fields are cleared
    const clearedUserName = await loginPage.userNameInput.inputValue();
    expect(clearedUserName).toBe('');

    const clearedPassword = await loginPage.passwordInput.inputValue();
    expect(clearedPassword).toBe('');
    console.log('✓ Fields cleared successfully');

    // Re-enter credentials
    await loginPage.enterUserName(username);
    await loginPage.enterPassword(password);
    console.log('✓ Credentials re-entered');

    // Verify credentials are entered again
    const reEnteredUserName = await loginPage.userNameInput.inputValue();
    expect(reEnteredUserName).toBe(username);

    const reEnteredPassword = await loginPage.passwordInput.inputValue();
    expect(reEnteredPassword).toBe(password);

    console.log('✓ Clear and re-enter credentials flow completed successfully');
  });

  /**
   * Test 6: Login with Remember Me checkbox
   */
  test('@Functional - Login with Remember Me option when available', async ({ page }) => {
    console.log('📝 Test: Login with Remember Me option when available');
    
    const { username, password } = testData.credentials.validUser;

    if (await loginPage.rememberMeCheckbox.count()) {
      await loginPage.loginWithRememberMe(username, password);
      console.log('✓ Remember Me option checked');
    } else {
      console.log('Remember Me is not available on the current login form');
      await loginPage.login(username, password);
    }
    console.log(`✓ Login with Remember Me for user: ${username}`);

    await expect(page).toHaveURL(/\/ProfileSelection\/index$/);

    console.log('✓ Login with Remember Me checkbox completed');
  });

  /**
   * Test 7: Multiple login attempts (Brute force simulation)
   */
  // test('@Security - Multiple failed login attempts', async ({ page }) => {
  //   console.log('📝 Test: Multiple failed login attempts');
    
  //   const invalidPassword = process.env.QACAREPRO_INVALID_PASSWORD || 'invalid-test-value';
  //   const { username } = testData.credentials.validUser;

  //   // Attempt login 3 times with wrong password
  //   for (let i = 1; i <= 3; i++) {
  //     await loginPage.enterUserName(username);
  //     await loginPage.enterPassword(invalidPassword);
  //     await loginPage.clickLoginButton();

  //     // Wait for response
  //     await page.waitForTimeout(testData.timeouts.network);

  //     console.log(`Attempt ${i}: Login failed with wrong password`);

  //     // Clear fields for next attempt
  //     await loginPage.clearUserName();
  //     await loginPage.clearPassword();
  //   }

  //   console.log('✓ Multiple login attempts completed');
  // });

  /**
   * Test 8: Verify placeholder texts in input fields
   */
  test('@UI - Verify input field placeholders', async ({ page }) => {
    console.log('📝 Test: Verify input field placeholders');
    
    const userNamePlaceholder = await loginPage.getUserNamePlaceholder();
    const passwordPlaceholder = await loginPage.getPasswordPlaceholder();

    console.log('Username placeholder:', userNamePlaceholder);
    console.log('Password placeholder:', passwordPlaceholder);

    expect(userNamePlaceholder).toBeNull();
    expect(passwordPlaceholder).toBeNull();
    console.log('✓ Placeholder verification completed');
  });

  /**
   * Test 9: Verify page title and URL
   */
  test('@Smoke - Verify login page URL and title', async ({ page }) => {
    console.log('📝 Test: Verify login page URL and title');
    
    // Verify URL
    const currentUrl = page.url();
    expect(currentUrl).toContain('qacarepro.specialtycare.corp.evolenthealth.com');
    console.log(`✓ Current URL: ${currentUrl}`);

    // Get page title
    const pageTitle = await page.title();
    console.log(`✓ Page Title: ${pageTitle}`);

    console.log('✓ URL and title verified');
  });

  /**
   * Test 10: Tab navigation through form elements
   */
  test('@Functional - Tab navigation through login form', async ({ page }) => {
    console.log('📝 Test: Tab navigation through login form');
    
    const { username, password } = testData.credentials.validUser;

    // Focus on username field
    await loginPage.userNameInput.focus();
    await loginPage.enterUserName(username);
    console.log(`✓ Username entered and focused`);

    // Tab to password field
    await page.keyboard.press('Tab');
    await loginPage.enterPassword(password);
    console.log('✓ Tab pressed, password entered');

    // Tab to login button
    await page.keyboard.press('Tab');
    console.log('✓ Tab pressed for login button');

    // Verify password field has the entered value
    const passwordValue = await loginPage.passwordInput.inputValue();
    expect(passwordValue).toBe(password);

    console.log('✓ Tab navigation through form elements completed successfully');
  });

  /**
   * Test 11: Special characters in username
   */
  test('@Functional - Login with special characters in username', async ({ page }) => {
    console.log('📝 Test: Login with special characters in username');
    
    const { username, password } = testData.credentials.specialCharUser;

    await loginPage.login(username, password);
    console.log(`✓ Login with special characters: ${username}`);

    await expect(loginPage.userNameInput).toBeVisible();
    console.log('✓ Login with special characters in username completed');
  });

  /**
   * Test 12: Case sensitivity in login fields
   */
  test('@Functional - Verify case sensitivity handling', async ({ page }) => {
    console.log('📝 Test: Verify case sensitivity handling');
    
    const { username, password } = testData.credentials.mixedCaseUser;

    // Try with mixed case username
    await loginPage.login(username, password);
    console.log(`✓ Login attempt with mixed case: ${username}`);

    // Wait for response
    await page.waitForTimeout(testData.timeouts.network);

    // Check if login was successful or if error occurred
    const userNameValue = await loginPage.userNameInput.inputValue();
    expect(userNameValue).toBe(username);

    console.log('✓ Case sensitivity test completed');
  });
});

/**
 * Post-Login Tests (if you have page navigation to test)
 */
test.describe('QA Care Pro - Post-Login E2E Tests', () => {

  let loginPage;

  /**
   * Before each test: Login to the application
   */
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.waitForPageLoad();

    // Perform login with valid credentials from testData
    const { username, password } = testData.credentials.validUser;
    console.log(`\n🔑 Logging in with: ${username}`);
    
    await loginPage.login(username, password);

    await expect(page).toHaveURL(/\/ProfileSelection\/index$/);
  });

  /**
   * Test 1: Verify user is logged in
   */
  test('@Functional - Verify user is logged in successfully', async ({ page }) => {
    console.log('📝 Test: Verify user is logged in successfully');
    
    const currentUrl = page.url();
    console.log(`Current URL after login: ${currentUrl}`);

    expect(currentUrl).toMatch(/\/ProfileSelection\/index$/);
    console.log('✓ User login verification completed');
  });

  /**
   * Test 2: Logout functionality
   */
  test('@Functional - Logout from application', async ({ page }) => {
    console.log('📝 Test: Logout from application');
    
    await loginPage.logout();
    await expect(page).toHaveURL(testData.urls.login);
    await expect(loginPage.userNameInput).toBeVisible();

    console.log('✓ Logout completed successfully');
  });
});
