const endNumInput = document.querySelector("#end-div input");
const choiceNumInput = document.querySelector("#choice-div input");
const playButton = document.querySelector("#play-div button");
const hiddenDiv = document.querySelector("#hidden-div");
const hiddenResultInfo = hiddenDiv.firstElementChild;
const hiddenResult = hiddenDiv.lastElementChild;

let endNum;
let choiceNum;


const changeEndNum = (event) => {
  endNumInput.value = event.target.value.replace("-", "");
  endNum = parseInt(endNumInput.value);
}

const changeChoiceNum = (event) => {
  choiceNumInput.value = event.target.value.replace("-", "");
  choiceNum = parseInt(choiceNumInput.value);
}

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

const focusNextInputOnEnter = (event) => {
  if(event.key === "Enter") {
    if(!isNaN(endNum)) {
      choiceNumInput.focus();
    } else {
      alert("범위를 입력해주세요.");
    }
  }
}

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