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


        })
};

getWeather();
document.querySelector('.city').onchange = getWeather;