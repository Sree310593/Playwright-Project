# 🎭 Playwright E2E Test Suite - Complete Index

## 📋 What You Have

A production-ready Playwright end-to-end test suite for **QA Care Pro** with **Page Object Model (POM)** pattern and **centralized test data management**.

---

## 📁 File Structure & Location

### Core Test Files
| File | Location | Purpose |
|------|----------|---------|
| **LoginPage.js** | `pages/` | Page Object Model with 15+ methods |
| **QACarePro.spec.js** | `tests/` | Main E2E test suite with 14 tests |
| **testData.js** | `testData/` | Centralized credentials & configuration |

### Documentation Files
| File | Purpose | Read When |
|------|---------|-----------|
| **RUNNING_TESTS.md** | Complete guide to running and customizing | You want detailed instructions |
| **QUICK_REFERENCE.js** | Quick reference for POM methods | You need a quick lookup |
| **TEST_CONFIGURATION.js** | Configuration summary & troubleshooting | You need to configure or troubleshoot |
| **EXAMPLE_PATTERNS.js** | 18 copy-paste ready test patterns | You want to write new tests |
| **README.md** | This file | Navigation & overview |

---

## 🔑 Test Credentials

```
Username: intakeumportal
Password: Set through QACAREPRO_PASSWORD
```

✅ All credentials are managed in `/testData/testData.js` for easy updates.

---

## 🧪 Test Cases Overview

### Category Breakdown

#### 🟢 Smoke Tests (2 tests) - Use `@Smoke` tag
- Verify login page loads with all UI elements
- Verify login page URL and title

**Run:** `npx playwright test --grep @Smoke`

#### 🔵 Functional Tests (8 tests) - Use `@Functional` tag
- Login with valid credentials
- Validate empty username field error
- Validate empty password field error
- Clear and re-enter credentials
- Login with Remember Me option
- Tab navigation through login form
- Special characters in username
- Case sensitivity handling

**Run:** `npx playwright test --grep @Functional`

#### 🔴 Security Tests (1 test) - Use `@Security` tag
- Multiple failed login attempts (brute force simulation)

**Run:** `npx playwright test --grep @Security`

#### ⚫ UI Tests (1 test) - Use `@UI` tag
- Verify input field placeholders

**Run:** `npx playwright test --grep @UI`

#### ⭕ Post-Login Tests (2 tests)
- Verify user is logged in successfully
- Logout functionality

**Run:** `npx playwright test tests/QACarePro.spec.js` (runs all)

---

## 🚀 Quick Start Commands

### Installation
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests
```bash
# Run all tests in QACarePro suite
npx playwright test tests/QACarePro.spec.js

# Run only Smoke tests
npx playwright test --grep @Smoke

# Run only Functional tests
npx playwright test --grep @Functional

# Run specific test by name
npx playwright test -g "Login with valid credentials"
```

### Viewing Results
```bash
# Open HTML report
npx playwright show-report
```

### Advanced Modes
```bash
# Headed mode - see the browser
npx playwright test tests/QACarePro.spec.js --headed

# Debug mode - step through tests
npx playwright test tests/QACarePro.spec.js --debug

# With video recording
npx playwright test tests/QACarePro.spec.js --video=on

# With screenshots
npx playwright test tests/QACarePro.spec.js --screenshot=on

# Single-threaded (slower but useful for debugging)
npx playwright test tests/QACarePro.spec.js --workers=1
```

---

## 🏗️ Page Object Model - LoginPage Methods

### Navigation
```javascript
await loginPage.goto()  // Navigate to QA Care Pro login page
```

### Login Operations
```javascript
await loginPage.login(username, password)                 // Complete login flow
await loginPage.loginWithRememberMe(username, password)   // Login with Remember Me checked
await loginPage.enterUserName(username)                   // Enter username
await loginPage.enterPassword(password)                   // Enter password
await loginPage.clickLoginButton()                        // Click login button
```

### Form Clearing
```javascript
await loginPage.clearUserName()   // Clear username field
await loginPage.clearPassword()   // Clear password field
```

### Visibility & State Checks
```javascript
await loginPage.isUserNameFieldVisible()   // Check username field visible
await loginPage.isPasswordFieldVisible()   // Check password field visible
await loginPage.isLoginButtonVisible()     // Check login button visible
await loginPage.isLoginButtonEnabled()     // Check login button enabled
```

### Getting Values
```javascript
await loginPage.getUserNamePlaceholder()   // Get username placeholder text
await loginPage.getPasswordPlaceholder()   // Get password placeholder text
await loginPage.getValidationMessage()     // Get validation error message
```

### Waiting
```javascript
await loginPage.waitForPageLoad()  // Wait for page elements to load
```

### Direct Locator Access
```javascript
loginPage.userNameInput        // Username input field locator
loginPage.passwordInput        // Password input field locator
loginPage.loginButton          // Login button locator
loginPage.rememberMeCheckbox   // Remember me checkbox locator
```

---

## 📝 Using Test Data

### Access Credentials
```javascript
const { username, password } = testData.credentials.validUser;
await loginPage.login(username, password);
```

### Available Test Users
```javascript
testData.credentials.validUser          // username / QACAREPRO_PASSWORD
testData.credentials.invalidUser        // Invalid credentials
testData.credentials.testUser           // Test user
testData.credentials.specialCharUser    // User with special chars
testData.credentials.mixedCaseUser      // Mixed case username
```

### Access URLs
```javascript
testData.urls.login          // https://qacarepro.specialtycare.corp.evolenthealth.com/
testData.urls.dashboard      // Dashboard URL
testData.urls.home           // Home URL
```

