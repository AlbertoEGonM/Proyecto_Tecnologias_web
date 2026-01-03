let pila = [];
const VISUAL_CONTAINER = document.getElementById('pila-visual');
const CODIGO_DISPLAY = document.getElementById('codigo-c-display');

// Clave para identificar los datos en el navegador
const STORAGE_KEY = 'pila_datos'; 

// Función para inicializar/crear una pila nueva
function crearPilaNueva() {
    pila = [];
    actualizarVisualizacion();
    CODIGO_DISPLAY.textContent = '// Pila vacía creada.';
    // Opcional: Limpiar el storage al crear nueva, o dejarlo como está
    // localStorage.removeItem(STORAGE_KEY); 
}

// Función para cargar la pila desde LocalStorage
function cargarPila() {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    
    if (datosGuardados) {
        try {
            pila = JSON.parse(datosGuardados); // Convertir texto JSON a Array
            actualizarVisualizacion();
            alert("Pila cargada desde LocalStorage.");
        } catch (e) {
            console.error("Error al leer los datos", e);
            alert("Error al cargar los datos guardados.");
        }
    } else {
        alert("No hay una pila guardada previamente.");
    }
}

// Función para guardar la pila en LocalStorage
function guardarPila() {
    try {
        const datosJSON = JSON.stringify(pila); // Convertir Array a texto JSON
        localStorage.setItem(STORAGE_KEY, datosJSON);
        alert("Pila guardada en el navegador exitosamente.");
    } catch (e) {
        console.error("Error al guardar", e);
        alert("No se pudo guardar la pila (posiblemente almacenamiento lleno o bloqueado).");
    }
}

// Función para actualizar la visualización de la pila
function actualizarVisualizacion() {
    VISUAL_CONTAINER.innerHTML = '';
    pila.forEach(elemento => {
        const div = document.createElement('div');
        div.className = 'elemento-pila'; // Los elementos se representan en un cuadrado
        div.textContent = elemento;
        VISUAL_CONTAINER.appendChild(div);
    });
}

// Implementación de PUSH (Insertar)
function ejecutarPush() {
    const valorInput = document.getElementById('valor-insertar').value;
    const valor = parseInt(valorInput);
    if (isNaN(valor) || valorInput.trim() === "") {
        alert("Por favor, ingrese un número válido.");
        return;
    }
    
    // 1. Mostrar el código C de la operación
    mostrarCodigoC('push');
    
    // 2. Animación: Crear el nuevo nodo y prepararlo
    const nuevoDiv = document.createElement('div');
    nuevoDiv.className = 'elemento-pila';
    nuevoDiv.textContent = valor;
    nuevoDiv.style.opacity = '0'; // Comienza invisible
    nuevoDiv.style.transform = 'translateY(20px)'; // Comienza ligeramente abajo
    
    // 3. Añadir el elemento al DOM
    VISUAL_CONTAINER.appendChild(nuevoDiv);
    
    // 4. Iniciar la animación
    setTimeout(() => {
        nuevoDiv.style.opacity = '1';
        nuevoDiv.style.transform = 'translateY(0)';
    }, 50);
    
    // 5. Agregar el elemento a la estructura de datos (Pila)
    setTimeout(() => {
        pila.push(valor); // LIFO: Last In, First Out
        actualizarVisualizacion(); // Se actualiza después de la animación para mejor efecto
    }, 550);
}

// Implementación de POP (Sacar)
function ejecutarPop() {
    if (pila.length === 0) {
        alert("La pila está vacía, no se puede hacer pop.");
        return;
    }
    
    // 1. Mostrar el código C de la operación
    mostrarCodigoC('pop');
    
    // 2. Animación: Obtener el elemento a sacar (el de arriba)
    const elementoASacar = VISUAL_CONTAINER.lastElementChild;
    if (elementoASacar) {
        // 3. Iniciar animación para sacar el elemento
        elementoASacar.style.transform = 'translateY(-20px)';
        elementoASacar.style.opacity = '0';
    }
    
    // 4. Eliminar el elemento de la estructura de datos (Pila)
    setTimeout(() => {
        const elementoSacado = pila.pop(); // Sacar el último elemento (el de arriba)
        console.log(`Elemento sacado: ${elementoSacado}`);
        actualizarVisualizacion();
    }, 550);
}

// Función para mostrar el código C correspondiente
function mostrarCodigoC(operacion) {
    if (operacion === 'push') {
        CODIGO_DISPLAY.textContent = `
// Función push para agregar un elemento a la pila
void push(struct Nodo** cima, int dato) {
    // 1. Crear el nuevo nodo
    struct Nodo* nuevoNodo = (struct Nodo*)malloc(sizeof(struct Nodo));
    if (nuevoNodo == NULL) {
        printf("Error: Desbordamiento de pila (falta de memoria)\\n");
        return;
    }
    nuevoNodo->dato = dato;
    // 2. El 'siguiente' del nuevo nodo apunta a la cima actual
    nuevoNodo->siguiente = *cima;
    // 3. Mover la cima para que apunte al nuevo nodo (se inserta al principio)
    *cima = nuevoNodo;
    printf("Elemento %d insertado (push)\\n", dato);
}
        `;
    } else if (operacion === 'pop') {
        CODIGO_DISPLAY.textContent = `
// Función pop para sacar un elemento de la pila
int pop(struct Nodo** cima) {
    if (*cima == NULL) {
        printf("Error: Pila vacía (no se puede sacar)\\n");
        return -1; // Valor de error
    }
    // 1. Guardar el nodo superior (el que se va a eliminar)
    struct Nodo* temp = *cima;
    int datoExtraido = temp->dato;
    // 2. Mover la cima al siguiente nodo (el nuevo tope)
    *cima = (*cima)->siguiente;
    // 3. Liberar la memoria del nodo que se saca
    free(temp);
    printf("Elemento %d sacado (pop)\\n", datoExtraido);
    return datoExtraido;
}
        `;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', crearPilaNueva);