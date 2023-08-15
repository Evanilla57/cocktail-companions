// To test all three scenarios, a user can test the following zipcodes:
// 92592: Text will appear with "No breweries found."
// 92101: Will display closest five breweries
// If an invalid zipcode is selected: Text will display "Please enter a valid zipcode."

// Variables targetting HTML id's
var brewFormEl = document.querySelector('#brewForm');
var zipInputEl = document.querySelector('#zipInput');
var zipDisEl = document.querySelector('#zipDisplay');
var brewContainerEl = document.querySelector('#brewContainer');

// Variable for function to accept zipcode data from zipcode form
var zipSubmitHandler = function (event) {
    // Prevent page from refreshing
    event.preventDefault();

    // Trimming spaces outside of value
    let zipCode = zipInputEl.value.trim();

    // If zipcode is valid, it will run function for brewery information and clear the field
    if (zipCode) {
        getBrew(zipCode);
        zipInputEl.value = '';
    // If zipcode is invalid, error message will display and function will stop running
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
        })
};

// Variable for function to display and append fetched data below the search form
var displayBrews = function (breweryData, zipSearch) {
    zipDisEl.textContent = zipSearch;
    // If no data is available, text will notify user and function will stop running
    if (breweryData.length === 0) {
        brewContainerEl.textContent = 'No breweries found.';
        return;
    }

    // Children elements from previous search results are removed
    kill();

    // For loop will go through API data, displaying a brewery's name and linking its URL
    for (var i = 0; i < breweryData.length; i++) {
        var brewName = breweryData[i].name;
        var brewUrl = breweryData[i].website_url;
        var locationEl = document.createElement('li');
        var linkEl = document.createElement('a');
        linkEl.href = brewUrl;
        linkEl.textContent = brewName;
        
        //results are appended below search bar
        locationEl.appendChild(linkEl);
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
