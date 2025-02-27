# ProjectWsl

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

## Procedimiento

1.- Para instalar Windows Subsystem for Linux (WSL) empezamos por abrir nuestra terminal de PowerShell como administrador y escribimos el comando de:
`wsl –install`.
Nota: Para que la terminal de WSL se abra directamente en Ubuntu podemos hacerlo con el comando de: 
`wsl --setdefault Ubuntu`.

2.- Iniciamos Ubuntu ejecutando wsl en la terminal lo cual puede solicitarte configurar un nombre de usuario y posteriormente una contraseña para el mismo por lo que es importante recordarla y/o tenerla a la mano a la hora de establecerla.

3.- Con el acceso a Ubuntu podemos ya cerrar la terminal de PowerShell y abrir la terminal de WSL que instalamos para proceder a instalar unas herramientas necesarias para nuestro proyecto. En este caso al trabajar y ocupar Angular necesitamos:
```bash
sudo apt update
sudo apt install nodejs npm
sudo npm install -g @angular/cli
```

4.- Podemos crear un proyecto en Angular en la terminal de WSL con el comando de:
`ng new project-wsl`.
Nota: `project-wsl` es el nombre que le asignaremos al proyecto.
IMPORTANTE: En ocasiones este comando no genera el archivo de `app.module.ts` por lo que para evitar esto se debe de usar el flag de `--no-standalone`. Por lo tanto, el comando que se utilizó para crear el proyecto fue:
`ng new project-wsl --no-standalone`.

5.- Navegamos al directorio del proyecto con: `cd angular-wsl` y una vez dentro creamos 2 componentes. El primero simplemente imprimirá un saludo, se crea con:
`ng generate component saludo`.

6.- Posteriormente creamos el componente de la calculadora con:
`ng generate component calculadora`.

7.- Una vez codificados los componentes, hacer los imports necesarios y mandar a llamar los componentes en `app.component.html` ya se puede ejecutar nuestra aplicación, sin embargo, esto lo haremos mediante un script de bash. Lo creamos y editamos con el comando de:
`nano menu.sh`
Añadimos el contenido del menú:
```bash
#!/bin/bash
# --------------------------------------------------
# Script: menu.sh
# Descripción: Menú interactivo para ejecutar Angular y pruebas (Selenium y Cucumber).
# Uso: ./menu.sh
# --------------------------------------------------

while true; do
    clear
    echo "Menú Principal"
    echo "1. Ejecutar proyecto Angular (ng serve)"
    echo "2. Ejecutar prueba unitaria con Selenium WebDriver"
    echo "3. Ejecutar prueba con Cucumber (Gherkin)"
    echo "4. Salir"
    echo
    read -p "Elige una opción [1-4]: " opcion

    case $opcion in
        1)
            echo "Ejecutando proyecto Angular..."
            ng serve
            read -p "Presiona Enter para volver al menú..."
            ;;
        2)
            echo "Ejecutando prueba unitaria con Selenium WebDriver..."
            node src/app/tests/saludo-test.js
            read -p "Presiona Enter para volver al menú..."
            ;;
        3)
            echo "Ejecutando prueba con Cucumber (Gherkin)..."
            cat features/saludo.feature
            npx cucumber-js
            read -p "Presiona Enter para volver al menú..."
            ;;
        4)
            echo "Saliendo del sistema. Que tengas un buen día!..."
            exit 0
            ;;
        *)
            echo "Opción inválida, intenta de nuevo."
            read -p "Presiona Enter para continuar..."
            ;;
    esac
done
```
Terminando de editar guardadnos los cambios con `Ctrl + O` y confirmamos el nombre de nuestro archivo dando `Enter`. Por ultimo salimos de nano con `Ctrl + X`.

8.- Con el script listo simplemente procedemos a darle permisos de ejecución con:
`chmod +x menu.sh`

9.- Finalmente ejecutamos el script con:
`./menu.sh`

## Prueba con Selenium Webdriver

1.- Para la segunda opción del menú se crea una carpeta de tests y en ella se crea el archivo de `saludo-test.js` que básicamente solo verifica que el mensaje del archivo `saludo.component.html` si exista y esté presente.

2.- Para poder ejecutar nuestras pruebas debemos instalar en la raíz del proyecto tanto Selenium Webdriver como ChromeDriver con:
```
npm install selenium-webdriver
npm install chromedriver
```

3.- Se incluye en la lógica en el script del menú para que esta prueba con Selenium se ejecute al elegir la opción 2.
```JavaScript
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
```
NOTA IMPORTANTE: La prueba solo podrá ser ejecutada correctamente con la aplicación de Angular levantada por lo que es indispensable elegir la opción número 1 (que ejecuta el proyecto de Angular) antes de querer elegir la segunda, de lo contrario la prueba será un fracaso y arrojará errores.

## Prueba con Cucumber

1.- Para la tercera opción del menú se busca implementar una prueba bajo la misma lógica que con la del archivo saludo-test.js solo que ahora implementando Cucumber y el lenguaje conocido como Gherkin para facilitar la comprensión de la prueba sin ocupar un lenguaje tan técnico sino más amistoso y cotidiano por así decirlo. Lo primero que se tiene que hacer es instalar Cucumber en la raíz del proyecto de Angular con:
`npm install --save-dev @cucumber/cucumber`

2.- Procedemos a crear una carpeta de `features` con un archivo denominado `saludo.feature` que contendrá el lenguaje natural de Gherkin para explicar la prueba:
```
Feature: Verificar mensaje en el componente Saludo
  Como usuario de la aplicación
  Quiero ver un mensaje de bienvenida
  Para saber que la aplicación funciona correctamente

  Scenario: Mostrar mensaje en el componente
    Given que la aplicación Angular está corriendo en "http://localhost:4200"
    When se busca el mensaje en la página
    Then debería ver "Hello World from Angular" en la página
```

3.- Posteriormente creamos una carpeta denominada `step_definitions` que contendrá un archivo que maneje la lógica de la prueba de cucumber, en este caso será el archivo de `saludo.step.js`
Nota: Para ejecutar exitosamente las pruebas con Cucumber en el menú es importante añadir esto en los scripts del package.json:
```
 "scripts": {
    "cucumber": "cucumber-js"
  }
```

4.- Se incluye en la lógica en el script del menú para que esta prueba con Cucumber se ejecute al elegir la opción 3.
NOTA IMPORTANTE: Al igual que con la prueba de Selenium, esta prueba solo podrá ser ejecutada correctamente con la aplicación de Angular levantada por lo que es indispensable elegir la opción número 1 (que ejecuta el proyecto de Angular) antes de querer esta tercera opción, de lo contrario la prueba será un fracaso y arrojará errores.