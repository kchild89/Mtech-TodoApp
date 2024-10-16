// Modal elements
const modal = document.getElementById("projectModal");
const taskModal = document.getElementById("taskModal");

// Buttons
const newButton = document.getElementById("newButton");
const newTaskButton = document.getElementById("newTaskButton");
const closeButton = document.getElementsByClassName("close")[0]; // For project modal
const closeTaskButton = document.getElementsByClassName("close")[1]; // For task modal
const addProjectButton = document.getElementById("addProject");
const addTaskButton = document.getElementById("addTask");

// Inputs
const projectNameInput = document.getElementById("projectName");
const taskNameInput = document.getElementById("taskName");

// Containers
const projectsList = document.querySelector(".projectsList");
const tasksList = document.getElementById("tasksList");
const taskHeader = document.getElementById("taskHeader");

let projects = [];
let selectedProject = null;

// Open project modal
newButton.addEventListener("click", function () {
  modal.style.display = "block";
});

// Close project modal
closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});

// Close task modal
closeTaskButton.addEventListener("click", function () {
  taskModal.style.display = "none";
});

// Add project to list
addProjectButton.addEventListener("click", function () {
  const projectName = projectNameInput.value;
  if (projectName) {
    const project = { name: projectName, tasks: [] };
    projects.push(project);

    // Create list item for the project
    const li = document.createElement("li");
    li.textContent = projectName;

    // Add click event to select the project
    li.addEventListener("click", function () {
      selectedProject = project;
      displayTasks(project);
      taskHeader.textContent = `${project.name} - Tasks`;
      newTaskButton.disabled = false;
    });

    // Create trash icon
    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fas", "fa-trash-alt", "deleteIcon");
    deleteButton.style.cursor = "pointer";
    deleteButton.addEventListener("click", function () {
      projects = projects.filter((p) => p !== project);
      li.remove();
      tasksList.innerHTML = "";
      selectedProject = null;
      newTaskButton.disabled = true;
    });

    // Append project and delete button
    li.appendChild(deleteButton);
    projectsList.appendChild(li);

    projectNameInput.value = "";
    modal.style.display = "none";
  } else {
    alert("Please enter a project name");
  }
});

// Open task modal
newTaskButton.addEventListener("click", function () {
  taskModal.style.display = "block";
});

// Add task to selected project
addTaskButton.addEventListener("click", function () {
  if (selectedProject) {
    const taskName = taskNameInput.value;
    if (taskName) {
      selectedProject.tasks.push({ name: taskName, completed: false });
      displayTasks(selectedProject);
      taskNameInput.value = "";
      taskModal.style.display = "none";
    } else {
      alert("Please enter a task name");
    }
  }
});

// Display tasks for the selected project
function displayTasks(project) {
  tasksList.innerHTML = "";

  project.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("tasksList");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = task.completed;

    // Mark task as completed
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      if (task.completed) {
        li.classList.add("task-completed");
      } else {
        li.classList.remove("task-completed");
      }
    });

    // Create task text
    const taskText = document.createElement("span");
    taskText.textContent = task.name;
    taskText.classList.add("task-text");

    // Create delete icon
    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fas", "fa-trash-alt", "deleteIcon");

    // Add event listener to the delete button
    deleteButton.addEventListener("click", function () {
      li.remove();
    });

    // Append checkbox, task text, and delete button to the list item
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    // Apply completed style if the task is already marked complete
    if (task.completed) {
      li.classList.add("task-completed");
    }

    tasksList.appendChild(li);
  });
}
