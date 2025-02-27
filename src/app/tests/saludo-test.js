const { Builder, By, until } = require('selenium-webdriver');

(async function testSaludo() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:4200');
    
    let element = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(),'Hello World from Angular')]")),
      10000
    );
    let text = await element.getText();

    if (text.includes("Hello World from Angular")) {
      console.log("Prueba exitosa: Se encontró el mensaje.");
    } else {
      console.log("Prueba fallida: El mensaje no coincide.");
    }
  } catch (err) {
    console.error("Error durante la prueba:", err);
  } finally {
    await driver.quit();
  }
})();