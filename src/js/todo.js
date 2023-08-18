const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.parentElement;

  todos = todos.filter(todo => todo.id !== parseInt(li.id));
  saveTodos();

  li.remove();
}

function paintTodo(newTodoObj) {
  const li = document.createElement("li");

  todoList.appendChild(li);

  li.id = newTodoObj.id;
  li.innerHTML = `
    <input
      type="checkbox"
      id="id_${newTodoObj.id}"
      class="todo-checkbox"
    />
    <label for="id_${newTodoObj.id}">
      ${newTodoObj.text}
    </label>
    <button onClick="deleteTodo(this)">
      ✖
    </button>
  `;
}

function onTodoSubmit(event) {
  event.preventDefault();

  const newTodo = todoInput.value;
  todoInput.value = "";

  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
  };

  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

todoForm.addEventListener("submit", onTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (saveTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;

  parsedTodos.forEach(paintTodo);
}