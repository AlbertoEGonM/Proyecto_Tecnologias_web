#include <stdio.h>
#include <stdlib.h>

// Definición de la estructura de un Nodo
struct Nodo {
    int dato;
    struct Nodo* siguiente;
};

// Se usa un puntero a un Nodo (la cima) para representar la Pila
typedef struct Nodo* Pila; 

// Inicializa una Pila vacía
void inicializarPila(Pila* cima) {
    *cima = NULL;
}

// *************** Operación PUSH (Insertar) ***************
// El código a mostrar al hacer PUSH en el proyecto:
void push(Pila* cima, int dato) {
    // 1. Crear el nuevo nodo
    struct Nodo* nuevoNodo = (struct Nodo*)malloc(sizeof(struct Nodo));
    if (nuevoNodo == NULL) {
        printf("Error: Desbordamiento de pila (falta de memoria)\n");
        return;
    }
    nuevoNodo->dato = dato;
    
    // 2. El 'siguiente' del nuevo nodo apunta a la cima actual
    nuevoNodo->siguiente = *cima; 
    
    // 3. Mover la cima para que apunte al nuevo nodo (el nuevo tope)
    *cima = nuevoNodo; 
    printf("Elemento %d insertado (push)\n", dato);
}

// *************** Operación POP (Sacar) ***************
// El código a mostrar al hacer POP en el proyecto:
int pop(Pila* cima) {
    if (*cima == NULL) {
        printf("Error: Pila vacía (no se puede sacar)\n");
        return -1; // Valor de error, se podría usar una función 'isEmpty'
    }
    
    // 1. Guardar el nodo superior (el que se va a eliminar)
    struct Nodo* temp = *cima;
    int datoExtraido = temp->dato;
    
    // 2. Mover la cima al siguiente nodo (el nuevo tope)
    *cima = (*cima)->siguiente;
    
    // 3. Liberar la memoria del nodo que se saca
    free(temp); 
    printf("Elemento %d sacado (pop)\n", datoExtraido);
    return datoExtraido;
}

// Función auxiliar para verificar si la pila está vacía
int isEmpty(Pila cima) {
    return cima == NULL;
}

// Función auxiliar para mostrar la pila (opcional para el avance)
void mostrarPila(Pila cima) {
    struct Nodo* actual = cima;
    printf("Pila (Cima -> Fondo): \n");
    while (actual != NULL) {
        printf("  | %d |\n", actual->dato);
        actual = actual->siguiente;
    }
    printf("  -----\n");
}