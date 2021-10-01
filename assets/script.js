// For searching city 
var searchFormEl = document.querySelector("#search-form");
// For displaying city and result
var cityEl = document.querySelector("#city");
var resultContentEl = document.querySelector("#result-content"); 
var tempEl = document.querySelector("#temp"); 
var humidityEl = document.querySelector("#wind-speed"); 
var uvEl = document.querySelector("#uv-index");

// the user inputs a city and clicks on the search button 
function handleSearchFormSubmit(event) { 
    event.preventDefault(); 
    
    var searchInputVal = document.querySelector("#search-input").value;
    if (!searchInputVal) { 
        console.error("You need to put a city"); 
        return
    }
    
    var queryString = 
    document.location.search + searchInputVal; 
    location.assign(queryString); 
    console.log(queryString)
}


function getParams() { 
    var searchParamsArr = document.location.search.split('&');
    var query = searchParamsArr[0].split('=').pop();

    searchApi(query);
    console.log(searchParamsArr)
}


// the input text is placed below the search bar 
// The weather for the city will display the name of the city, the 
// temp, wind speed, humidity, and UV index 

// Below the current city, will be the 5 day forecast 

// the 5 day forecast will display the Date, temp, wind, and humidity.

// the users input will be stored in the local Storage. 