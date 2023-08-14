// Variables targetting HTML id's
var brewFormEl = document.querySelector('#brewForm');
var zipInputEl = document.querySelector('#zipInput');
var zipDisEl = document.querySelector('#zipDisplay');
var brewContainerEl = document.querySelector('#brewContainer');

// Variable for function to accept zipcode data from zipcode form
var zipSubmitHandler = function (event) {
    event.preventDefault();

    let zipCode = zipInputEl.value.trim();

    if (zipCode) {
        getBrew(zipCode);
        zipInputEl.value = '';
    } else {
        zipDisEl.textContent = 'Please enter a valid zipcode.';
        return;
    }
};

// Function to use Zipcode data with API for fetch request
var getBrew = function (zipCode) {
    var apiUrl = 'https://api.openbrewerydb.org/v1/breweries?by_postal=' + zipCode + '&per_page=5';

    fetch(apiUrl)
        .then(function (response) {
                response.json().then(function (data) {
                displayBrews(data, zipCode);
                });
})};

// Variable for function to display and append fetched data below the search form
var displayBrews = function (breweryData, zipSearch) {
    zipDisEl.textContent = zipSearch;
    if (breweryData.length === 0) {
        brewContainerEl.textContent = 'No breweries found.';
        return;
    }

    kill();

    for (var i = 0; i < breweryData.length; i++) {

        var brewName = breweryData[i].name;

        var locationEl = document.createElement('li');

        locationEl.textContent = brewName

        brewContainerEl.appendChild(locationEl);
    }
};

// Event Handler for search button
brewFormEl.addEventListener('submit', zipSubmitHandler);

// Function to remove previous children before now list elements are created
function kill() {
    while (brewContainerEl.firstChild) {
        brewContainerEl.removeChild(brewContainerEl.firstChild);
    }
};
