# Visualizador Interactivo de Estructuras de Datos

Este proyecto es una plataforma educativa e interactiva diseñada para entorno web que permite visualizar, en tiempo real, el comportamiento dinámico de las tres estructuras de datos lineales fundamentales: **Pilas**, **Colas** y **Listas Simplemente Enlazadas**. 

La herramienta no solo emula el comportamiento lógico de cada estructura mediante animaciones en el DOM, sino que también genera de forma dinámica los bloques de código correspondientes en **Lenguaje C** (`malloc`, `free` y gestión de punteros), sirviendo como un excelente puente entre la abstracción lógica y la implementación de bajo nivel.

---

## Características Principales

* **Renderizado Dinámico y Animaciones:** * **Pila (LIFO):** Los elementos se apilan verticalmente. Las inserciones (`push`) y extracciones (`pop`) ocurren por el tope de la estructura con transiciones de desplazamiento vertical.
    * **Cola (FIFO):** Los elementos se forman horizontalmente. El ingreso (`enqueue`) entra por el extremo derecho (final) y la salida (`dequeue`) se procesa desde el extremo izquierdo (frente).
    * **Lista Simplemente Enlazada:** Los nodos se renderizan en una secuencia horizontal con flechas (`→`) que representan los punteros lógicos y un indicador explícito que apunta a `NULL` para denotar el final de la lista. Soporta inserciones y eliminaciones en posiciones arbitrarias (Inicio, Final, Posición).
* **Persistencia Local Autónoma:** Implementación de la API de `LocalStorage` del navegador de manera independiente para cada estructura de datos a través de claves únicas (`pila_datos`, `cola_datos`, `lista_datos`). Esto permite salvaguardar el estado actual del simulador y restaurarlo incluso tras recargar la página.
* **Sincronización con Código C:** Al disparar cualquier operación, la interfaz muta un contenedor `<pre>` mostrando las funciones exactas en C utilizando paso por referencia (punteros dobles `Nodo**`) para modificar las cabeceras/cimas reales de las estructuras.

---

## Arquitectura Tecnológica

* **HTML5 Semántico:** Estructuración de las tres áreas independientes de simulación mediante layouts limpios.
* **CSS3 Avanzado (Custom Properties & Keyframes):** Control de la paleta cromática por variables globales (`:root`), layouts flexibles con *Flexbox* (manejando direcciones de flujo `column-reverse` para la Pila y `row` para Colas y Listas), y control de estados de animación para suavizar las transiciones de opacidad y transformación espacial.
* **Vanilla JavaScript (ES6+):** Manipulación limpia del DOM (`document.createElement`, `querySelectorAll`), temporizadores nativos (`setTimeout`) para coordinar la ejecución del flujo asíncrono entre la animación visual y la mutación de los arreglos internos en memoria.

---

## Estructura del Repositorio

```text
├── index.html               # Interfaz principal: Módulo de la Pila
├── cola.html                # Interfaz del módulo de la Cola
├── lista_enlazada.html      # Interfaz del módulo de la Lista Enlazada
├── style/
│   └── style.css            # Estilos globales, layouts estructurales y animaciones
└── js/
    ├── pila.js              # Lógica LIFO, animaciones verticales y storage de Pila
    ├── cola.js              # Lógica FIFO, animaciones horizontales y storage de Cola
    └── lista.js             # Gestión de nodos dinámicos, punteros intermedios y storage de Lista
