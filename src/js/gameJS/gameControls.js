const gameFolderButton = document.getElementById("game-folder-button");
const gameCloseButton = document.getElementById("game-close-button");
const miniGames = document.getElementById("mini-games");

const gamesButton = document.getElementById("games-button");
const rpsGameButton = document.getElementById("rps-game-button");
const randomGameButton = document.getElementById("random-game-button");
const rockPaperScissorsDiv = document.getElementById("rock-paper-scissors");
const randomNumberGameDiv = document.getElementById("random-number-game");

/**@function onMiniGames
 * 1. games 폴더 화면 숨김 풀기
 */
const onMiniGames = () => {
  miniGames.classList.remove("hidden");
}

/**@function closeMiniGames
 * 1. games 폴더 화면 숨기기
 */
const closeMiniGames = () => {
  miniGames.classList.add("hidden");
}

/**@function onGameChoice
 * 1. game 선택 시, 해당 game을 화면에 표출하도록 숨기기 & 풀기
 */
const onGameChoice = (event) => {
  const selectGame = event.target.innerText;
  const isRandomGame = (selectGame === "🎲");

  rpsGameButton.classList.toggle("selected-button", !isRandomGame);
  rockPaperScissorsDiv.classList.toggle("hidden", isRandomGame);
  
  randomGameButton.classList.toggle("selected-button", isRandomGame);
  randomNumberGameDiv.classList.toggle("hidden", !isRandomGame);
}

gameFolderButton.addEventListener("click", onMiniGames);
gameCloseButton.addEventListener("click", closeMiniGames);
gamesButton.addEventListener("click", onGameChoice);