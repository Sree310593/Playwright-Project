// @ts-check
const { devices } = require('@playwright/test');
const config = {
 testDir: './tests',
 testMatch: '**/*.spec.js',
 retries: 0,

 /* Maximum time one test can run for. */
 timeout: 30 * 1000,
 expect: {
   timeout: 5000
 },
 reporter: 'html',
 use: {
   actionTimeout: 10 * 1000,
   navigationTimeout: 30 * 1000,
   headless: true,
   screenshot: 'on',
   trace: 'retain-on-failure',//off,on
 },
 projects: [
   {
     name: 'safari',
     use: {
       ...devices['Desktop Safari'],
     },
   },
   {
     name: 'chrome',
     use: {
       ...devices['Desktop Chrome'],
     },
   },
 ],
};
module.exports = config;