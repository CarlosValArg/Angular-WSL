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