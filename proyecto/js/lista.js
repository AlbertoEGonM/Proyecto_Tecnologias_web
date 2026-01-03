let lista = []; // Array que simula la lista enlazada
const VISUAL_LISTA = document.getElementById('lista-visual');
const CODIGO_LISTA = document.getElementById('codigo-c-lista');

// Clave única para guardar la lista en el navegador
const STORAGE_KEY_LISTA = 'lista_datos';

// --- INICIALIZACIÓN ---
function crearListaNueva() {
    lista = [];
    actualizarVisualizacion();
    CODIGO_LISTA.textContent = '// Lista nueva inicializada a NULL';
}

// --- LOCAL STORAGE (Guardar/Cargar) ---
function cargarLista() {
    // Intentamos obtener los datos guardados bajo la clave
    const datosGuardados = localStorage.getItem(STORAGE_KEY_LISTA);
    
    if (datosGuardados) {
        try {
            lista = JSON.parse(datosGuardados); // Convertir texto a Array
            actualizarVisualizacion();
            alert("Lista cargada desde LocalStorage correctamente.");
        } catch (e) {
            console.error(e);
            alert("Error al leer los datos guardados.");
        }
    } else {
        alert("No hay una lista guardada previamente.");
    }
}

function guardarLista() {
    try {
        // Convertimos el array a texto JSON
        localStorage.setItem(STORAGE_KEY_LISTA, JSON.stringify(lista));
        alert("Lista guardada en LocalStorage.");
    } catch (e) {
        console.error(e);
        alert("Error al guardar (posiblemente almacenamiento lleno).");
    }
}

// --- VISUALIZACIÓN ---
function actualizarVisualizacion() {
    VISUAL_LISTA.innerHTML = '';
    
    lista.forEach((valor, index) => {
        // Contenedor del nodo completo (dato + flecha)
        const nodoDiv = document.createElement('div');
        nodoDiv.className = 'nodo-lista';
        
        // Parte del Dato
        const datoDiv = document.createElement('div');
        datoDiv.className = 'nodo-dato';
        datoDiv.textContent = valor;
        
        nodoDiv.appendChild(datoDiv);

        // Parte de la Flecha (si no es el último)
        if (index < lista.length - 1) {
            const flecha = document.createElement('div');
            flecha.className = 'nodo-flecha';
            nodoDiv.appendChild(flecha);
        } else {
            // Indicador NULL para el último
            const nulo = document.createElement('span');
            nulo.className = 'nodo-null';
            nulo.textContent = '→ NULL';
            nodoDiv.appendChild(nulo);
        }

        VISUAL_LISTA.appendChild(nodoDiv);
    });
}

// --- OPERACIONES DE INSERCIÓN ---
function insertarInicio() {
    const val = obtenerValor();
    if (val === null) return;
    
    mostrarCodigo('insertarInicio', val);
    lista.unshift(val); // Insertar al inicio del array
    animarInsertar(0);
}

function insertarFinal() {
    const val = obtenerValor();
    if (val === null) return;

    mostrarCodigo('insertarFinal', val);
    lista.push(val);
    animarInsertar(lista.length - 1);
}

function insertarPosicion() {
    const val = obtenerValor();
    const pos = obtenerPosicion();
    if (val === null || pos === null) return;

    if (pos < 0 || pos > lista.length) {
        alert("Posición inválida");
        return;
    }

    mostrarCodigo('insertarPos', val, pos);
    lista.splice(pos, 0, val); // Insertar en posición específica
    animarInsertar(pos);
}

// --- OPERACIONES DE ELIMINACIÓN ---
function eliminarInicio() {
    if (lista.length === 0) return alert("Lista vacía");
    
    mostrarCodigo('eliminarInicio');
    lista.shift();
    actualizarVisualizacion();
}

function eliminarFinal() {
    if (lista.length === 0) return alert("Lista vacía");
    
    mostrarCodigo('eliminarFinal');
    lista.pop();
    actualizarVisualizacion();
}

function eliminarPosicion() {
    const pos = obtenerPosicion();
    if (pos === null) return;
    if (pos < 0 || pos >= lista.length) return alert("Posición inválida");

    mostrarCodigo('eliminarPos', null, pos);
    lista.splice(pos, 1);
    actualizarVisualizacion();
}

function eliminarValor() {
    const val = obtenerValor();
    if (val === null) return;
    
    const index = lista.indexOf(val);
    if (index === -1) return alert("Valor no encontrado en la lista");

    mostrarCodigo('eliminarVal', val);
    lista.splice(index, 1); // Eliminar la primera ocurrencia encontrada
    actualizarVisualizacion();
}

// --- UTILIDADES ---
function obtenerValor() {
    const v = document.getElementById('valor-lista').value;
    if (v === '') { alert("Ingrese un valor"); return null; }
    return parseInt(v);
}

function obtenerPosicion() {
    const p = document.getElementById('posicion-lista').value;
    if (p === '') { alert("Ingrese una posición"); return null; }
    return parseInt(p);
}

function animarInsertar(index) {
    // Renderizamos primero
    actualizarVisualizacion();
    // Buscamos el nodo recien creado para animarlo
    const nodos = document.querySelectorAll('.nodo-lista');
    if (nodos[index]) {
        nodos[index].style.opacity = '0';
        nodos[index].style.transform = 'translateY(-20px)';
        setTimeout(() => {
            nodos[index].style.opacity = '1';
            nodos[index].style.transform = 'translateY(0)';
        }, 50);
    }
}

function mostrarCodigo(tipo, val, pos) {
    let c = "";
    switch(tipo) {
        case 'insertarInicio':
            c = `void insertarInicio(Nodo** cabeza, int v) {
    Nodo* nuevo = (Nodo*)malloc(sizeof(Nodo));
    nuevo->dato = ${val};
    nuevo->sig = *cabeza;
    *cabeza = nuevo;
}`; break;
        case 'insertarFinal':
            c = `void insertarFinal(Nodo** cabeza, int v) {
    Nodo* nuevo = (Nodo*)malloc(sizeof(Nodo));
    nuevo->dato = ${val};
    nuevo->sig = NULL;
    if (*cabeza == NULL) { *cabeza = nuevo; return; }
    Nodo* temp = *cabeza;
    while (temp->sig != NULL) temp = temp->sig;
    temp->sig = nuevo;
}`; break;
        case 'insertarPos':
            c = `void insertarPos(Nodo** cabeza, int v, int pos) {
    // Inserta ${val} en la posicion ${pos}
    Nodo* nuevo = (Nodo*)malloc(sizeof(Nodo));
    nuevo->dato = v;
    if (pos == 0) { nuevo->sig = *cabeza; *cabeza = nuevo; return; }
    Nodo* temp = *cabeza;
    for(int i=0; i<pos-1 && temp!=NULL; i++) temp = temp->sig;
    if(temp == NULL) return; // Pos invalida
    nuevo->sig = temp->sig;
    temp->sig = nuevo;
}`; break;
        case 'eliminarValor':
            c = `void eliminarValor(Nodo** cabeza, int val) {
    // Elimina el nodo con valor ${val}
    Nodo *temp = *cabeza, *prev;
    if (temp != NULL && temp->dato == val) {
        *cabeza = temp->sig; free(temp); return;
    }
    while (temp != NULL && temp->dato != val) {
        prev = temp; temp = temp->sig;
    }
    if (temp == NULL) return;
    prev->sig = temp->sig;
    free(temp);
}`; break;
        default: c = "// Código de la operación...";
    }
    CODIGO_LISTA.textContent = c;
}