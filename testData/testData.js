/**
 * Test Data Configuration File
 * This file contains all test data used in the test suite
 * Update credentials and test data here as needed
 */

const validPassword = process.env.QACAREPRO_PASSWORD;
if (!validPassword) {
  throw new Error('QACAREPRO_PASSWORD is required to run the Functional test suite.');
}

const testData = {
  // Login credentials
  credentials: {
    validUser: {
      username: 'intakeumportal',
      password: validPassword
    },
    invalidUser: {
      username: 'invaliduser@example.com',
      password: process.env.QACAREPRO_INVALID_PASSWORD || 'invalid-test-value'
    },
    testUser: {
      username: 'testuser@example.com',
      password: process.env.QACAREPRO_TEST_PASSWORD || 'invalid-test-value'
    },
    specialCharUser: {
      username: 'test+special.user@example.com',
      password: process.env.QACAREPRO_SPECIAL_PASSWORD || 'invalid-test-value'
    },
    mixedCaseUser: {
      username: 'TestUser@Example.com',
      password: process.env.QACAREPRO_MIXED_CASE_PASSWORD || 'invalid-test-value'
    }
  },

  // Application URLs
  urls: {
    login: 'https://qacarepro.specialtycare.corp.evolenthealth.com/',
    dashboard: 'https://qacarepro.specialtycare.corp.evolenthealth.com/dashboard',
    home: 'https://qacarepro.specialtycare.corp.evolenthealth.com/home'
  },

  // Locators
  locators: {
    username: '#UserName',
    password: '#Password',
    loginButton: 'input[type="submit"][value="Log On"]',
    rememberMe: 'input[name="RememberMe"]',
    userMenu: '#loggedInUser > .ms-auto',
    logoutButton: '#loggedInUser li[data-bind*="handleLogOffClick"]',
    userLabel: '//label[@for="UserName"]',
    passwordLabel: '//label[@for="Password"]',
    validationMessage: '.field-validation-error',
    errorMessage: '.field-validation-error',
    alertMessage: '[role="alert"]'
  },

  // Timeouts (in milliseconds)
  timeouts: {
    navigation: 10000,
    element: 5000,
    page: 30000,
    network: 1000
  },

  // Test scenarios
  scenarios: {
    validLogin: {
      description: 'Valid user login with correct credentials',
      username: 'intakeumportal',
      password: validPassword,
      expectedResult: 'Login successful'
    },
    invalidLogin: {
      description: 'Invalid user login with wrong credentials',
      username: 'invaliduser@example.com',
      password: process.env.QACAREPRO_INVALID_PASSWORD || 'invalid-test-value',
      expectedResult: 'Login failed - error message displayed'
    },
    emptyUsername: {
      description: 'Login attempt with empty username',
      username: '',
      password: validPassword,
      expectedResult: 'Validation error for username field'
    },
    emptyPassword: {
      description: 'Login attempt with empty password',
      username: 'intakeumportal',
      password: '',
      expectedResult: 'Validation error for password field'
    },
    emptyBothFields: {
      description: 'Login attempt with empty username and password',
      username: '',
      password: '',
      expectedResult: 'Validation errors for both fields'
    }
  }
};

module.exports = testData;
