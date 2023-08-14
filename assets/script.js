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
      var featuredRecipes = data.drinks.slice(3, 9); // Get drinks from index 3-5

      featuredRecipes.forEach(function (recipe) {
        var recipeItem = document.createElement("li");
        recipeItem.className = "featured-recipe";
        recipeItem.textContent = recipe.strDrink;
        featuredRecipesContainer.appendChild(recipeItem);

        recipeItem.addEventListener("click", function () {
          window.location.href =
            "featured.drinks.html?recipeId=" + recipe.idDrink;
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
