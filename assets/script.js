// Get the container element for featured recipes
var featuredRecipesContainer = document.getElementById(
  "featured-recipes-container"
);

// API key for accessing TheCocktailDB API
var apiKey = "9973533";

// Execute the following code when the window finishes loading
window.onload = function () {
  var request = new XMLHttpRequest();

  // Open a GET request to fetch cocktail data from the API
  request.open(
    "GET",
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`,
    true
  );

  // Define the action to perform once the request loads successfully
  request.onload = function () {
    // Check if the response status indicates success
    if (request.status >= 200 && request.status < 400) {
      // Parse the JSON response data
      var data = JSON.parse(request.responseText);
      // Extract a subset of featured recipes from the data
      var featuredRecipes = data.drinks.slice(3, 9); // Get drinks from index 3-8

      // Loop through each featured recipe
      featuredRecipes.forEach(function (recipe) {
        // Create a list item element to display the recipe name
        var recipeItem = document.createElement("li");
        recipeItem.className = "featured-recipe";
        recipeItem.textContent = recipe.strDrink;

        // Append the recipe item to the featured recipes container
        featuredRecipesContainer.appendChild(recipeItem);

        // Attach a click event listener to each recipe item
        recipeItem.addEventListener("click", function () {
          // Navigate to the recipe details page using the recipe's ID
          window.location.href =
            "featured.drinks.html?recipeId=" + recipe.idDrink;
        });
      });
    } else {
      // Log an error message if data fetching is unsuccessful
      console.log("Error fetching data from the API.");
    }
  };

  // Define the action to perform if there's an error with the request
  request.onerror = function () {
    console.log("Connection error.");
  };

  // Send the API request
  request.send();
};

// code for recipe container 
var ingredientFormEl = document.querySelector('#ingredient-form');
var userIngredientEl = document.querySelector('#user-ingredients');
var recipeContainerEl = document.querySelector('#recipe-container');
var ingredientContainerEl = document.querySelector('#ingredient-container');


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
    displayRecipes(data.drinks);
    });
  };


var displayRecipes = function (drinks) {
  // 1. Create ul element in memory
  var ul = document.createElement('ul');

  // 2. Loop through data.drinks
  for (var i = 0; i < drinks.length; i++) {
    // 3. Create li element for each drink
    var li = document.createElement('li');

    // 4. Create anchor element (<a>) for each drink
    var drinkLink = document.createElement('a');
    drinkLink.textContent = drinks[i].strDrink;
    drinkLink.href = 'recipe.html?drink=' + encodeURIComponent(drinks[i].strDrink); // Create a URL with the drink name as a parameter

    // 5. Append anchor to li
    li.appendChild(drinkLink);

    // 6. Append li to ul
    ul.appendChild(li);
  }

  // 7. Append ul to recipeContainerEl
  recipeContainerEl.innerHTML = ''; // Clear previous content
  recipeContainerEl.appendChild(ul);
};

var ingredientSubmission = function(event){
  event.preventDefault();
  var wordArray = userIngredientEl.value.trim();
  console.log(wordArray);
  var divEl = document.createElement('div');
  divEl.textContent = wordArray;
  ingredientContainerEl.appendChild(divEl);
};



ingredientFormEl.addEventListener("submit", recipeSubmitHandler);
ingredientFormEl.addEventListener("submit", ingredientSubmission);

// 1. create ul element in memory (var ul = document.createElement('ul'))
    // 2. loop through data.drinks
    // 3. for each drink, create li element
    // 4. append li to ul 
    // 5. when loop finished, append ul to recipeContainerEl