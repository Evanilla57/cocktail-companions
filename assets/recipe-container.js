var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var drinkName = urlParams.get('drink'); // Retrieve the 'drink' parameter from the URL

var recipeContainerEl = document.querySelector('#recipe-container');

// Fetch recipe details using the retrieved drink name
var apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + encodeURIComponent(drinkName);

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    displayRecipe(data.drinks[0]);
  });

var displayRecipe = function (drink) {
  // Assuming 'strInstructions' is a property in the drink object
  var instructions = drink.strInstructions;

  // Display the instructions in the recipeContainerEl
  recipeContainerEl.textContent = instructions;
};
