const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const todo = document.querySelector("#todo");

const gameButton = document.querySelector("#game-folder-button");
const settingButton = document.querySelector("#setting-folder-button");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

let character = "🐰";

/**@function paintGreetings
 * 1. greeting Text와 todo List를 숨기기 해제하고 화면에 표출
 * 2. games와 setting 폴더 disabled 해둔 거 해제하고 활성화
 */
const paintGreetings = (username) => {
  greeting.innerText = `${character} ${username}\`s To Do`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  todo.classList.remove(HIDDEN_CLASSNAME);

  gameButton.disabled = false;
  settingButton.disabled = false;
}

/**@function onLoginSubmit
 * 1. form submit감지 시 실행되는 기본 동작(페이지 새로고침) 막기
 * 2. 사용자가 input에 입력한 username을 변수에 대입하고 localStorage에 저장
 * 3. 로그인form 숨기기
 * 4. paintGreetings 함수 실행(todo List 화면 표출)
 */
const onLoginSubmit = (event) => {
  event.preventDefault();
  
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);

  loginForm.classList.add(HIDDEN_CLASSNAME);

  paintGreetings(username);
}

/**@function initializeUserName
 * 1. localStorage에 저장되어 있는 username을 가져와서 변수에 대입
 * 2. localStorage에 저장되어 있지 않으면 로그인form 숨기기 해제하고 화면 표출, "submit"이벤트리스너 추가
 * 3. 저장되어 있으면 paintGreetings 함수 실행(todo List 화면 표출)
 */
const initializeUserName = () => {
  const savedUserName = localStorage.getItem(USERNAME_KEY);

  if(!savedUserName) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
  } else {
    paintGreetings(savedUserName);
  }
}

/**@function initializeCharacter
 * 1. localStorage에 저장되어 있는 character를 가져오고
 * 2. lacalStorage에서 가져온 character가 있는지 확인 후 해당 character를 전역 변수에 대입
 */
const initializeCharacter = () => {
  const chosenCharacter = localStorage.getItem("character");
  
  if (chosenCharacter !== null) {
    character = chosenCharacter;
  }
}

initializeUserName();
initializeCharacter();