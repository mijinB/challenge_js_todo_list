const API_KEY = API_KEY_SECRET;

/**@function fetchWeatherInfo
 * 1. 현재 위치의 위도,경도 추출하여 날씨API url에 사용
 * 2. 날씨API를 사용해서 현재 위치와 온도, 날씨 data를 추출하고 화면에 표출
 */
const fetchWeatherInfo = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const weatherBox = document.querySelector(".weather");
      const city = document.querySelector("#weather-city");
      const temp = document.querySelector("#weather-temp");
      const state = document.querySelector("#weather-state");

      weatherBox.classList.remove("hidden");

      city.innerText = data.name;
      temp.innerHTML = `${data.main.temp} °`;

      const stateText = data.weather[0].main;
      const stateIcon = data.weather[0].icon;
      state.innerHTML = `<img src="https://openweathermap.org/img/wn/${stateIcon}.png" />${stateText}`;
    });
}

/**@function onGeoError
 * 1. 위치 정보를 가져오지 못한 경우 alert를 화면에 표출(사용자가 위치 권한을 허용하지 않았을 경우에 표출된다.)
 */
const onGeoError = () => {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(fetchWeatherInfo, onGeoError);