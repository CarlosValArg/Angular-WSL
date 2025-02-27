Feature: Verificar mensaje en el componente Saludo
  Como usuario de la aplicación
  Quiero ver un mensaje de bienvenida
  Para saber que la aplicación funciona correctamente

  Scenario: Mostrar mensaje en el componente
    Given que la aplicación Angular está corriendo en "http://localhost:4200"
    When se busca el mensaje en la página
    Then debería ver "Hello World from Angular" en la página