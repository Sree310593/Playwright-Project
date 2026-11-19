/**
 * QUICK REFERENCE GUIDE - LoginPage POM Methods
 * This file serves as a quick reference for all available methods in LoginPage
 */

/**
 * NAVIGATION
 * ==========================================
 */

// Navigate to QA Care Pro login page
await loginPage.goto();

/**
 * LOGIN ACTIONS
 * ==========================================
 */

// Enter username
await loginPage.enterUserName('testuser@example.com');

// Enter password
await loginPage.enterPassword(process.env.QACAREPRO_TEST_PASSWORD);

// Click login button
await loginPage.clickLoginButton();

// Complete login flow in one method
await loginPage.login('testuser@example.com', process.env.QACAREPRO_TEST_PASSWORD);

// Login with Remember Me checkbox checked
await loginPage.loginWithRememberMe('testuser@example.com', process.env.QACAREPRO_TEST_PASSWORD);

/**
 * VISIBILITY CHECKS
 * ==========================================
 */

// Check if username field is visible
const isUserNameVisible = await loginPage.isUserNameFieldVisible();

// Check if password field is visible
const isPasswordVisible = await loginPage.isPasswordFieldVisible();

// Check if login button is visible
const isLoginBtnVisible = await loginPage.isLoginButtonVisible();

// Check if login button is enabled
const isLoginBtnEnabled = await loginPage.isLoginButtonEnabled();

/**
 * FIELD OPERATIONS
 * ==========================================
 */

// Clear username field
await loginPage.clearUserName();

// Clear password field
await loginPage.clearPassword();

// Get username field value
const usernameValue = await loginPage.userNameInput.inputValue();

// Get password field value
const passwordValue = await loginPage.passwordInput.inputValue();

// Get username placeholder
const usernamePlaceholder = await loginPage.getUserNamePlaceholder();

// Get password placeholder
const passwordPlaceholder = await loginPage.getPasswordPlaceholder();

/**
 * VALIDATION & MESSAGES
 * ==========================================
 */

// Get validation message
const validationMsg = await loginPage.getValidationMessage();

/**
 * WAIT & TIMING
 * ==========================================
 */

// Wait for page to load (username field visible)
await loginPage.waitForPageLoad();

/**
 * DIRECT LOCATOR ACCESS
 * ==========================================
 * You can also access locators directly for more complex interactions
 */

// Username input field
loginPage.userNameInput

// Password input field
loginPage.passwordInput

// Login button
loginPage.loginButton

// Remember Me checkbox
loginPage.rememberMeCheckbox

// Username label
loginPage.userNameLabel

// Password label
loginPage.passwordLabel

// Validation message
loginPage.validationMessage

// Error message
loginPage.errorMessage

/**
 * EXAMPLE TEST PATTERNS
 * ==========================================
 */

// Pattern 1: Simple Login
test('Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
});

// Pattern 2: Validation Testing
test('Validation test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.enterUserName('user@example.com');
  // Password left empty
  await loginPage.clickLoginButton();
  const error = await loginPage.getValidationMessage();
  expect(error).toBeTruthy();
});

// Pattern 3: UI Element Testing
test('UI test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  expect(await loginPage.isUserNameFieldVisible()).toBeTruthy();
  expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
  expect(await loginPage.isLoginButtonEnabled()).toBeTruthy();
});

// Pattern 4: Form Interaction Testing
test('Form interaction test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  await loginPage.enterUserName('test@example.com');
  await loginPage.enterPassword('password123');
  
  const username = await loginPage.userNameInput.inputValue();
  const password = await loginPage.passwordInput.inputValue();
  
  expect(username).toBe('test@example.com');
  expect(password).toBe('password123');
});

// Pattern 5: Multiple Actions with Clearing
test('Clear and retry', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // First attempt
  await loginPage.enterUserName('wrong@example.com');
  await loginPage.enterPassword('wrongpassword');
  
  // Clear and retry
  await loginPage.clearUserName();
  await loginPage.clearPassword();
  
  // Second attempt with correct credentials
  await loginPage.login('correct@example.com', 'correctpassword');
});

// Pattern 6: Remember Me Checkbox
test('Remember me test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithRememberMe('user@example.com', 'password123');
});

/**
 * COMMON ASSERTIONS WITH POM
 * ==========================================
 */

const { expect } = require('@playwright/test');

// Assert field visibility
expect(await loginPage.isUserNameFieldVisible()).toBeTruthy();

// Assert field values
const username = await loginPage.userNameInput.inputValue();
expect(username).toBe('testuser@example.com');

// Assert button enabled
expect(await loginPage.isLoginButtonEnabled()).toBeTruthy();

// Assert text content
const userNameLabelText = await loginPage.userNameLabel.textContent();
expect(userNameLabelText).toContain('User name');

// Assert URL
const url = page.url();
expect(url).toContain('qacarepro.specialtycare.corp.evolenthealth.com');

/**
 * DEBUGGING TIPS
 * ==========================================
 */

// 1. Print field values during test
console.log('Username:', await loginPage.userNameInput.inputValue());
console.log('Password:', await loginPage.passwordInput.inputValue());

// 2. Take screenshot for debugging
await page.screenshot({ path: 'debug-screenshot.png' });

// 3. Wait for specific element
await loginPage.userNameInput.waitFor({ state: 'visible', timeout: 5000 });

// 4. Check element count
const errorElements = page.locator('.field-validation-error');
const count = await errorElements.count();
console.log('Error elements found:', count);

// 5. Use Playwright Inspector
// Run: npx playwright test --debug

// 6. Run test in headed mode to see browser
// Run: npx playwright test --headed

/**
 * LOCATOR INSPECTOR COMMAND
 * ==========================================
 * To generate locators automatically:
 * npx playwright codegen https://qacarepro.specialtycare.corp.evolenthealth.com/
 */
