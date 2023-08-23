const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let todos = [];
let isEditing = false;
let editingTodoID = "";

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== parseInt(id));
  saveTodos();

  document.getElementById(id).remove();
}

function onEditTodo(id) {
  isEditing = true;
  editingTodoID = id;

  onTodoLoad();

  const inputElement = document.querySelector("input[id^=id][type=text]");
  const valueLength = inputElement.value.length;

  inputElement.setSelectionRange(valueLength, valueLength);
  inputElement.focus();
}

function updateTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === parseInt(id)) {
      return {
        ...todo,
        text: document.getElementById(`id_${id}`)?.value
      }
    } else {
      return todo;
    }
  })
  isEditing = false;
  editingTodoID = null;
  saveTodos();
  onTodoLoad();
}

function onEnterKeySubmit(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    updateTodo((event.target.id).replace("id_", ""));
  }
}

function cancelEdit() {
  isEditing = false;
  editingTodoID = null;
  onTodoLoad();
}

function setComplete(id) {
  todos = todos.map(todo => {
    if (todo.id === parseInt(id)) {
      return {
        ...todo,
        isComplete: !todo.isComplete
      };
    } else {
      return todo;
    }
  })

  saveTodos();
  onTodoLoad();
}

function paintTodo(newTodoObj) {
  const li = document.createElement("li");

  todoList.appendChild(li);

  li.id = newTodoObj.id;
  
  if (newTodoObj.id !== editingTodoID) {
    li.innerHTML = `
      <input
        type="checkbox"
        id="id_${newTodoObj.id}"
        class="todo-checkbox"
        onClick="setComplete(${newTodoObj.id})"
        ${newTodoObj.isComplete && "checked"}
      />
      <label
        for="id_${newTodoObj.id}"
        class="todo-text"
        ${newTodoObj.isComplete ? "style=text-decoration:line-through" : null}
      >
        ${newTodoObj.text}
      </label>
      <div>
        <button onClick="onEditTodo(${newTodoObj.id})">
          edit
        </button>
        <button onClick="deleteTodo(${newTodoObj.id})">
          ✖
        </button>
      </div>
    `;
  } else {
    li.innerHTML = `
      <input
        required
        type="text"
        id="id_${newTodoObj.id}"
        value="${newTodoObj.text}"
        class="edit-input"
      />
      <div>
        <button onClick="updateTodo(${newTodoObj.id})">
          ✔
        </button>
        <button onClick="cancelEdit()">
          ✖
        </button>
      </div>
    `;
  }
}

function onTodoSubmit(event) {
  event.preventDefault();

  const newTodo = todoInput.value;
  todoInput.value = "";

  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
    isComplete: false,
  };

  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

function onTodoLoad() {
  const savedTodos = localStorage.getItem(TODOS_KEY);
  todoList.innerHTML = '';
  
  if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    
    parsedTodos.forEach(paintTodo);
  }
  
  const editInput = document.querySelector("input[id^=id][type=text]");
  editInput?.addEventListener("keypress", onEnterKeySubmit);
}

todoForm.addEventListener("submit", onTodoSubmit);
window.onload = () => onTodoLoad();
