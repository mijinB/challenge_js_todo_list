const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

let todos = [];

function paintTodo(newTodoObj) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  li.id = newTodoObj.id;

  todoList.appendChild(li);
  li.appendChild(span);
  li.appendChild(button);

  span.innerText = newTodoObj.text;
  button.innerText = "✖";
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
}

todoForm.addEventListener("submit", onTodoSubmit);