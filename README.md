# Documentación del Framework

Este es un framework minimalista de JavaScript que implementa una arquitectura FLUX y un sistema de renderizado basado en un virtual DOM ligero. A continuación, se detalla cómo usarlo y su documentación técnica.

---

## Guía de "Cómo Hacerlo"

### 1. **Instalación**
No se necesitan dependencias adicionales. Simplemente incluye el archivo `customFramework.js` en tu proyecto.

### 2. **Uso Básico**
1. Importa el framework en tu archivo principal:
   ```javascript
   import customFramework from './customFramework.js';
   const { CustomStore, executeAction, createNode, render } = customFramework;
   ```

2. Define el estado inicial:
   ```javascript
   CustomStore.updateState({ tasks: [] });
   ```

3. Crea un componente:
   ```javascript
   function MyComponent() {
     return createNode("div", null, "Hello, World!");
   }
   ```

4. Renderiza el componente:
   ```javascript
   const appRoot = document.getElementById("appRoot");
   render(MyComponent(), appRoot);
   ```

### 3. **Manejo del Estado**
- Actualiza el estado usando `executeAction`:
  ```javascript
  executeAction({ type: "ADD_TASK", payload: "New Task" });
  ```

- Suscríbete a cambios en el estado:
  ```javascript
  CustomStore.addSubscriber(() => {
    console.log("State updated:", CustomStore.getCurrentState());
  });
  ```

### 4. **Creación de Componentes**
- Usa `createNode` para crear elementos virtuales:
  ```javascript
  const button = createNode("button", { onClick: handleClick }, "Click Me");
  ```

---

## Documentación Técnica Detallada

### **CustomStore**
Gestiona el estado de la aplicación.

- **Métodos**:
  - `getCurrentState()`: Devuelve el estado actual.
  - `addSubscriber(callback)`: Añade un callback que se ejecuta cuando el estado cambia.
  - `updateState(newData)`: Actualiza el estado y notifica a los suscriptores.

### **CustomRenderer**
Encargado de la creación y renderizado de elementos virtuales.

- **Métodos**:
  - `createNode(elementType, properties, ...children)`: Crea un nodo virtual.
  - `render(virtualNode, targetContainer)`: Renderiza el nodo virtual en el contenedor especificado.
  - `createDOMNode(node)`: Convierte un nodo virtual en un nodo real del DOM.

### **executeAction**
Maneja las acciones para modificar el estado.

- **Acciones**:
  - `ADD_TASK`: Añade una tarea al estado.
  - `REMOVE_TASK`: Elimina una tarea del estado.

### **Flujo de Datos**
El flujo sigue la arquitectura FLUX:

1. El usuario interactúa con la interfaz (por ejemplo, hace clic en un botón).
2. Se llama a `executeAction` con una acción específica.
3. El estado se actualiza en `CustomStore`.
4. Los suscriptores son notificados y la interfaz se re-renderiza.

---

