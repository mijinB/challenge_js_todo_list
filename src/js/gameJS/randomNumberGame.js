const endNumInput = document.querySelector("#end-div input");
const choiceNumInput = document.querySelector("#choice-div input");
const playButton = document.querySelector("#play-div button");
const hiddenDiv = document.querySelector("#hidden-div");
const hiddenResultInfo = hiddenDiv.firstElementChild;
const hiddenResult = hiddenDiv.lastElementChild;

let endNum;
let choiceNum;

/**@function changeEndNum
 * 1. 0 ~ 해당하는 범위 입력받아서 전역 변수에 할당하기
 * 2. 음수 입력 시, -(마이너스) 무시하고 int타입으로 할당한다.
 */
const changeEndNum = (event) => {
  endNumInput.value = event.target.value.replace("-", "");
  endNum = parseInt(endNumInput.value);
}

/**@function changeChoiceNum
 * 1. 사용자가 선택하는 숫자를 입력받아서 전역 변수에 할당하기
 * 2. 음수 입력 시, -(마이너스) 무시하고 int타입으로 할당한다.
 */
const changeChoiceNum = (event) => {
  choiceNumInput.value = event.target.value.replace("-", "");
  choiceNum = parseInt(choiceNumInput.value);
}

/**@function onGamePlay
 * 1. 범위 입력과 사용자 선택 숫자 입력을 했는지 확인 후
 * 2. 입력받은 범위 내에서 랜덤 숫자를 표출
 * 3. 숨겨둔 text 영역을 숨기기 해제(결과를 보여줄 text 영역)
 * 4. 사용자가 선택한 숫자와 일치하는지 확인 후 결과 표출
 */
const onGamePlay = () => {
  if(isNaN(endNum)) {
    alert("범위를 입력해주세요.");
    endNumInput.focus();
    return;
  }

  if(isNaN(choiceNum)) {
    alert("무슨 숫자가 나올 것 같나요?");
    choiceNumInput.focus();
    return;
  }

  const machineChoiceNum = Math.ceil(Math.random() * endNum);
  hiddenDiv.classList.remove("hidden");

  hiddenResultInfo.innerHTML = `당신의 선택: ${choiceNum} <span class="battle">VS</span> 컴퓨터의 선택: ${machineChoiceNum}`;
  hiddenResult.innerText = (choiceNum === machineChoiceNum) ? "✔승!😝" : "✔패😔";
}

/**@function focusNextInputOnEnter
 * 1. 0 ~ 해당하는 범위를 입력하는 입력란(input)에서 Enter키를 누르면 감지한 후
 * 2. 범위를 입력 했다면, 사용자가 선택하는 숫자 입력란(input)으로 focus 이동
 * 3. 범위를 입력하지 않았다면, 범위를 입력하라는 alert를 띄우고 focus 이동 안 함
 */
const focusNextInputOnEnter = (event) => {
  if(event.key === "Enter") {
    if(!isNaN(endNum)) {
      choiceNumInput.focus();
    } else {
      alert("범위를 입력해주세요.");
    }
  }
}

/**@function submitOnEnter
 * 1. 사용자가 선택하는 숫자 입력란(input)에서 Enter키를 누르면 감지한 후
 * 2. 숫자를 입력 했다면, onGamePlay 함수 실행(게임 start)
 * 3. 숫자를 입력하지 않았다면, 숫자를 입력하라는 alert를 띄우고 focus 이동 안 함
 */
const submitOnEnter = (event) => {
  if(event.key === "Enter") {
    if(!isNaN(choiceNum)) {
      onGamePlay();
    } else {
      alert("무슨 숫자가 나올 것 같나요?");
    }
  }
}

endNumInput.addEventListener("input", changeEndNum);
choiceNumInput.addEventListener("input", changeChoiceNum);
playButton.addEventListener("click", onGamePlay);
choiceNumInput.addEventListener("keydown", submitOnEnter);
endNumInput.addEventListener("keydown", focusNextInputOnEnter);