const API_KEY = API_KEY_SECRET;

function fetchWeatherInfo(position) {
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

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(fetchWeatherInfo, onGeoError);