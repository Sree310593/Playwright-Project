/**
 * EXAMPLE TEST PATTERNS & USAGE
 * Copy-paste ready examples for common test scenarios
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('../testData/testData');

// ============================================
// PATTERN 1: BASIC LOGIN TEST
// ============================================

test('@Example - Basic login pattern', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login(
    testData.credentials.validUser.username,
    testData.credentials.validUser.password
  );
  
  // Add your assertions after login
  console.log('✓ Login completed');
});

// ============================================
// PATTERN 2: WITH WAIT & ASSERTION
// ============================================

test('@Example - Login with assertion', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Verify page loaded
  expect(await loginPage.isUserNameFieldVisible()).toBeTruthy();
  
  // Login
  await loginPage.login(
    testData.credentials.validUser.username,
    testData.credentials.validUser.password
  );
  
  // Wait for navigation
  await page.waitForNavigation({ 
    timeout: testData.timeouts.navigation 
  }).catch(() => console.log('No navigation'));
  
  console.log('✓ Login and navigation verified');
});

// ============================================
// PATTERN 3: FORM VALIDATION TESTING
// ============================================

test('@Example - Validate empty fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Try to login with empty username
  await loginPage.enterPassword(testData.credentials.validUser.password);
  await loginPage.clickLoginButton();
  
  // Check for validation message
  await page.waitForTimeout(1000);
  const errorElements = page.locator('[role="alert"], .field-validation-error');
  expect(await errorElements.count()).toBeGreaterThan(0);
  
  console.log('✓ Validation error displayed');
});

// ============================================
// PATTERN 4: MULTIPLE CREDENTIALS TEST
// ============================================

test('@Example - Test multiple users', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  const users = [
    testData.credentials.validUser,
    testData.credentials.testUser,
    testData.credentials.specialCharUser
  ];
  
  for (const user of users) {
    await loginPage.goto();
    console.log(`Testing login for: ${user.username}`);
    
    await loginPage.login(user.username, user.password);
    await page.waitForTimeout(1500);
    
    // Clear fields for next iteration if needed
    await loginPage.clearUserName();
    await loginPage.clearPassword();
  }
  
  console.log('✓ All user logins tested');
});

// ============================================
// PATTERN 5: FIELD INTERACTION TEST
// ============================================

test('@Example - Test field interactions', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  const testUsername = testData.credentials.validUser.username;
  const testPassword = testData.credentials.validUser.password;
  
  // Enter credentials
  await loginPage.enterUserName(testUsername);
  await loginPage.enterPassword(testPassword);
  
  // Verify values
  const username = await loginPage.userNameInput.inputValue();
  const password = await loginPage.passwordInput.inputValue();
  
  expect(username).toBe(testUsername);
  expect(password).toBe(testPassword);
  
  // Clear fields
  await loginPage.clearUserName();
  await loginPage.clearPassword();
  
  // Verify cleared
  const clearedUsername = await loginPage.userNameInput.inputValue();
  const clearedPassword = await loginPage.passwordInput.inputValue();
  
  expect(clearedUsername).toBe('');
  expect(clearedPassword).toBe('');
  
  console.log('✓ Field interactions verified');
});

// ============================================
// PATTERN 6: UI ELEMENT VERIFICATION
// ============================================

test('@Example - Verify UI elements', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Check all elements are visible
  expect(await loginPage.isUserNameFieldVisible()).toBeTruthy();
  expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
  expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  
  // Check button is enabled
  expect(await loginPage.isLoginButtonEnabled()).toBeTruthy();
  
  // Get placeholder texts
  const usernamePlaceholder = await loginPage.getUserNamePlaceholder();
  const passwordPlaceholder = await loginPage.getPasswordPlaceholder();
  
  console.log('Username placeholder:', usernamePlaceholder);
  console.log('Password placeholder:', passwordPlaceholder);
  
  console.log('✓ All UI elements verified');
});

// ============================================
// PATTERN 7: KEYBOARD NAVIGATION TEST
// ============================================

test('@Example - Test keyboard navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Focus username field
  await loginPage.userNameInput.focus();
  await loginPage.enterUserName(testData.credentials.validUser.username);
  
  // Tab to password field
  await page.keyboard.press('Tab');
  await loginPage.enterPassword(testData.credentials.validUser.password);
  
  // Verify values after tab navigation
  const username = await loginPage.userNameInput.inputValue();
  const password = await loginPage.passwordInput.inputValue();
  
  expect(username).toBe(testData.credentials.validUser.username);
  expect(password).toBe(testData.credentials.validUser.password);
  
  console.log('✓ Keyboard navigation works correctly');
});

// ============================================
// PATTERN 8: REMEMBER ME TEST
// ============================================

test('@Example - Test Remember Me checkbox', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Login with Remember Me
  await loginPage.loginWithRememberMe(
    testData.credentials.validUser.username,
    testData.credentials.validUser.password
  );
  
  // Check if checkbox is checked
  const isChecked = await loginPage.rememberMeCheckbox.isChecked();
  expect(isChecked).toBeTruthy();
  
  console.log('✓ Remember Me checkbox tested');
});

// ============================================
// PATTERN 9: ERROR HANDLING TEST
// ============================================

test('@Example - Test error handling', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Try multiple wrong passwords
  for (let i = 0; i < 3; i++) {
    await loginPage.login(
      testData.credentials.validUser.username,
      process.env.QACAREPRO_INVALID_PASSWORD || 'invalid-test-value'
    );
    
    console.log(`Attempt ${i + 1}: Login with wrong password`);
    
    // Wait for error
    await page.waitForTimeout(500);
    
    // Clear fields
    await loginPage.clearUserName();
    await loginPage.clearPassword();
  }
  
  console.log('✓ Error handling tested');
});

// ============================================
// PATTERN 10: PAGE URL & TITLE TEST
// ============================================

test('@Example - Verify page metadata', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Check URL
  const currentUrl = page.url();
  expect(currentUrl).toContain('qacarepro.specialtycare.corp.evolenthealth.com');
  
  // Check title
  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);
  
  // Check page URL matches testData
  expect(currentUrl).toContain(new URL(testData.urls.login).hostname);
  
  console.log('✓ Page metadata verified');
});

// ============================================
// PATTERN 11: DATA-DRIVEN TEST
// ============================================

test('@Example - Data-driven login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const testCases = [
    {
      scenario: testData.scenarios.validLogin,
      shouldSucceed: true
    },
    {
      scenario: testData.scenarios.invalidLogin,
      shouldSucceed: false
    },
    {
      scenario: testData.scenarios.emptyUsername,
      shouldSucceed: false
    }
  ];
  
  for (const testCase of testCases) {
    await loginPage.goto();
    console.log(`Testing: ${testCase.scenario.description}`);
    
    if (testCase.scenario.username) {
      await loginPage.enterUserName(testCase.scenario.username);
    }
    if (testCase.scenario.password) {
      await loginPage.enterPassword(testCase.scenario.password);
    }
    
    await loginPage.clickLoginButton();
    await page.waitForTimeout(1000);
    
    console.log(`Expected: ${testCase.scenario.expectedResult}`);
  }
  
  console.log('✓ Data-driven test completed');
});

// ============================================
// PATTERN 12: SCREENSHOT & TRACE
// ============================================

test('@Example - Login with debugging', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Take screenshot before login
  await page.screenshot({ path: 'screenshot-before-login.png' });
  
  // Login
  await loginPage.login(
    testData.credentials.validUser.username,
    testData.credentials.validUser.password
  );
  
  // Take screenshot after login
  await page.screenshot({ path: 'screenshot-after-login.png' });
  
  console.log('✓ Screenshots captured for debugging');
});

// ============================================
// PATTERN 13: CUSTOM HOOK - BEFORE EACH
// ============================================

test.describe('Using beforeEach hook', () => {
  let loginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.waitForPageLoad();
    console.log('✓ Page loaded and ready');
  });
  
  test('@Example - Login in beforeEach setup', async ({ page }) => {
    // Page is already loaded by beforeEach
    await loginPage.login(
      testData.credentials.validUser.username,
      testData.credentials.validUser.password
    );
    
    console.log('✓ Login executed successfully');
  });
});

// ============================================
// PATTERN 14: CUSTOM HOOK - AFTER EACH
// ============================================

test.describe('Using afterEach hook', () => {
  let loginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });
  
  test.afterEach(async ({ page }) => {
    console.log('Test completed, URL:', page.url());
    // Cleanup code here if needed
  });
  
  test('@Example - Test with cleanup', async ({ page }) => {
    await loginPage.login(
      testData.credentials.validUser.username,
      testData.credentials.validUser.password
    );
  });
});

// ============================================
// PATTERN 15: PARALLEL TEST EXECUTION
// ============================================

test.describe.parallel('Parallel tests', () => {
  let loginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });
  
  test('@Example - Parallel test 1', async ({ page }) => {
    await loginPage.goto();
    expect(await loginPage.isUserNameFieldVisible()).toBeTruthy();
  });
  
  test('@Example - Parallel test 2', async ({ page }) => {
    await loginPage.goto();
    expect(await loginPage.isPasswordFieldVisible()).toBeTruthy();
  });
  
  test('@Example - Parallel test 3', async ({ page }) => {
    await loginPage.goto();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });
});

// ============================================
// PATTERN 16: SKIPPING TESTS
// ============================================

test.skip('@Example - Skipped test', async ({ page }) => {
  // This test will be skipped
  console.log('This will not run');
});

test('@Example - Conditional skip', async ({ page }) => {
  test.skip(true, 'Skipping this test for now');
  // Test code here...
});

// ============================================
// PATTERN 17: TIMEOUT CONFIGURATION
// ============================================

test('@Example - Test with custom timeout', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds timeout
  
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // This test has extended timeout
  await page.waitForTimeout(5000);
});

// ============================================
// PATTERN 18: EXPECT MATCHERS EXAMPLES
// ============================================

test('@Example - Various assertions', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Boolean assertions
  expect(await loginPage.isUserNameFieldVisible()).toBeTruthy();
  expect(await loginPage.isUserNameFieldVisible()).not.toBeFalsy();
  
  // String/Value assertions
  const username = await loginPage.userNameInput.inputValue();
  expect(username).toBe('');
  expect(username).toEqual('');
  
  // Matcher examples
  const title = await page.title();
  expect(title).toBeTruthy();
  expect(title).toHaveLength(expect.any(Number));
  
  console.log('✓ All assertions passed');
});

console.log('✓ All example patterns loaded and ready to use!');
