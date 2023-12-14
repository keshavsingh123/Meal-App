const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipee-container");
const recipeDetailContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".close-btn");

//function to get recipees
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipe...</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const res = await data.json();

    recipeContainer.innerHTML = "";

    res.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span>Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span>category</p>
    `;
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      //Adding eventListener for recipe btn
      button.addEventListener("click", () => {
        openRecipePopup(meal);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = `
    <img class"notFound" src="images/imgNF.jpg" alt="notFound" srcset="">`;
  }
};

const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
  //   console.log(meal);
};

const openRecipePopup = (meal) => {
  recipeDetailContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div>
        <h3>
            Instructions
        </h3>
        <p class="recipeInstruction">${meal.strInstructions}</p>
    </div>
    `;

  recipeDetailContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener("click", () => {
  recipeDetailContent.parentElement.style.display = "none";
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the meal first...</h2>`;
  }
  fetchRecipes(searchInput);
});
