const cocktailSelect = document.getElementById("cocktailSelect");
const getCocktailButton = document.getElementById("getCocktailButton");
const cocktailDetails = document.getElementById("cocktailDetails");
const cocktailName = document.getElementById("cocktailName");
const cocktailImage = document.getElementById("cocktailImage");
const cocktailInstructions = document.getElementById("cocktailInstructions");
const cocktailIngredients = document.getElementById("cocktailIngredients");

// Fetch a list of cocktails and populate the select element
fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
    .then(response => response.json())
    .then(data => {
        data.drinks.forEach(cocktail => {
            const option = document.createElement("option");
            option.value = cocktail.idDrink;
            option.textContent = cocktail.strDrink;
            cocktailSelect.appendChild(option);
        });
    });

// Event listener for the "Get Cocktail" button
getCocktailButton.addEventListener("click", () => {
    const selectedCocktailId = cocktailSelect.value;

    if (selectedCocktailId) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${selectedCocktailId}`)
            .then(response => response.json())
            .then(data => {
                const drink = data.drinks[0];
                cocktailName.textContent = drink.strDrink;
                cocktailImage.src = drink.strDrinkThumb;
                cocktailInstructions.textContent = drink.strInstructions;

                // Clear previous ingredients
                cocktailIngredients.innerHTML = "";

                // Add ingredients and measures to the list
                for (let i = 1; i <= 15; i++) {
                    const ingredient = drink[`strIngredient${i}`];
                    const measure = drink[`strMeasure${i}`];

                    if (ingredient && measure) {
                        const ingredientItem = document.createElement("li");
                        ingredientItem.textContent = `${measure} of ${ingredient}`;
                        cocktailIngredients.appendChild(ingredientItem);
                    }
                }

                cocktailDetails.classList.remove("hidden");
            });
    }
});
function fetchCocktailDetails(cocktailId) {
  const apiEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;

  return fetch(apiEndpoint)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          if (data.drinks && data.drinks.length > 0) {
              return data.drinks[0];
          } else {
              throw new Error("Cocktail not found");
          }
      });
}

// Example of using the fetchCocktailDetails function
const cocktailId = "11007"; // Replace with the ID of the cocktail you want to fetch
fetchCocktailDetails(cocktailId)
  .then(cocktail => {
      // Process the cocktail data here
      console.log(cocktail);
  })
  .catch(error => {
      console.error(error);
  });
