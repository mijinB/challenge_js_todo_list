const characterButtons = document.querySelector(".character-buttons");
const loginText = document.querySelector("#login-form h2");
const greetingText = document.querySelector("#greeting");

const CHARACTER_KEY = "character";

const userName = localStorage.getItem("username");
let choiceCharacter = "🐰";

const choiceButton = (event) => {
  choiceCharacter = event.target.innerText;
  
  localStorage.setItem(CHARACTER_KEY, choiceCharacter);

  greetingText.innerText = `${choiceCharacter} ${userName}\`s To Do`;
  loginText.innerText = `${choiceCharacter} User Name`;
}

const onLoadCharacter = () => {
  const chosenCharacter = localStorage.getItem(CHARACTER_KEY);
  if (chosenCharacter == null) {
    choiceCharacter = "🐰";
  } else {
    greetingText.innerText = `${chosenCharacter} ${userName}\`s To Do`;
    loginText.innerText = `${chosenCharacter} User Name`;
  }
}

characterButtons.addEventListener("click", choiceButton);
onLoadCharacter();