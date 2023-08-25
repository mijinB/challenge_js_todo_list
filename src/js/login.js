const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const todo = document.querySelector("#todo");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

let character = "🐰";

function paintGreetings(username) {
  greeting.innerText = `${character} ${username}\`s To Do`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  todo.classList.remove(HIDDEN_CLASSNAME);
}

function onLoginSubmit(event) {
  event.preventDefault();

  loginForm.classList.add(HIDDEN_CLASSNAME);
  
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);

  paintGreetings(username);
}

const onUserName = () => {
  const savedUserName = localStorage.getItem(USERNAME_KEY);
  if(savedUserName == null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
  } else {
    paintGreetings(savedUserName);
  }
}

const onCharacter = () => {
  const chosenCharacter = localStorage.getItem("character");
  if (chosenCharacter == null) {
    character = "🐰";
  } else {
    character = chosenCharacter;
  }
}

onUserName();
onCharacter();