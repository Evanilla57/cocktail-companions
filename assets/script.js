

// var apiKey = "9973533";


var ingredientFormEl = document.querySelector('#ingredient-form');
var userIngredientEl = document.querySelector('#user-ingredients');
var recipeContainerEl = document.querySelector('#recipe-container');

var recipeSubmitHandler = function (event) {
  console.log(event);
  event.preventDefault();

  let recipe = userIngredientEl.value.trim();

  if (recipe) {
    getRecipe(recipe);
    recipeContainerEl.value = '';
    // If ingredient is invalid, error message will display and function will stop running
  } else {
    recipeContainerEl.textContent = 'Please enter a valid ingredient';
    return;
  }
};


var getRecipe = function (recipe) {
  var apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + recipe;

  fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    // 1. create ul element in memory (var ul = document.createElement('ul'))
    // 2. loop through data.drinks
    // 3. for each drink, create li element
    // 4. append li to ul 
    // 5. when loop finished, append ul to recipeContainerEl
  })
};

ingredientFormEl.addEventListener("submit", recipeSubmitHandler);
