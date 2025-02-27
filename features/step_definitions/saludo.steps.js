const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

let driver;

Before(async function () {
  let options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
  driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
});

After(async function () {
  await driver.quit();
});

Given('que la aplicación Angular está corriendo en {string}', async function (url) {
  await driver.get(url);
});

When('se busca el mensaje en la página', async function () {
  await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Hello World from Angular')]")), 10000);
});

Then('debería ver {string} en la página', async function (expectedText) {
  let element = await driver.findElement(By.xpath(`//*[contains(text(),'${expectedText}')]`));
  let text = await element.getText();
  assert.strictEqual(text.includes(expectedText), true, `El texto obtenido: ${text} no contiene el esperado: ${expectedText}`);
});