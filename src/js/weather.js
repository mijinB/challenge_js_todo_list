const API_KEY = API_KEY_SECRET;

function fetchWeatherInfo(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const city = document.querySelector("#weather h4");
      const weather = document.querySelector("#weather span:first-of-type");
      const temp = document.querySelector("#temp");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main}`;
      temp.innerHTML = `<img src="src/images/thermometer.png" style="width:20px;" />${data.main.temp}`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(fetchWeatherInfo, onGeoError);