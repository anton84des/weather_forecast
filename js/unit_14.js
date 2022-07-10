const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "be4008fcad2030ea1d20ab9bbd59a3d1"
};

function getWeather() {
    const cityId = document.querySelector('.city').value;

    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
};

function showWeather(data) {

    let lat = data.coord.lat;
    let lon = data.coord.lon;

    fetch(`${param.url}forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${param.appid}&units=metric`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            //main
            document.querySelector('.main-ico').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0]['icon']}@4x.png">`;
            document.querySelector('.city-name').innerText = data.city.name;
            document.querySelector('.current-degrees').innerHTML = Math.round(data.list[0].main.temp) + '&deg;';
            document.querySelector('.current-wind').innerHTML = `Wind ${data.list[0].wind['speed']} m/s`;

            let deg = data.list[0].wind['deg'];
            document.querySelector('.wind-arrow').style.transform = `rotate(${deg}deg)`;

            let description = document.querySelector('.description');
            let descriptionText = data.list[0].weather[0]['description'];
            description.innerHTML = descriptionText[0].toUpperCase() + descriptionText.slice(1);

            //minor-info
            let longTimeFirst = data.list[1]['dt_txt'].slice(10, 16);
            let longTimeSecond = data.list[2]['dt_txt'].slice(10, 16);
            let longTimeThird = data.list[3]['dt_txt'].slice(10, 16);
            let longTimeFourth = data.list[4]['dt_txt'].slice(10, 16);
            document.querySelector('.first-three-hours').innerHTML = longTimeFirst;
            document.querySelector('.second-three-hours').innerHTML = longTimeSecond;
            document.querySelector('.third-three-hours').innerHTML = longTimeThird;
            document.querySelector('.fourth-three-hours').innerHTML = longTimeFourth;

            document.querySelector('.first-three-hours-ico').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[1].weather[0]['icon']}@2x.png">`
            document.querySelector('.second-three-hours-ico').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[2].weather[0]['icon']}@2x.png">`
            document.querySelector('.third-three-hours-ico').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[3].weather[0]['icon']}@2x.png">`
            document.querySelector('.fourth-three-hours-ico').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[4].weather[0]['icon']}@2x.png">`

            document.querySelector('.first-three-hours-temp').innerHTML = Math.round(data.list[1].main.temp) + '&deg;';
            document.querySelector('.second-three-hours-temp').innerHTML = Math.round(data.list[2].main.temp) + '&deg;';
            document.querySelector('.third-three-hours-temp').innerHTML = Math.round(data.list[3].main.temp) + '&deg;';
            document.querySelector('.fourth-three-hours-temp').innerHTML = Math.round(data.list[4].main.temp) + '&deg;';

            let descriptionFirstText = data.list[1].weather[0]['description'];
            document.querySelector('.first-three-hours-description').innerHTML = descriptionFirstText;
            let descriptionSecondText = data.list[2].weather[0]['description'];
            document.querySelector('.second-three-hours-description').innerHTML = descriptionSecondText;
            let descriptionThirdText = data.list[3].weather[0]['description'];
            document.querySelector('.third-three-hours-description').innerHTML = descriptionThirdText;
            let descriptionFourthText = data.list[4].weather[0]['description'];
            document.querySelector('.fourth-three-hours-description').innerHTML = descriptionFourthText;
        });
};

function showDateAndTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();
    let day = now.getDay();

    let arrDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let dayText = arrDays[day];

    let arrMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let monthText = arrMonths[month];

    document.querySelector('.date').innerHTML = `${dayText} ${monthText} ${date}, ${year}`;

    //time
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes <= 9) {
        minutes = '0' + minutes;
    }
    document.querySelector('.time').innerHTML = `${hours}:${minutes}`;
}

getWeather();
showDateAndTime();
document.querySelector('.city').onchange = getWeather;