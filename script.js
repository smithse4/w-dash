let apiKey = 'c40b28aa33c2bef2881ab9e4f13c3ef7';
let dateEl = document.querySelector('#date');
let brookwoodLat = '33.802790';
let brookwoodLon = '-84.398100';
let hoursEl = document.querySelector('#hours');
let daysEl = document.querySelector('#days');
let refreshInterval;

function init() {
    dateEl.textContent = moment().format('LLLL');
    getForecast();
}

function getForecast() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${brookwoodLat}&lon=${brookwoodLon}&units=imperial&appid=${apiKey}`

    fetch(apiUrl)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log('Forecast: ', data);

        let hoursData = data.hourly;

        for (let i=0; i<10;i++) {

            let hourEl = document.createElement('div');
            hourEl.setAttribute('class', 'hour');

            let hourH3 = document.createElement('h3');
            let hourImg = document.createElement('img');
            let hourP1 = document.createElement('p');
            let hourP2 = document.createElement('p');

            hourH3.setAttribute('class', 'hour-time');
            hourImg.setAttribute('class', 'hour-img');
            hourP1.setAttribute('class', 'hour-extra');
            hourP2.setAttribute('class', 'hour-extra');

            let hTime = new Date(hoursData[i].dt * 1000).toLocaleString().split(', ')[1].split(':00:00').join('');

            hourH3.textContent = hTime;
            hourImg.setAttribute('src', `http://openweathermap.org/img/wn/${hoursData[i].weather[0].icon}.png`);
            hourP1.textContent = `Temp: ${hoursData[i].temp} F`;
            hourP2.textContent = `Humidity: ${hoursData[i].humidity}%`;

            hourEl.append(hourH3, hourImg, hourP1, hourP2);
            hoursEl.append(hourEl);

        }

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
            console.log('hDay: ', hDay)

            dayH3.textContent = hDay;
            dayImg.setAttribute('src', `http://openweathermap.org/img/wn/${daysData[i].weather[0].icon}.png`);
            dayP1.textContent = `Temp: ${daysData[i].temp.day} F`;
            dayp2.textContent = `Humidity: ${daysData[i].humidity}%`;

            dayEl.append(dayH3, dayImg, dayP1, dayp2);
            daysEl.append(dayEl);

        }

    })
}

init();

refreshInterval = setInterval(function(){
    hoursEl.innerHTML = '';
    daysEl.innerHTML = '';
    init();
}, 300000);

