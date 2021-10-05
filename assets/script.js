var weatherApiKey = "1c72e10c1966cc56d5ada2f30bd1c3c6";
var searchHistory = [];
var form = $("#search-form");
var searchInput = $("#citySearch");
var resultsContainer = $("#results");
var searchHistoryContainer = $("#search-history");
var weatherPic = document.querySelector("#weatherPic");
var currentTempEl= document.querySelector("#temperature");
var currentHumidityEl = document.querySelector("#humidity");
var curentWindSpeedEl = document.querySelector("#wind-speed");
var currentUVEl = document.querySelector("#UV-index");
var currentCity = document.querySelector("#city-name");
// init search history
searchHistory = localStorage.getItem("search-history");
if (searchHistory) {
  searchHistory = JSON.parse(searchHistory);
} else {
  searchHistory = [];
}

function handleFormSubmit(event) {
  event.preventDefault();
  var query = searchInput.val().trim(); //citySearch
  if (query) {
    searchCity(query);
    searchInput.val("");
    addSearchToHistory(query);
  }
}

// Accepts a query and fetches data from the giphy api.
function searchCity(query) {
  var requestCoor = "https://api.openweathermap.org/geo/1.0/direct?q=" + query + "&limit-1&appid=" +  
    weatherApiKey;
    
 
  fetch(requestCoor)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     var lat = data[0].lat; 
     var long = data[0].lon;
     var requestWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + 
     "&lon=" + long + "&units=imperial&exclude=hourly&appid=" + weatherApiKey;
     

      // Weather for the main card
      fetch(requestWeather)
      .then(function (response){ 
        return response.json();
      })
      .then(function(data){ 
          console.log(data)

        var temp = data.current.temp;
        var humidity = data.current.humidity;  
        var uvi = data.current.uvi;
        var windSpeed = data.current.wind_speed;
        var currentIcon = data.current.weather[0].icon; 
        var iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png"; 
        
        weatherPic.setAttribute('src', iconURL);
        currentCity.textContent = query;
        currentTempEl.textContent = "Tempurature: " + temp + "F";
        currentHumidityEl.textContent = "Humidity: " + humidity + "%"; 
        curentWindSpeedEl.textContent = "Wind-Speed: "+ windSpeed + "MPH";
        currentUVEl.textContent = "UV-Index: " + uvi; 
        


        //Weather for 5 day forecast
        var dailyWeather = data.daily[0]; 
        var temp1 = document.querySelector("#temp1");
        var humid1 = document.querySelector("#humid1");
        var windSpeed1 = document.querySelector("#wind-speed1")
        temp1.textContent = "Temperature: " + data.daily[0].temp.day;
        humid1.textContent = "Humidity: " + data.daily[0].humidity;
        windSpeed1.textContent = "Wind Speed: " + data.daily[0].wind_speed;


        var dailyWeather2= data.daily[1];
        var temp1 = document.querySelector("#temp2");
        var humid1 = document.querySelector("#humid2");
        var windSpeed1 = document.querySelector("#wind-speed2")
        temp1.textContent = "Temperature: " + data.daily[1].temp.day;
        humid1.textContent = "Humidity: " + data.daily[1].humidity;
        windSpeed1.textContent = "Wind Speed: " + data.daily[1].wind_speed;

        var dailyWeather3= data.daily[2];
        var temp1 = document.querySelector("#temp3");
        var humid1 = document.querySelector("#humid3");
        var windSpeed1 = document.querySelector("#wind-speed3")
        temp1.textContent = "Temperature: " + data.daily[2].temp.day;
        humid1.textContent = "Humidity: " + data.daily[2].humidity;
        windSpeed1.textContent = "Wind Speed: " + data.daily[2].wind_speed;

        var dailyWeather4= data.daily[3]; 
        var temp1 = document.querySelector("#temp4");
        var humid1 = document.querySelector("#humid4");
        var windSpeed1 = document.querySelector("#wind-speed4")
        temp1.textContent = "Temperature: " + data.daily[3].temp.day;
        humid1.textContent = "Humidity: " + data.daily[3].humidity;
        windSpeed1.textContent = "Wind Speed: " + data.daily[3].wind_speed;

        var dailyWeather5= data.daily[4];
        var temp1 = document.querySelector("#temp5");
        var humid1 = document.querySelector("#humid5");
        var windSpeed1 = document.querySelector("#wind-speed5")
        temp1.textContent = "Temperature: " + data.daily[4].temp.day;
        humid1.textContent = "Humidity: " + data.daily[4].humidity;
        windSpeed1.textContent = "Wind Speed: " + data.daily[4].wind_speed;

        console.log(dailyWeather)
        console.log(dailyWeather2)
        console.log(dailyWeather3)
        console.log(dailyWeather4)
        console.log(dailyWeather5)
      })
    })
} 
 

// Storing city search results 
function displayButtons() {
  searchHistoryContainer.empty();
  // loop over searchHistory
  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var button = $("<button>")
      .attr({
        type: "button",
        class: "btn btn-outline-secondary btn-block btn-search",
      })
      .text(searchHistory[i]);
    searchHistoryContainer.append(button);
  }
}

function handleSearchClick() {
  searchCity(this.textContent);
}

function addSearchToHistory(query) {
  searchHistory.push(query);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  displayButtons();
}

form.on("submit", handleFormSubmit);
searchHistoryContainer.on("click", ".btn-search", handleSearchClick);

displayButtons();
