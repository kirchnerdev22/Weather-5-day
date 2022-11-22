const APIkey = "186cf814cf3a56a1a1bb7dfcf0ad5272";
const day = dayjs().format("MM/DD/YYYY");
const citySearchHistory = JSON.parse(window.localStorage.getItem('citySearchHistory')) || [];
let weatherData;
let forecastData;

$("#searchButton").click(handleUserSearch);

let lastHistory = JSON.parse(localStorage.getItem("citySearchHistory"))

for (var i = 0; i < lastHistory.length; i++){
    $("#citySearches").append(lastHistory[i])
}

function handleUserSearch() {
    var cityInput = $('#citySearch').val();
    saveSearchToLocal(cityInput);
    fetchWeatherData(cityInput);

}

function saveSearchToLocal(cityName) {
    citySearchHistory.push(cityName)
    window.localStorage.setItem("citySearchHistory",JSON.stringify(citySearchHistory))
    $("#citySearches").append(cityName)
}

function fetchWeatherData(cityInput){
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIkey}&units=imperial`
    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Data is ready
        console.log({weatherData: data})
        weatherData = data.main;
        fetchForecastData(cityInput);
   
        displayWeather(weatherData)
        function displayWeather(weatherData) {
            console.log(weatherData);
            document.getElementById("cityName1").innerText = data.name;
        
            document.getElementById("temp1").innerText =
                weatherData.temp + "°F";
        
            document.getElementById("humidity1").innerText =
                weatherData.humidity + "% humidity";
        
            document.getElementById("windspeed1").innerText =
                data.wind.speed + " MPH";
        
        };  
    })
    
}



function fetchForecastData(cityInput) {

    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${APIkey}&units=imperial`
    fetch(forecastURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log({forecastData: data.list});
        forecastData = data.list;
        renderResultData();

        let dayCount = 1;
        
        $("#forecasts").empty();

        for (var i = 4; i < 37; i += 8){
            let forecastDay = dayjs().add(dayCount, "day").format("MM/DD/YYYY")

            if(data.list[i].weather[0].main == "Clear"){
                visibility = "../images/Sunny.jpeg"
        } else if (data.list[i].weather[0].main == "Clouds"){
            visibility = "../images/Cloudy.jpeg"
        } else if (data.list[i].weather[0].main == "Fog" || data.list[i].weather[0].main == "Mist") {
            visibility = "../images/Fog.jpeg"
        } else if (data.list[i].weather[0].main == "Rain" || data.list[i].weather[0].main == "Drizzle"){
            visibility = "../images/Rain.jpeg"
        } else if (data.list[i].weather[0].main == "Snow" || data.list[i].weather[0].main == "Sleet"){
            visibility = "../images/Snow.jpeg"
        }
         else {
            visibility = "../images/Thunderstorm.jpeg"
        }

            let newdiv =
            `
            <div class="5Day">
                <h3>${forecastDay}</h3>
                    <img src="${visibility}"/>
                    <p>Temp:${forecastData[i].main.temp} °F</p>
                    <p>Wind:${forecastData[i].wind.speed} MPH</p>
                    <p>${forecastData[i].main.humidity} % humidity</p>
            </div>
            `
            $("#forecasts").append(newdiv);
            dayCount +=1;
        }
    })
}

function renderResultData() {
}
