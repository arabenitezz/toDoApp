// Custom state management and rendering framework
const CustomStore = {
  data: { tasks: [] },
  subscribers: [],

  // Get the current state
  getCurrentState() {
    return this.data;
  },

  // Add a subscriber to be notified on state changes
  addSubscriber(callback) {
    this.subscribers.push(callback);
  },

  // Update the state and notify all subscribers
  updateState(newData) {
    this.data = { ...this.data, ...newData };
    this.subscribers.forEach(subscriber => subscriber());
  }
};

// Custom rendering framework
const CustomRenderer = {
  createNode(elementType, properties, ...children) {
    return {
      elementType,
      properties: { ...properties, children }
    };
  },

  render(virtualNode, targetContainer) {
    if (!targetContainer) return;

    targetContainer.textContent = ""; // Clear the container
    targetContainer.appendChild(this.createDOMNode(virtualNode));
  },

  createDOMNode(node) {
    if (typeof node === "string" || typeof node === "number") {
      return document.createTextNode(node);
    }

    const domNode = document.createElement(node.elementType);

    // Set properties and event listeners
    Object.entries(node.properties || {}).forEach(([key, value]) => {
      if (key === "children") return;
      if (key.startsWith("on")) {
        const eventName = key.slice(2).toLowerCase();
        domNode.addEventListener(eventName, value);
      } else {
        domNode[key] = value;
      }
    });

    // Render children
    (node.properties.children || []).forEach(child => {
      domNode.appendChild(this.createDOMNode(child));
    });

    return domNode;
  }
};

// Export the framework as a single object
const frameworkNe = {
  CustomStore,
  createNode: CustomRenderer.createNode.bind(CustomRenderer),
  render: CustomRenderer.render.bind(CustomRenderer)
};

export default frameworkNe;