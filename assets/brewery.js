var brewFormEl = document.querySelector('#brewForm');
var zipInputEl = document.querySelector('#zipInput');
var zipDisEl = document.querySelector('#zipDisplay');
var brewContainerEl = document.querySelector('#brewContainer');


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

var getBrew = function (zipCode) {
    var apiUrl = 'https://api.openbrewerydb.org/v1/breweries?by_postal=' + zipCode + '&per_page=5';

    fetch(apiUrl)
        .then(function (response) {
                response.json().then(function (data) {
                displayBrews(data, zipCode);
                });
})};


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
        locationEl.classList = 'list-item flex-row justify-space-between align-center';

        locationEl.textContent = brewName

        brewContainerEl.appendChild(locationEl);
    }
};

brewFormEl.addEventListener('submit', zipSubmitHandler);

//function to remove previous children
function kill() {
    while (brewContainerEl.firstChild) {
        brewContainerEl.removeChild(brewContainerEl.firstChild);
    }
};