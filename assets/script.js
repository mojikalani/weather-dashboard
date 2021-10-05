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
     

      // ---- Weather for the main card ----
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
        


        // ---- Weather for 5 day forecast ----
        // Day 1
        var icon = data.daily[0].weather[0].icon;
        var URLicon = "http://openweathermap.org/img/w/" + icon + ".png"; 
        var temp1 = document.querySelector("#temp1");
        var humid1 = document.querySelector("#humid1");
        var windSpeed1 = document.querySelector("#wind-speed1")
        var weatherpic1 = document.querySelector("#weatherPic1")
        
        temp1.textContent = "Temperature: " + data.daily[0].temp.day;
        humid1.textContent = "Humidity: " + data.daily[0].humidity;
        windSpeed1.textContent = "Wind Speed: " + data.daily[0].wind_speed;
        weatherpic1.setAttribute('src', URLicon)

        // Day 2
        var icon = data.daily[1].weather[0].icon;
        var temp2 = document.querySelector("#temp2");
        var humid2 = document.querySelector("#humid2");
        var windSpeed2 = document.querySelector("#wind-speed2")
        var weatherpic2 = document.querySelector("#weatherPic2")

        temp2.textContent = "Temperature: " + data.daily[1].temp.day;
        humid2.textContent = "Humidity: " + data.daily[1].humidity;
        windSpeed2.textContent = "Wind Speed: " + data.daily[1].wind_speed;
        weatherpic2.setAttribute('src', URLicon)

        // Day 3
        var icon = data.daily[2].weather[0].icon;
        var temp3 = document.querySelector("#temp3");
        var humid3 = document.querySelector("#humid3");
        var windSpeed3 = document.querySelector("#wind-speed3")
        var weatherpic3 = document.querySelector("#weatherPic3")

        temp3.textContent = "Temperature: " + data.daily[2].temp.day;
        humid3.textContent = "Humidity: " + data.daily[2].humidity;
        windSpeed3.textContent = "Wind Speed: " + data.daily[2].wind_speed;
        weatherpic3.setAttribute('src', URLicon)

        // Day 4
        var icon = data.daily[3].weather[0].icon;
        var temp4 = document.querySelector("#temp4");
        var humid4 = document.querySelector("#humid4");
        var windSpeed4 = document.querySelector("#wind-speed4")
        var weatherpic4 = document.querySelector("#weatherPic4")

        temp4.textContent = "Temperature: " + data.daily[3].temp.day;
        humid4.textContent = "Humidity: " + data.daily[3].humidity;
        windSpeed4.textContent = "Wind Speed: " + data.daily[3].wind_speed;
        weatherpic4.setAttribute('src', URLicon)

        // Day 5
        var icon = data.daily[4].weather[0].icon;
        var temp5 = document.querySelector("#temp5");
        var humid5 = document.querySelector("#humid5");
        var windSpeed5 = document.querySelector("#wind-speed5")
        var weatherpic5 = document.querySelector("#weatherPic5")

        temp5.textContent = "Temperature: " + data.daily[4].temp.day;
        humid5.textContent = "Humidity: " + data.daily[4].humidity;
        windSpeed5.textContent = "Wind Speed: " + data.daily[4].wind_speed;
        weatherpic5.setAttribute('src', URLicon)
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
