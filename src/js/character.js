const characterButtons = document.querySelector(".character-buttons");

const choiceIcon = (event) => {
  console.log(event.target.innerText);
}

characterButtons.addEventListener("click", choiceIcon);