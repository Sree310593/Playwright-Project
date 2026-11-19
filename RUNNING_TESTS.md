# QA Care Pro - Playwright E2E Test Suite Guide

## 📋 Project Overview

This is a complete **End-to-End (E2E) test suite** for QA Care Pro using **Playwright** with the **Page Object Model (POM)** pattern.

### Key Features:
✅ Centralized test data management  
✅ Page Object Model for maintainability  
✅ 12+ comprehensive test cases  
✅ Tags for selective test execution (@Smoke, @Functional, @Security, @UI)  
✅ Detailed logging and reporting  
✅ Easy credential management  

---

## 📁 Directory Structure

```
Project 1/
├── pages/
│   └── LoginPage.js                    # Page Object Model
├── tests/
│   └── QACarePro.spec.js              # Main E2E Test Suite
├── testData/
│   └── testData.js                    # Centralized Test Data
├── playwright.config.js                # Playwright Configuration
├── package.json                        # Dependencies
└── README.md
```

---

## 🔑 Configured Credentials

**Username**: `intakeumportal`  
**Password**: Set through `QACAREPRO_PASSWORD`

These are defined in `/testData/testData.js` and used throughout the tests.

---

## 📦 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install
```

---

## 🚀 Running Tests

### Run All Tests
```bash
npx playwright test tests/QACarePro.spec.js
```

### Run Tests by Tag
```bash
# Run only Smoke tests
npx playwright test --grep @Smoke

# Run only Functional tests
npx playwright test --grep @Functional

# Run only Security tests
npx playwright test --grep @Security

# Run only UI tests
npx playwright test --grep @UI
```

### Run Specific Test
```bash
npx playwright test -g "Login with valid credentials"
```

### Run in Different Modes

#### Headed Mode (see browser)
```bash
npx playwright test tests/QACarePro.spec.js --headed
```

#### Debug Mode (step through)
```bash
npx playwright test tests/QACarePro.spec.js --debug
```

#### With Video Recording
```bash
npx playwright test tests/QACarePro.spec.js --video=on
```

#### With Screenshots
```bash
npx playwright test tests/QACarePro.spec.js --screenshot=on
```

#### Single Test File
```bash
npx playwright test tests/QACarePro.spec.js --headed --workers=1
```

---

## 📊 Viewing Test Results

After running tests, view the HTML report:

```bash
npx playwright show-report
```

This will show:
- ✓ Passed/Failed tests
- ⏱️ Test duration
- 📸 Screenshots
- 🎥 Video recordings
- 📋 Detailed traces

---

## 📝 Test Cases Included

### **Login Page Tests (12 tests)**

| # | Test Name | Tag | Description |
|---|-----------|-----|-------------|
| 1 | Verify login page loads | @Smoke | Checks all UI elements visible |
| 2 | Login with valid credentials | @Functional | Tests successful login with `intakeumportal` |
| 3 | Validate empty username error | @Functional | Tests validation for empty username |
| 4 | Validate empty password error | @Functional | Tests validation for empty password |
| 5 | Clear and re-enter credentials | @Functional | Tests form clearing and re-entry |
| 6 | Login with Remember Me | @Functional | Tests Remember Me checkbox |
| 7 | Multiple failed login attempts | @Security | Tests brute force handling |
| 8 | Verify input placeholders | @UI | Checks placeholder texts |
| 9 | Verify page URL and title | @Smoke | Validates page metadata |
| 10 | Tab navigation | @Functional | Tests keyboard navigation |
| 11 | Special characters in username | @Functional | Tests edge case input |
| 12 | Case sensitivity handling | @Functional | Tests input case handling |

### **Post-Login Tests (2 tests)**
- Verify user is logged in successfully
- Logout functionality

---

## 🔧 Customizing Test Data

Edit `/testData/testData.js` to modify:

### Change Login Credentials
```javascript
validUser: {
  username: 'intakeumportal',
  password: process.env.QACAREPRO_PASSWORD
}
```

### Add New Test User
```javascript
newUser: {
  username: 'newuser@example.com',
  password: process.env.QACAREPRO_TEST_PASSWORD
}
```

### Update Application URL
```javascript
urls: {
  login: 'https://qacarepro.specialtycare.corp.evolenthealth.com/',
  dashboard: 'https://qacarepro.specialtycare.corp.evolenthealth.com/dashboard'
}
```

### Modify Locators
```javascript
locators: {
  username: '#UserName',
  password: '#userPassword',
  loginButton: '//button[contains(text(), "Login")]'
}
```

---

## 🏗️ Page Object Model Structure

### LoginPage.js
Encapsulates all login page interactions:

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.userNameInput = page.locator('#UserName');
    this.passwordInput = page.locator('#userPassword');
    // ... more locators
  }

  async login(username, password) {
    await this.enterUserName(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
  
  // ... more methods
}
```

