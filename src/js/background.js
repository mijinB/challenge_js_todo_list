const images = [
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
];
const gradient = [
  ["#c6ffdd", "#fbd786", "#f7797d"],
  ["#12c2e9", "#c471ed", "#f7797d"],
  ["#2980b9", "#6dd5fa", "#f7797d"],
  ["#7f7fd5", "#86a8e7", "#91eae4"],
  ["#a770ef", "#cf8bf3", "#fdb99b"],
  ["#59c173", "#a17fe0", "#5d26c1"],
  ["#4e54c8", "#8f94fb", "#fffde4"],
  ["#fffbd5", "#fc5c7d", "#6a82fb"],
  ["#cac531", "#f3f9a7", "#fffde4"],
]

const settingFolderButton = document.getElementById("setting-folder-button");
const settingCloseButton = document.getElementById("setting-close-button");
const settingBox = document.getElementById("setting-box");

const illustratorButton = document.getElementById("illustrator-button");
const gradientButton = document.getElementById("gradient-button");

const ILLUSTRATOR_STYLE = "illustrator";
const GRADIENT_STYLE = "gradient";
const BACKGROUNDSTYLE_KEY = "backgroundstyle";

let choicedBackground = ILLUSTRATOR_STYLE;

const onSetting = () => {
  settingBox.classList.remove("hidden");
}

const closeSetting = () => {
  settingBox.classList.add("hidden");
}

const paintBackground = (style) => {
  if(style === ILLUSTRATOR_STYLE) {
    const chosenImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.background = `url(src/assets/images/${chosenImage}) center/cover no-repeat`;
  } else if(style === GRADIENT_STYLE) {
    const chosenGradient = gradient[Math.floor(Math.random() * images.length)];
    
    if(chosenGradient !== undefined) {
      document.body.style.background = `linear-gradient(45deg, ${chosenGradient[0]}, ${chosenGradient[1]}, ${chosenGradient[2]})`;
    } else {
      document.body.style.background = `linear-gradient(45deg, ${gradient[0][0]}, ${gradient[0][1]}, ${gradient[0][2]})`;
    }
  }
}

const choiceIllustrator = () => {
  choicedBackground = ILLUSTRATOR_STYLE;
  localStorage.setItem(BACKGROUNDSTYLE_KEY, choicedBackground);

  paintBackground(choicedBackground);
}

const choiceGradient = () => {
  choicedBackground = GRADIENT_STYLE;
  localStorage.setItem(BACKGROUNDSTYLE_KEY, choicedBackground);

  paintBackground(choicedBackground);
}

const chosenBackground = localStorage.getItem(BACKGROUNDSTYLE_KEY);
if(chosenBackground == null) {
  choicedBackground = ILLUSTRATOR_STYLE;
  paintBackground(choicedBackground);
} else {
  paintBackground(chosenBackground);
}

settingFolderButton.addEventListener("click", onSetting);
settingCloseButton.addEventListener("click", closeSetting);
illustratorButton.addEventListener("click", choiceIllustrator);
gradientButton.addEventListener("click", choiceGradient);