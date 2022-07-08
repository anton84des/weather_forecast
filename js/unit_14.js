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

    fetch(`${param.url}forecast?lat=${lat}&lon=${lon}&appid=${param.appid}&units=metric`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            document.querySelector('.main-ico').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0]['icon']}@4x.png">`;
            document.querySelector('.city-name').innerText = data.city.name;


        })
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
    document.querySelector('.time').innerHTML = `${hours}:${minutes}`;

}

getWeather();
showDateAndTime();
document.querySelector('.city').onchange = getWeather;