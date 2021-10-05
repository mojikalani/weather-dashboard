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
     "&lon=" + long + "&units=imperial&exclude=hourly,daily&appid=" + weatherApiKey;
      //resultsContainer.empty();
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
        
      })
    })
} 
 
    

    


function weekForecast(query) {
    var requestUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&appid=" + 
      weatherApiKey;
      
      
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        console.log(data)
        var lat= data.coord.lat; 
        var long= data.coord.lon;
        var cityName = data.name;
        var weatherIcon = data.weather[0].icon;
        var temp = data.main.temp;
        var humidity = data.main.humidity; 
        var windSpeed = data.wind.speed;
     
        console.log(currentWeather)
          //displayWeather(data, cityName);
        displayWeather(data);
        
      })
  }
// Display current city weather
// function displayWeather(result, city) { 
//  currentTempEl.textContent = "Tempurature: " + data.weather.main.temp;

// }


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
