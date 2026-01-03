let cola = [];
const VISUAL_COLA = document.getElementById('cola-visual');
const CODIGO_COLA = document.getElementById('codigo-c-cola');

// Clave única para guardar los datos de la cola en el navegador
const STORAGE_KEY_COLA = 'cola_datos';

// Función para inicializar/crear una cola nueva
function crearColaNueva() {
    cola = [];
    actualizarVisualizacionCola();
    CODIGO_COLA.textContent = '// Cola nueva vacía creada.';
}

// --- LOCAL STORAGE (Guardar/Cargar) ---
// Reemplaza las funciones de servidor para cumplir con el requisito de almacenamiento local 

function cargarCola() {
    // Intentamos recuperar los datos con la clave específica
    const datosGuardados = localStorage.getItem(STORAGE_KEY_COLA);
    
    if (datosGuardados) {
        try {
            cola = JSON.parse(datosGuardados); // Convertimos texto a Array
            actualizarVisualizacionCola();
            alert("Cola cargada desde LocalStorage exitosamente.");
        } catch (error) {
            console.error("Error al leer datos:", error);
            alert("Error al cargar los datos guardados.");
        }
    } else {
        alert("No hay una cola guardada previamente.");
    }
}

function guardarCola() {
    try {
        // Guardamos el array convertido a texto JSON
        localStorage.setItem(STORAGE_KEY_COLA, JSON.stringify(cola));
        alert("Cola guardada en el navegador (LocalStorage).");
    } catch (error) {
        console.error("Error al guardar:", error);
        alert("No se pudo guardar la cola (posiblemente almacenamiento lleno).");
    }
}

// --- VISUALIZACIÓN ---
function actualizarVisualizacionCola() {
    VISUAL_COLA.innerHTML = '';
    
    // Los elementos se enfilan horizontalmente de izquierda a derecha [cite: 27]
    // Índice 0 es el frente (izquierda), último índice es el final (derecha)
    cola.forEach(elemento => {
        const div = document.createElement('div');
        div.className = 'elemento-cola'; // Los elementos se representan en un cuadrado [cite: 28]
        div.textContent = elemento;
        VISUAL_COLA.appendChild(div);
    });
}

// --- OPERACIONES ---

// Insertar elemento (Enqueue) [cite: 25]
function ejecutarEnqueue() {
    const valorInput = document.getElementById('valor-cola').value;
    const valor = parseInt(valorInput);
    
    // Validación básica
    if (isNaN(valor) || valorInput.trim() === "") {
        alert("Ingrese un número válido");
        return;
    }

    // Mostrar el código C correspondiente [cite: 26]
    mostrarCodigoCola('enqueue');

    // Animación de entrada
    const nuevoDiv = document.createElement('div');
    nuevoDiv.className = 'elemento-cola';
    nuevoDiv.textContent = valor;
    nuevoDiv.style.opacity = '0';
    nuevoDiv.style.transform = 'translateX(50px)'; // Entra desde la derecha
    VISUAL_COLA.appendChild(nuevoDiv);

    // Ejecutar animación visual
    setTimeout(() => {
        nuevoDiv.style.opacity = '1';
        nuevoDiv.style.transform = 'translateX(0)';
    }, 50);

    // Actualizar estructura de datos lógica después de la animación
    setTimeout(() => {
        cola.push(valor); // Inserta al final
        actualizarVisualizacionCola();
    }, 550);
}

// Sacar elemento (Dequeue) [cite: 25]
function ejecutarDequeue() {
    if (cola.length === 0) {
        alert("La cola está vacía, no se puede realizar dequeue.");
        return;
    }

    // Mostrar el código C correspondiente [cite: 26]
    mostrarCodigoCola('dequeue');

    // Animación de salida (el primero, a la izquierda)
    const primerElemento = VISUAL_COLA.firstElementChild; // El frente está a la izquierda [cite: 27]
    if (primerElemento) {
        primerElemento.style.transform = 'translateY(-50px)'; // Sale hacia arriba
        primerElemento.style.opacity = '0';
    }

    // Actualizar estructura de datos lógica después de la animación
    setTimeout(() => {
        cola.shift(); // Elimina del inicio (Array shift saca el índice 0)
        actualizarVisualizacionCola();
    }, 550);
}

function mostrarCodigoCola(operacion) {
    if (operacion === 'enqueue') {
        CODIGO_COLA.textContent = `
// Función Enqueue (Insertar al final)
void enqueue(struct Cola* q, int valor) {
    // Crear nuevo nodo
    struct Nodo* temp = (struct Nodo*)malloc(sizeof(struct Nodo));
    temp->dato = valor;
    temp->siguiente = NULL;
    // Si la cola está vacía, frente y fin son el nuevo nodo
    if (q->fin == NULL) {
        q->frente = q->fin = temp;
    } else {
        // Agregar al final y actualizar puntero fin
        q->fin->siguiente = temp;
        q->fin = temp;
    }
    printf("Insertado %d\\n", valor);
}`;
    } else {
        CODIGO_COLA.textContent = `
// Función Dequeue (Sacar del inicio)
int dequeue(struct Cola* q) {
    // Verificar si está vacía
    if (q->frente == NULL) return -1;
    
    // Guardar nodo temporalmente
    struct Nodo* temp = q->frente;
    int dato = temp->dato;
    
    // Mover frente al siguiente nodo
    q->frente = q->frente->siguiente;
    
    // Si la cola queda vacía, actualizar fin a NULL
    if (q->frente == NULL) q->fin = NULL;
    
    free(temp);
    return dato;
}`;
    }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', crearColaNueva);