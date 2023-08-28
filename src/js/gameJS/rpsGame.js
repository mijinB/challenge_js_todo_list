const icons = ["❓", "✊", "✋️", "✌"];

const gameCards = document.getElementById("game-cards")
const resultButton = document.querySelector("#result button");
const resultText = document.querySelector("#result p");

resultButton.innerText = icons[0];

/**@function getRandomChoice
 * 1. icons 리스트 변수(가위, 바위, 보) 중 랜덤으로 선택
 */
const getRandomChoice = () => icons[Math.ceil(Math.random() * 3)];

/**@function determineResult
 * 1. 사용자가 선택한 icon과 랜덤으로 선택된 icon을 비교하여 가위 바위 보 game의 결과를 반환해줌
 */
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

/**@function onGameStart
 * 1. 사용자가 선택한 icon과 랜덤으로 선택된 icon을 각자 변수에 담고
 * 2. determineResult 함수를 실행시킨 후 결과도 변수에 담기
 * 3. 랜덤으로 선택된 icon과 가위 바위 보 game의 결과를 화면에 표출
 */
const onGameStart = (event) => {
  const userChoice = event.target.innerText;
  const machineChoice = getRandomChoice();
  const result = determineResult(userChoice, machineChoice);

  resultButton.innerText = machineChoice;
  resultText.innerText = result;
}

gameCards.addEventListener("click", onGameStart);