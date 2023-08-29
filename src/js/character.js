const characterButtons = document.querySelector(".character-buttons");
const loginText = document.querySelector("#login-form h2");
const greetingText = document.querySelector("#greeting");

const CHARACTER_KEY = "character";

let choiceCharacter = "🐰";

/**@function paintText
 * 1. character와 userName을 전달 받아 화면에 표출
 */
const paintText = (character, userName) => {
  greetingText.innerText = `${character} ${userName}\`s To Do`;
  loginText.innerText = `${character} User Name`;
}

/**@function onCharacterChoice
 * 1. lacalStorage에 저장되어 있는 사용자 이름을 가져오고
 * 2. 사용자가 클릭한 character 버튼을 감지해서 변수에 해당 character를 대입해주고
 * 3. 변수에 대입한 character를 lacalStorage에 저장
 * 4. paintText 함수 실행(화면에 표출)
 */
const onCharacterChoice = (event) => {
  const userName = localStorage.getItem("username");
  choiceCharacter = event.target.innerText;
  
  localStorage.setItem(CHARACTER_KEY, choiceCharacter);

  paintText(choiceCharacter, userName);
}

/**@function onLoadCharacter
 * 1. lacalStorage에 저장되어 있는 character와 userName을 가져오고
 * 2. lacalStorage에서 가져온 character가 있는지 확인 후 해당 character를 변수에 대입
 * 3. paintText 함수 실행(화면에 표출)
 */
const onLoadCharacter = () => {
  const chosenCharacter = localStorage.getItem(CHARACTER_KEY);
  const userName = localStorage.getItem("username");

  if (chosenCharacter !== null) {
    choiceCharacter = chosenCharacter;
  }

  paintText(choiceCharacter, userName);
}

characterButtons.addEventListener("click", onCharacterChoice);
onLoadCharacter();