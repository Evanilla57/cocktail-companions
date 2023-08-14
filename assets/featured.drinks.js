window.onload = function () {
  // Get the selected recipe ID from the URL query parameters
  var urlParams = new URLSearchParams(window.location.search);
  var selectedRecipeId = urlParams.get("recipeId"); // Replace 'recipeId' with the actual parameter name
  console.log("Selected Recipe ID", selectedRecipeId);

  if (selectedRecipeId) {
    // Fetch recipe details using the selectedRecipeId
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${selectedRecipeId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const recipe = data.drinks[0];

        console.log("Fetched Recipe Details:", recipe);

        // Update the recipe name
        document.getElementById("recipe-name").textContent = recipe.strDrink;
        console.log("Recipe Name:", recipe.strDrink);
        // Populate ingredients list
        var ingredientsList = document.getElementById("ingredients-list");
        for (let i = 1; i <= 15; i++) {
          if (recipe["strIngredient" + i]) {
            var ingredient = document.createElement("li");
            ingredient.textContent = recipe["strIngredient" + i];
            ingredientsList.appendChild(ingredient);
          }
        }

        // Populate recipe instructions
        document.getElementById("recipe-instructions").textContent =
          recipe.strInstructions;
      })
      .catch((error) => {
        console.log("Error fetching recipe details:", error);
      });
  }
};
