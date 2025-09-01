document.addEventListener("DOMContentLoaded", function () {
  const taskInputElement = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskButton");
  const searchInputElement = document.getElementById("searchInput");
  const taskListElement = document.getElementById("taskList");
  const taskCountElement = document.getElementById("taskCount");

  let todos = [];
  loadTodos();

  addTaskBtn.addEventListener("click", function () {
    addTask();
  });
  taskInputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
  taskListElement.addEventListener("click", function (event) {
    const taskId = event.target.dataset.id;
    if (event.target.classList.contains("deleteBtn")) {
      deleteTask(Number(taskId));
    } else if (event.target.type === "checkbox") {
      toggleComplete(Number(taskId));
    }
  });
  searchInputElement.addEventListener("input", function (event) {
    filterTasks(searchInputElement.value);
  });
  function addTask() {
    let newTask = taskInputElement.value;
    if (newTask) {
      let todo = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      todos.push(todo);
      saveTodos();
      taskInputElement.value = "";
      console.log(todos);
      renderTasks();
    }
  }

  function renderTasks(todosArray = todos) {
    taskListElement.innerHTML = "";
    for (let task of todosArray) {
      let newEl = `<li>
            <input type ='checkbox' data-id=${task.id} ${
        task.completed ? "checked" : ""
      }>
            <p ${
              task.completed ? "style='text-decoration:line-through'" : ""
            }>${task.text}</p>
            <button class='deleteBtn' data-id=${task.id}> x </button>
            </li>`;

      taskListElement.innerHTML += newEl;
    }

    taskCountElement.textContent = todosArray.length;
  }

  function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
      todos = todos.filter((obj) => {
        return obj.id != id;
      });
      saveTodos();
      renderTasks();
    }
  }

  function toggleComplete(id) {
    let todo = todos.filter((todo) => {
      return todo.id === id;
    })[0];
    todo.completed = !todo.completed;
    saveTodos();
    renderTasks();
  }

  function filterTasks(search) {
    let filtered = todos.filter((todo) => {
      return todo.text.toLowerCase().includes(search.toLowerCase());
    });
    renderTasks(filtered);
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function loadTodos() {
    const saved = localStorage.getItem("todos");
    if (saved) {
      todos = JSON.parse(saved);
      renderTasks();
    }
  }
});