### How to Use in Tests
```javascript
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('intakeumportal', process.env.QACAREPRO_PASSWORD);
```

---

## ✍️ Writing New Tests

### Add Test to QACarePro.spec.js
```javascript
test('@Functional - New test name', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // Your test logic here
  await loginPage.login(testData.credentials.validUser.username, 
                        testData.credentials.validUser.password);
  
  // Add assertions
  expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
});
```

### Use TestData in New Tests
```javascript
// Use predefined credentials
const { username, password } = testData.credentials.validUser;
await loginPage.login(username, password);

// Use timeouts from testData
await page.waitForNavigation({ timeout: testData.timeouts.navigation });

// Use URLs from testData
await page.goto(testData.urls.login);
```

---

## 🆕 Creating New Page Objects

### Create DashboardPage.js
```javascript
// pages/DashboardPage.js
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.welcomeTitle = page.locator('h1');
    this.logoutButton = page.locator('//button[text()="Logout"]');
  }

  async getWelcomeTitle() {
    return await this.welcomeTitle.textContent();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = DashboardPage;
```

### Use in Tests
```javascript
const DashboardPage = require('../pages/DashboardPage');

test('Dashboard test', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const title = await dashboard.getWelcomeTitle();
  expect(title).toContain('Welcome');
});
```

---

## 🐛 Troubleshooting

### Tests Timing Out
**Solution**: Increase timeout in `playwright.config.js` or use specific timeouts:
```javascript
await page.waitForNavigation({ timeout: 20000 });
```

### Locators Not Found
**Solution**: Use Playwright Inspector to find correct locators:
```bash
npx playwright codegen https://qacarepro.specialtycare.corp.evolenthealth.com/
```

### Network Errors
**Solution**: 
- Verify application is online
- Check firewall/proxy settings
- Increase `navigationTimeout` in config

### Application Not Responding
**Solution**:
- Check if URL is correct in testData
- Verify credentials are valid
- Check browser console for errors

---

## 📚 POM Best Practices

✅ **DO:**
- Centralize all locators in page objects
- Create reusable methods for common actions
- Use meaningful method names (e.g., `login()`, not `button_click()`)
- Keep test code clean and readable
- Use test data files for all external data

❌ **DON'T:**
- Use hardcoded locators in test files
- Create test-specific page objects
- Mix multiple page interactions in one test
- Hardcode credentials in tests
- Use arbitrary delays (`page.waitForTimeout(1000)`)

---

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx playwright install
      - run: npx playwright test
```

---

## 📖 Locator Types

The tests use various Playwright locator strategies:

```javascript
// ID selector
page.locator('#UserName')

// CSS class
page.locator('.login-button')

// XPath
page.locator('//button[contains(text(), "Login")]')

// Role-based (accessibility)
page.locator('[role="button"]')

// Attribute-based
page.locator('[name="username"]')

// Text content
page.locator('text=Login')

// Combining multiple
page.locator('input[type="password"]')
```

---

## 🎯 Performance Tips

1. **Run tests in parallel** (default):
   ```bash
   npx playwright test --workers=4
   ```

2. **Use headless mode** (faster):
   - Set `headless: true` in `playwright.config.js`

3. **Minimize explicit waits**:
   ```javascript
   // Good
   await page.locator('#element').waitFor();
   
   // Bad
   await page.waitForTimeout(5000);
   ```

4. **Reuse test setup**:
   ```javascript
   test.beforeEach(async ({ page }) => {
     // Setup runs before each test
     loginPage = new LoginPage(page);
   });
   ```

---

## 📞 Support & Resources

- **Playwright Docs**: https://playwright.dev
- **Locator Guide**: https://playwright.dev/docs/locators
- **Best Practices**: https://playwright.dev/docs/best-practices
- **API Reference**: https://playwright.dev/docs/api/class-page

---

## 🎓 Quick Commands Reference

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test tests/QACarePro.spec.js

# Run with specific tag
npx playwright test --grep @Smoke

# Run in headed mode
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# View test report
npx playwright show-report

# Generate test code
npx playwright codegen https://qacarepro.specialtycare.corp.evolenthealth.com/

# Update snapshots
npx playwright test --update-snapshots

# Run single test
npx playwright test -g "test name"

# Run with video
npx playwright test --video=on
```

---

**Last Updated**: November 2026  
**Playwright Version**: ^1.65.0  
**Node Version**: 14+ recommended
