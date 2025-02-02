import frameworkNe from './frameworkNe.js';

const { CustomStore, executeAction, createNode, render } = frameworkNe;

// --- Initial State ---
CustomStore.updateState({ tasks: [] });

// --- Component: TaskManager ---
function TaskManager() {
  const { tasks } = CustomStore.getCurrentState();

  // Event to add a task
  const handleAddTask = () => {
    const input = document.getElementById("taskInput");
    if (input.value.trim()) {
      executeAction({ type: "ADD_TASK", payload: input.value.trim() });
      input.value = ""; // Clear the input field
    }
  };

  // Event to remove a task
  const handleRemoveTask = (index) => {
    executeAction({ type: "REMOVE_TASK", payload: index });
  };

  // Render the component
  return createNode(
    "div",
    { style: "font-family: Arial; max-width: 400px; margin: auto; text-align: center;" },
    createNode("h1", null, "Task Manager"),
    createNode(
      "div",
      null,
      createNode("input", { id: "taskInput", placeholder: "Enter a task..." }),
      createNode(
        "button",
        { onClick: handleAddTask, style: "margin-left: 10px;" },
        "Add Task"
      )
    ),
    createNode(
      "ul",
      null,
      ...tasks.map((task, index) =>
        createNode(
          "li",
          {
            style: "margin: 5px 0; display: flex; justify-content: space-between; align-items: center;"
          },
          createNode("span", null, task),
          createNode(
            "button",
            {
              onClick: () => handleRemoveTask(index),
              style: "background: red; color: white; border: none; padding: 5px;"
            },
            "Remove"
          )
        )
      )
    )
  );
}

// --- Reducer to handle actions ---
CustomStore.addSubscriber(() => {
  const currentState = CustomStore.getCurrentState();
  if (!currentState.tasks) {
    CustomStore.updateState({ tasks: [] });
  }
});

// --- Configure action execution ---
frameworkNe.executeAction = (action) => {
  const { tasks } = CustomStore.getCurrentState();
  switch (action.type) {
    case "ADD_TASK":
      CustomStore.updateState({ tasks: [...tasks, action.payload] });
      break;
    case "REMOVE_TASK":
      CustomStore.updateState({ tasks: tasks.filter((_, idx) => idx !== action.payload) });
      break;
    default:
      console.warn("Unknown action:", action);
  }
};

// --- Initialize the application ---
const appRoot = document.getElementById("appRoot");

// Subscribe to state changes and re-render the app
CustomStore.addSubscriber(() => {
  render(TaskManager(), appRoot);
});

// Initial render
render(TaskManager(), appRoot);