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
const fetch = require('node-fetch');
const fs = require('fs');

async function downloadCocktailImages() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
    const data = await response.json();

    if (data.drinks) {
        for (const cocktail of data.drinks) {
            const imageUrl = cocktail.strDrinkThumb;
            const imageName = `images/${cocktail.strDrink}.jpg`;

            const imageResponse = await fetch(imageUrl);
            const buffer = await imageResponse.buffer();

            fs.writeFileSync(imageName, buffer);
            console.log(`Downloaded: ${imageName}`);
        }
    }
}

downloadCocktailImages();
// Update this line to set the src attribute to the local image path
cocktailImage.src = `images/${drink.strDrink}.jpg`;

