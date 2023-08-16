var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var drinkName = urlParams.get('drink'); // Retrieve the 'drink' parameter from the URL

var recipeInstructionsEl = document.querySelector('#recipe-instructions');
var drinkNameContainerEl = document.querySelector('#recipe-name');
var ingredientsContainerEl = document.querySelector('#ingredients-list');
var drinkImgEl = document.querySelector('#drink-image');

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
  var instructions = drink.strInstructions;
  var drinkNames = drink.strDrink;
  var drinkImg = drink.strDrinkThumb;

  for (let i = 1; i <= 15; i++) {
    if (drink["strIngredient" + i]) {
      var ingredient = document.createElement("li");
      ingredient.textContent = drink["strIngredient" + i];
      ingredientsContainerEl.appendChild(ingredient);
    }
  }

  // Display the instructions in the recipeContainerEl
  recipeInstructionsEl.textContent = instructions;
  drinkNameContainerEl.textContent = drinkNames;
  drinkImgEl.src = drinkImg;

};
