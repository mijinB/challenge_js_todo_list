const icons = ["❓", "✊", "✋️", "✌"];

const gameCards = document.getElementById("game-cards")
const resultButton = document.querySelector("#result button");
const resultText = document.querySelector("#result p");

resultButton.innerText = icons[0];

const getRandomChoice = () => icons[Math.ceil(Math.random() * 3)];

const determineResult = (userChoice, machineChoice) => {
  if(userChoice === machineChoice) {
    return "✔무승부😉";
  } else if (
    (userChoice === "✊" && machineChoice === "✌") ||
    (userChoice === "✋️" && machineChoice === "✊") ||
    (userChoice === "✌" && machineChoice === "✋️")
  ) {
    return "✔승!😝";
  } else {
    return "✔패😔";
  }
}

const onGameStart = (event) => {
  const userChoice = event.target.innerText;
  const machineChoice = getRandomChoice();
  const result = determineResult(userChoice, machineChoice);

  resultButton.innerText = machineChoice;
  resultText.innerText = result;
}

gameCards.addEventListener("click", onGameStart);