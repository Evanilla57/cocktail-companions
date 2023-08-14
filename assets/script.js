var featuredRecipesContainer = document.getElementById(
  "featured-recipes-container"
);

var apiKey = "9973533";

window.onload = function () {
  var request = new XMLHttpRequest();

  request.open(
    "GET",
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`,
    true
  );
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      var featuredRecipes = data.drinks.slice(0, 3); // Get the first three recipes

      featuredRecipes.forEach(function (recipe) {
        var recipeItem = document.createElement("li");
        recipeItem.className = "featured-recipe";
        recipeItem.textContent = recipe.strDrink;
        featuredRecipesContainer.appendChild(recipeItem);

        recipeItem.addEventListener("click", function () {
          window.location.href =
            "featured-drinks.html?recipeId=" + recipe.idDrink;
          // Implement navigation to recipe details page using var
        });
      });
    } else {
      console.log("Error fetching data from the API.");
    }
  };

  request.onerror = function () {
    console.log("Connection error.");
  };

  request.send();
};
