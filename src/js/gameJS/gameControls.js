const gamesButton = document.getElementById("games-button");
const rpsGameButton = document.getElementById("rps-game-button");
const randomGameButton = document.getElementById("random-game-button");
const rockPaperScissorsDiv = document.getElementById("rock-paper-scissors");
const randomNumberGameDiv = document.getElementById("random-number-game");

const onGameChoice = (event) => {
  const selectGame = event.target.innerText;
  const isRandomGame = (selectGame === "🎲");

  rpsGameButton.classList.toggle("selected-button", !isRandomGame);
  rockPaperScissorsDiv.classList.toggle("hidden", isRandomGame);
  
  randomGameButton.classList.toggle("selected-button", isRandomGame);
  randomNumberGameDiv.classList.toggle("hidden", !isRandomGame);
}

gamesButton.addEventListener("click", onGameChoice);