### Access Locators
```javascript
testData.locators.username         // #UserName
testData.locators.password         // #userPassword
testData.locators.loginButton      // //button[contains(text(), "Login")]
// ... more locators available
```

### Access Timeouts
```javascript
testData.timeouts.navigation   // 10000ms
testData.timeouts.element      // 5000ms
testData.timeouts.page         // 30000ms
testData.timeouts.network      // 1000ms
```

---

## 📚 Writing New Tests

### Simple Pattern
```javascript
test('@MyTag - Test description', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // Your test code
  await loginPage.login(
    testData.credentials.validUser.username,
    testData.credentials.validUser.password
  );
  
  // Your assertions
  expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
});
```

### With Setup Hook
```javascript
let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.waitForPageLoad();
});

test('@MyTag - Test with setup', async ({ page }) => {
  // loginPage already initialized and page loaded
  await loginPage.login(
    testData.credentials.validUser.username,
    testData.credentials.validUser.password
  );
});
```

---

## 🎓 Examples & Patterns

For 18 ready-to-use example patterns, see **EXAMPLE_PATTERNS.js** including:
1. Basic login test
2. Login with assertion
3. Form validation testing
4. Multiple credentials test
5. Field interaction test
6. UI element verification
7. Keyboard navigation test
8. Remember Me test
9. Error handling test
10. Page metadata test
... and 8 more patterns!

---

## 🔧 Customization Guide

### Change Login Credentials
Edit `/testData/testData.js`:
```javascript
validUser: {
  username: 'intakeumportal',
  password: process.env.QACAREPRO_PASSWORD
}
```

### Update Application URL
Edit `/testData/testData.js`:
```javascript
urls: {
  login: 'https://qacarepro.specialtycare.corp.evolenthealth.com/'
}
```

### Modify Locators
Edit `/testData/testData.js`:
```javascript
locators: {
  username: '#UserName',
  password: '#userPassword',
  loginButton: '//button[contains(text(), "Login")]'
}
```

### Add New Test
Edit `/tests/QACarePro.spec.js` and add:
```javascript
test('@YourTag - Your test name', async ({ page }) => {
  // Your test code
});
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Locators not found | Run `npx playwright codegen <url>` to inspect |
| Tests timeout | Increase timeout in `playwright.config.js` |
| Login fails | Verify credentials in `/testData/testData.js` |
| Network errors | Check application is online and accessible |
| Screenshot issues | Check `test-results/` directory for files |

See **TEST_CONFIGURATION.js** for detailed troubleshooting guide.

---

## 📖 Documentation Map

```
START HERE
    ↓
README_INDEX.md (you are here)
    ↓
Choose your need:
    ├─→ Want to run tests?
    │   └─→ RUNNING_TESTS.md
    │
    ├─→ Need quick lookup?
    │   └─→ QUICK_REFERENCE.js
    │
    ├─→ Writing new tests?
    │   └─→ EXAMPLE_PATTERNS.js
    │
    └─→ Detailed guide?
        └─→ RUNNING_TESTS.md
```

---

## ✨ Key Features

✅ **Page Object Model** - All UI interactions centralized in `LoginPage.js`  
✅ **Centralized Test Data** - All credentials and URLs in `testData.js`  
✅ **14 Comprehensive Tests** - Covering smoke, functional, security, and UI testing  
✅ **Tagged Tests** - Organize tests with tags (@Smoke, @Functional, etc.)  
✅ **Full Documentation** - 4 detailed guide files  
✅ **Example Patterns** - 18 copy-paste ready test patterns  
✅ **Easy Customization** - Change credentials and URLs in one place  
✅ **Professional Structure** - Follow Playwright best practices  

---

## 🎯 Next Steps

1. **Run a test:**
   ```bash
   npx playwright test --grep @Smoke
   ```

2. **View results:**
   ```bash
   npx playwright show-report
   ```

3. **Read detailed guide:**
   Open `RUNNING_TESTS.md`

4. **Write your own test:**
   Copy pattern from `EXAMPLE_PATTERNS.js`

5. **Modify credentials:**
   Edit `testData/testData.js`

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Run all tests | `npx playwright test tests/QACarePro.spec.js` |
| Run @Smoke tests | `npx playwright test --grep @Smoke` |
| Run @Functional tests | `npx playwright test --grep @Functional` |
| Run in headed mode | `npx playwright test --headed` |
| Debug mode | `npx playwright test --debug` |
| View report | `npx playwright show-report` |
| Generate locators | `npx playwright codegen <url>` |

---

## 📄 Files at a Glance

| File | Lines | Type | Purpose |
|------|-------|------|---------|
| LoginPage.js | 160 | Page Object | POM with 15+ methods |
| QACarePro.spec.js | 450+ | Test Suite | 14 E2E test cases |
| testData.js | 90 | Config | Credentials & URLs |
| RUNNING_TESTS.md | 350+ | Guide | Complete instructions |
| EXAMPLE_PATTERNS.js | 400+ | Examples | 18 test patterns |
| QUICK_REFERENCE.js | 230+ | Reference | Quick lookup & debugging |

---

## 🏆 Best Practices Implemented

- ✅ Page Object Model pattern
- ✅ Centralized test data
- ✅ Meaningful test names
- ✅ Proper wait strategies
- ✅ Tag-based organization
- ✅ Comprehensive documentation
- ✅ Error handling
- ✅ Reusable methods
- ✅ DRY principle
- ✅ Clear code structure

---

**Happy Testing! 🚀**

For questions or issues, refer to the appropriate documentation file listed above.

---
*Last Updated: November 2026 | Playwright ^1.65.0*
