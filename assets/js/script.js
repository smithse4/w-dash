let apiKey = 'c40b28aa33c2bef2881ab9e4f13c3ef7'
let dateEl = document.querySelector('#date');
let daysEl = document.querySelector('#days');
let fiveBox = document.querySelector('#five-box');
let searchCont = document.querySelector('.search-container');
let inputEl = document.querySelector('#search-input');
let btnEl = document.querySelector('#search-btn');
let btn5 = document.querySelector('#btn-5');
let btnHr = document.querySelector('#btn-hr');
let hours = document.querySelector('#hours');

// Grab city input and initialize api calls
function init() {
    dateEl.textContent = moment().format('LLLL');
    let city = inputEl.value.trim();
    getLatLon(city);
    searchCont.style.display = 'none';
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

        console.log(data)

        // clear old 5 day cards
        daysEl.innerHTML = '';

        // build 5 day cards
        let daysData = data.daily;

        let HTML = [];

        for (let i=0; i<5;i++) {

            let hDay = new Date(daysData[i].dt * 1000).toLocaleString().split(',')[0];
            let imgSrc = `http://openweathermap.org/img/wn/${daysData[i].weather[0].icon}.png`

            let newHTML = `
            <div class="day">
                <h3 class="day-time">${hDay}</h3>
                <img class="day-img" src="${imgSrc}">
                <p class="day-extra">High: <span>${Math.round(daysData[i].temp.max)}</span> F</p>
                <p class="day-extra">Low: <span>${Math.round(daysData[i].temp.min)}</span> F</p>
                <p class="day-extra">Humidity: <span>${daysData[i].humidity}</span>%</p>
            </div>
            `
            HTML.push(newHTML);

            // let dayEl = document.createElement('div');
            // dayEl.setAttribute('class', 'day');

            // let dayH3 = document.createElement('h3');
            // let dayImg = document.createElement('img');
            // let dayP1 = document.createElement('p');
            // let dayp2 = document.createElement('p');

            // dayH3.setAttribute('class', 'day-time');
            // dayImg.setAttribute('class', 'day-img');
            // dayP1.setAttribute('class', 'day-extra');
            // dayp2.setAttribute('class', 'day-extra');



            // dayH3.textContent = hDay;
            // dayImg.setAttribute('src', `http://openweathermap.org/img/wn/${daysData[i].weather[0].icon}.png`);
            // dayP1.textContent = `Temp: ${Math.round(daysData[i].temp.day)} F`;
            // dayp2.textContent = `Humidity: ${daysData[i].humidity}%`;

            // dayEl.append(dayH3, dayImg, dayP1, dayp2);
            // daysEl.append(dayEl);

        }

        HTML = HTML.join('');

        daysEl.innerHTML = HTML;



    })
}

btnEl.addEventListener('click', init);