const IMAGES = {
  CORNILIO: {
    style: "cornilio",
    images: [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",
      "8.jpg",
      "9.jpg",
      "10.jpg",
      "11.jpg",
      "12.jpg",
      "13.jpg",
      "14.jpg",
      "15.jpg",
    ],
  },
  PUUUNG: {
    style: "puuung",
    images: [
      "1_.jpg",
      "2_.jpg",
      "3_.jpg",
      "4_.jpg",
      "5_.jpg",
      "6_.jpg",
      "7_.jpg",
      "8_.jpg",
      "9_.jpg",
    ],
  },
  GRADIENT: {
    style: "gradient",
    gradients: [
      ["#c6ffdd", "#fbd786", "#f7797d"],
      ["#12c2e9", "#c471ed", "#f7797d"],
      ["#2980b9", "#6dd5fa", "#f7797d"],
      ["#7f7fd5", "#86a8e7", "#91eae4"],
      ["#a770ef", "#cf8bf3", "#fdb99b"],
      ["#59c173", "#a17fe0", "#5d26c1"],
      ["#4e54c8", "#8f94fb", "#fffde4"],
      ["#fffbd5", "#fc5c7d", "#6a82fb"],
      ["#cac531", "#f3f9a7", "#fffde4"],
    ],
  },
};

const BACKGROUNDSTYLE_KEY = "backgroundstyle";
const DEFAULT_BACKGROUND = IMAGES.CORNILIO.style;

const changeButton = document.getElementById("change-button");

const settingFolderButton = document.getElementById("setting-folder-button");
const settingCloseButton = document.getElementById("setting-close-button");
const settingBox = document.getElementById("setting-box");

const cornilioButton = document.getElementById("cornilio-button");
const puuungButton = document.getElementById("puuung-button");
const gradientButton = document.getElementById("gradient-button");

/**@function onSetting
 * 1. setting 폴더 화면 숨김 풀기
 */
const onSetting = () => {
  settingBox.classList.remove("hidden");
}

/**@function closeSetting
 * 1. setting 폴더 화면 숨기기
 */
const closeSetting = () => {
  settingBox.classList.add("hidden");
}

/**@function setStyle
 * 1. localStorage에 style 저장하기
 * 2. paintBackground 함수 실행(해당 style로 background 변경)
 */
const setStyle = (style) => {
  localStorage.setItem(BACKGROUNDSTYLE_KEY, style);
  paintBackground(style);
}

/**@function onLoadPaint
 * 1. localStorage에 저장되어 있는 style 있으면 가져오고 없으면 default 값으로 세팅
 * 2. setStyle 함수 실행(localStorage에 style 저장하기)
 */
const onLoadPaint = () => {
  const chosenStyle = localStorage.getItem(BACKGROUNDSTYLE_KEY) || DEFAULT_BACKGROUND;
  setStyle(chosenStyle);
}

/**@function paintBackground
 * 1. 전달받은 style 값에 해당하는 스타일로 화면 표출하기(그리기)
 */
const paintBackground = (style) => {
  const { style: imgStyle, images, gradients } = IMAGES[style.toUpperCase()];

  const chosenImageOrGradient = imgStyle === "gradient"
    ? gradients[Math.floor(Math.random() * gradients.length)]
    : images[Math.floor(Math.random() * images.length)];

  const backgroundValue = imgStyle === "gradient"
    ? `linear-gradient(45deg, ${chosenImageOrGradient.join(", ")})`
    : `url(src/assets/images/${chosenImageOrGradient}) center/cover no-repeat`;

  document.body.style.background = backgroundValue;
}

/**@function onButtonClick
 * 1. setting 폴더 화면에서 버튼 클릭으로 스타일 선택 시, style 값을 버튼 id의 앞 글자로 추출
 * 2. setStyle 함수 실행(localStorage에 style 저장하기)
 */
const onButtonClick = (event) => {
  const style = (event.target.id).split("-")[0];
  setStyle(style);
}

changeButton.addEventListener("click", onLoadPaint);
settingFolderButton.addEventListener("click", onSetting);
settingCloseButton.addEventListener("click", closeSetting);

cornilioButton.addEventListener("click", onButtonClick);
puuungButton.addEventListener("click", onButtonClick);
gradientButton.addEventListener("click", onButtonClick);

onLoadPaint();