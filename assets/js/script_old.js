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
let arrows = document.querySelector('#arrows');
let left = document.querySelector('.left');
let right = document.querySelector('.right');

// Grab city input and initialize api calls
function init() {
    dateEl.textContent = moment().format('LLLL');
    let city = inputEl.value.trim();
    getLatLon(city);
    searchCont.style.display = 'none';
    fiveBox.style.display = 'block';
    inputEl.value = "";
    document.querySelector('header h1').textContent = city;
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

        // DISPLAY 5 DAY WEATHER

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
                <p class="day-extra">High: <span>${Math.round(daysData[i].temp.max)} F</span></p>
                <p class="day-extra">Low: <span>${Math.round(daysData[i].temp.min)} F</span></p>
                <p class="day-extra">Humidity: <span>${daysData[i].humidity}%</span></p>
            </div>
            `
            HTML.push(newHTML);

        }
        HTML = HTML.join('');

        daysEl.innerHTML = HTML;

        // DISPLAY HOURLY WEATHER

        // clear old 5 day cards
        hours.innerHTML = '';

        // build 5 day cards
        let hoursData = data.hourly;

        let hourHTML = [];

        for (let i=0; i<45;i++) {

            let hDay = new Date(hoursData[i].dt * 1000).toLocaleString().split(', ')[1];
            let imgSrc = `http://openweathermap.org/img/wn/${hoursData[i].weather[0].icon}.png`

            let newHTML = `
            <div class="day" data-index="${i}">
                <h3 class="day-time">${hDay}</h3>
                <img class="day-img" src="${imgSrc}">
                <p class="day-extra">Temp: <span>${Math.round(hoursData[i].temp)} F</span></p>
                <p class="day-extra">Feels Like: <span>${Math.round(hoursData[i].feels_like)} F</span></p>
                <p class="day-extra">Humidity: <span>${hoursData[i].humidity}%</span></p>
            </div>
            `
            hourHTML.push(newHTML);

        }

        hourHTML = hourHTML.join('');
        
        hours.innerHTML = hourHTML;

        checkDataIndex();

    })
}

function show5Day () {
    daysEl.style.display = 'flex';
    hours.style.display = 'none';
    arrows.style.display = 'none';
    btn5.setAttribute('data-active', '');
    btnHr.removeAttribute('data-active');
}

function showHourly() {
    daysEl.style.display = 'none';
    hours.style.display = 'flex';
    arrows.style.display = 'flex';
    btnHr.setAttribute('data-active', '');
    btn5.removeAttribute('data-active');
}

function checkDataIndex() {
    let allDays = document.querySelectorAll(".day[data-index]");
    for(let i = 0; i < allDays.length; i++) {
        if (allDays[i].dataset.index > 4) {
            allDays[i].style.display = "none";
        }
    }
}

let pgNum = 1;
let prevPg;
let nextPg;
pages();

let pgI = [
    {
        page: 1,
        iarray: [0, 1, 2, 3, 4]
    },
    {
        page: 2,
        iarray: [5, 6, 7, 8, 9]
    },
    {
        page: 3,
        iarray: [10, 11, 12, 13, 14]
    },
    {
        page: 4,
        iarray: [15, 16, 17, 18, 19]
    },
    {
        page: 5,
        iarray: [20, 21, 22, 23, 24]
    },
    {
        page: 6,
        iarray: [25, 26, 27, 28, 29]
    },
    {
        page: 7,
        iarray: [30, 31, 32, 33, 34]
    },
    {
        page: 8,
        iarray: [35, 36, 37, 38, 39]
    },
    {
        page: 9,
        iarray: [40, 41, 42, 43, 44]
    }
]

function pages() {
    prevPg = pgNum-1;
    nextPg = pgNum+1;
}

function pageRight() {
    pgNum++
    pages();
    if (pgNum > 9) {
        pgNum = 9
        pages();
    }

    scrollHours();
    pageBlocks();

    console.log('Page number: ', pgNum);
}

function pageLeft() {
    pgNum--;
    pages();
    if(pgNum < 1) {
        pgNum = 1;
        pages();
    }

    scrollHours();
    pageBlocks();

    console.log('Page number: ', pgNum);
}

function pageBlocks() {
    if (prevPg < 1) {
        left.setAttribute('data-disabled', '');
        left.removeAttribute('data-active');
        console.log('left less 1', left)
    } else {
        left.removeAttribute('data-disabled');
        left.setAttribute('data-active', '');
        console.log('left else', left)
    };

    if (nextPg > 9) {
        right.setAttribute('data-disabled', '');
        right.removeAttribute('data-active');
        console.log('right > 9', right)
    } else {
        right.removeAttribute('data-disabled');
        right.setAttribute('data-active', '');
        console.log('right else', right)
    }
}

function scrollHours() {
    let allDays = document.querySelectorAll(".day[data-index]");
    if (pgNum === pgI.page) {
        let iss = pgI.iarray;
        console.log('iss', iss)
    }
    for(let i = 0; i < allDays.length; i++) {
        allDays[i].style.display = "none";

    }
}

pageBlocks();

btnEl.addEventListener('click', init);
btn5.addEventListener('click', show5Day);
btnHr.addEventListener('click', showHourly);
right.addEventListener('click', pageRight);
left.addEventListener('click', pageLeft);
