const clock = document.querySelector("span#clock");

/**@function getClock
 * 1. 현재 시, 분, 초 추출하여 한 글자면 앞에 "0"을 붙여 두 글자로 만들어서 변수에 대입
 * 2. 시:분:초 형식으로 화면에 표출
 */
const getClock = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();

//1초마다 반복적으로 함수 실행
setInterval(getClock, 1000);