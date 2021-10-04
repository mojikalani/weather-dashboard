var weatherApiKey = "1c72e10c1966cc56d5ada2f30bd1c3c6";
var searchHistory = [];
var form = $("#search-form");
var searchInput = $("#citySearch");
var resultsContainer = $("#results");
var searchHistoryContainer = $("#search-history");

// init search history
searchHistory = localStorage.getItem("search-history");
if (searchHistory) {
  searchHistory = JSON.parse(searchHistory);
} else {
  searchHistory = [];
}

function handleFormSubmit(event) {
  event.preventDefault();
  var query = searchInput.val().trim();
  if (query) {
    searchGiphy(query);
    searchInput.val("");
    addSearchToHistory(query);
  }
}

// Accepts a query and fetches data from the giphy api.
function searchCity(query) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" + 
    weatherApiKey;
    console.log(requestUrl)
    
  fetch(requestUrl)
    .then(function (response) {
        console.log(response);
      return response.json();
    })
    .then(function (data) {
      resultsContainer.empty();
      for (var i = 0; i < data.data.length; i++) {
        displayGiphy(data.data[i]);
      }
    });
}




function displayGiphy(giphyResult) {
  var imgUrl = giphyResult.images.downsized_large.url;
  var title = giphyResult.title;

  var img = $("<img>").attr({
    src: imgUrl,
    class: "img-fluid",
    alt: title,
  });
  var col = $("<div>").addClass("col-12 col-lg-6 pb-4").append(img);

  resultsContainer.append(col);
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
  searchGiphy(this.textContent);
}

function addSearchToHistory(query) {
  searchHistory.push(query);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  displayButtons();
}

form.on("submit", handleFormSubmit);
searchHistoryContainer.on("click", ".btn-search", handleSearchClick);

displayButtons();
