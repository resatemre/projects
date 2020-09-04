const todoForm = document.getElementById("todoForm");
const todos1 = document.getElementById("todos");
const todos2 = document.getElementById("todoList");
const todoList = document.getElementsByClassName("todo-list")[0];

const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const todoSearch = document.getElementById("todoSearch");
const deleteAll = document.getElementById("deleteAll");

eventListeners();
function eventListeners() {
  todoForm.addEventListener("submit", add);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUl);
  todos2.addEventListener("click", deleteTodo);
  todoSearch.addEventListener("keyup", filterTodos);
  deleteAll.addEventListener("click", deleteAllTodos);
}

function deleteAllTodos(e) {
  if (confirm("are you sure to delete all?")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.getElementsByClassName("list-items");

  Array.prototype.forEach.call(listItems, function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display : none");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}

function deleteTodo(e) {
  if (e.target.className === "todo-list todo-list-a") {
    e.target.parentElement.remove();

    let TodoTextContent = e.target.parentElement.textContent;
    deleteTodoFromStorage(TodoTextContent);

    showAlert("success", "successfuly deleted");
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo.substr(0, deletetodo.length - 6)) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUl() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUl(todo);
  });
}

function add(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Please add a todo");
  } else {
    addTodoToUl(newTodo);
    addTodoToStorage(newTodo);
    showAlert("Success", "adding Todo is success");
  }

  e.preventDefault();
}

function getTodosFromStorage() {
  // from storage all todos will be taken
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  todoForm.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1500);
}

function addTodoToUl(newTodo) {
  const createLi = document.createElement("li");
  const createLink = document.createElement("a");
  createLink.href = "#";
  createLink.className = "todo-list todo-list-a";
  createLink.innerHTML = "delete";
  createLi.className = "list-items";
  createLi.appendChild(document.createTextNode(newTodo));
  createLi.appendChild(createLink);
  todoList.appendChild(createLi);

  todoInput.value = "";
}
