let apiKey = 'c40b28aa33c2bef2881ab9e4f13c3ef7'
let dateEl = document.querySelector('#date');
let hoursEl = document.querySelector('#hours');
let daysEl = document.querySelector('#days');
let todayBox = document.querySelector('#today-box');
let todayEl = document.querySelector('#today-box');
let fiveBox = document.querySelector('#five-box');
let inputEl = document.querySelector('#search-input');
let btnEl = document.querySelector('#search-btn');
let todayCity = document.querySelector('#city-name');
let todayIcon = document.querySelector('#icon');
let todayTemp = document.querySelector('#temp');
let todayHum = document.querySelector('#humidity');
let todayUVI = document.querySelector('#uvi');
let todayWind = document.querySelector('#wind');

// Grab city input and initialize api calls
function init() {
    dateEl.textContent = moment().format('LLLL');
    let city = inputEl.value.trim();
    getLatLon(city);
    todayBox.style.display = 'block';
    fiveBox.style.display = 'block';
    inputEl.value = "";
}

// Get Latitude and Longitude for One Call API
function getLatLon(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(apiUrl)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        getForecast(data.coord.lat, data.coord.lon, city);
    });
}

// Get Weather Forecast
function getForecast(lat, lon, city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

    fetch(apiUrl)
    .then((res) => {
        return res.json();
    })
    .then((data) => {

        // current weather
        todayCity.textContent = city;
        todayIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`);
        todayTemp.textContent = `${data.current.temp} F`;
        todayHum.textContent = `${data.current.humidity}%`;
        todayUVI.textContent = data.current.uvi;
        todayWind.textContent = `${data.current.wind_speed} mph`;

        // clear old 5 day cards
        daysEl.innerHTML = '';

        // build 5 day cards
        let daysData = data.daily;

        for (let i=0; i<5;i++) {

            let dayEl = document.createElement('div');
            dayEl.setAttribute('class', 'day');

            let dayH3 = document.createElement('h3');
            let dayImg = document.createElement('img');
            let dayP1 = document.createElement('p');
            let dayp2 = document.createElement('p');

            dayH3.setAttribute('class', 'day-time');
            dayImg.setAttribute('class', 'day-img');
            dayP1.setAttribute('class', 'day-extra');
            dayp2.setAttribute('class', 'day-extra');

            let hDay = new Date(daysData[i].dt * 1000).toLocaleString().split(',')[0];

            dayH3.textContent = hDay;
            dayImg.setAttribute('src', `http://openweathermap.org/img/wn/${daysData[i].weather[0].icon}.png`);
            dayP1.textContent = `Temp: ${daysData[i].temp.day} F`;
            dayp2.textContent = `Humidity: ${daysData[i].humidity}%`;

            dayEl.append(dayH3, dayImg, dayP1, dayp2);
            daysEl.append(dayEl);

        }

    })
}

btnEl.addEventListener('click', init);