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
