window.addEventListener('load', () => {

  let lon;
  let lat;
  //is geoloc API supported
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positon => {
      lon = positon.coords.longitude;
      lat = positon.coords.latitude;
      getWeatherInfo(lat, lon);
    }, (error => {
        console.error(error.message);
        tryDetermLocation();
    }));
  }
  else {
    tryDetermLocation();
  }
})

function getWeatherInfo(lat, lon, city, zip) {

  const weatherApiKey = '380df902b60bf5f0e2efb56a968afeb0';

  //https://openweathermap.org/current#data
  const apiRequestCoords = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric&lang=en`;

  apiRequestCity = `http://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${weatherApiKey}&units=metric&lang=en`;
  //Barrow

  apiRequestZip = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},BY&appid=${weatherApiKey}&units=metric&lang=en`;

  //choosing one of the ways of the request
  city
    ? fetch(apiRequestCity)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          fillPage(data);
        })
    : fetch(apiRequestCoords)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          fillPage(data);
        });
}

//if geoloc API isn't supported
function tryDetermLocation() {

  //https://ipstack.com/quickstart
  const apiIpstackKey = '938a30f211aaaa7f7f13677d50a26ba7';
  const ipstackRequest = `http://api.ipstack.com/check?access_key=${apiIpstackKey}`;
  
  fetch(ipstackRequest)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
     getWeatherInfo(0, 0, data.city, data.zip);
    });
}

function fillPage(data) {

  let region = document.querySelector(".region h1");
  let regionTime = document.createElement("span");
  let today = document.querySelector(".day-time");
  let dateLabl = document.querySelector(".date");
  let tempDescription = document.querySelector(".temperature-description");
  let temperature = document.querySelector(".temperature");
  let icon = document.querySelector(".icon img");
  let windSpeed = document.querySelector(".wind-speed");
  let feeling = document.querySelector(".feeling");
  let humidity = document.querySelector(".humidity");

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
  );
  const temp = data.main.temp;
  const description = data.weather[0].description;

  region.textContent = data.name + ", " + data.sys.country;

  //set Date based on user device date and time
  let date = new Date();
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //appendZero func appends zero symbol if necessary
  dateLabl.textContent = `${months[date.getMonth()]}, ${date.getDate()}`;

  today.textContent = `${weekday[date.getDay()]}, ${appendZero(
    date.getHours()
  )}:${appendZero(date.getMinutes())}`;

  function appendZero(number) {
    return number < 10 ? "0" + number : number;
  }

  let timezone = data.timezone / 3600;
  timezone > 0
    ? (regionTime.textContent = " UTC+" + timezone)
    : (regionTime.textContent = " UTC" + timezone);

  region.after(regionTime);  

  temperature.textContent = `${
    Math.round(temp * 10) / 10
  } ${String.fromCharCode(176)}C`;
  tempDescription.textContent = description;

  windSpeed.textContent = Math.round(data.wind.speed * 10) / 10 + " m/s";
  feeling.textContent = `${
    Math.round(data.main.feels_like * 10) / 10
  } ${String.fromCharCode(176)}C`;
  humidity.textContent = data.main.humidity + " %";

  init();
  
}

function init() {
  
  let wetherBlock = document.querySelector(".weather-block");
  let loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.style.display = "none";
    
    wetherBlock.style.display = "grid";
    setTimeout(() => {
      wetherBlock.style.opacity = 1;
    }, 50);
  }, 800);
}