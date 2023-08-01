
import { openOverlay } from "./open_overlay.js"
import { dietary_icons } from "./dietary_icons.js";

const landing = document.querySelector("#landing");
const cardContainer = document.querySelector("#card-container");

export const createRecipeCard = (recipes) => {
  recipes.forEach((recipe) => {
    let icons = dietary_icons(recipe.recipe.healthLabels)
    let recipeTag = `<div class="card">
      <div class="img-container" style="background-image: url(${recipe.recipe.image});">
        ${icons.children.length > 0 ? `<div class="logo-container">${icons.innerHTML}</div>` : ''}
      </div>
      <div class="recipe-content padding">
        <h3 class="recipe-title">${recipe.recipe.label}</h3>
      </div>
    </div>`

    cardContainer.insertAdjacentHTML("beforeend", recipeTag);
  });

  // for (let i = 0; i < recipes.length; i++) {
  //   //Getting information from data
  //   let recipeTitle = recipes[i].recipe.label;
  //   let healthLabels = recipes[i].recipe.healthLabels;
  //   // let mealType = recipes[i].recipe.mealType;
  //   // let cuisineType = recipes[i].recipe.cuisineType;
  //   let imgAtt = recipes[i].recipe.image;
  // }
    // hide the landing
    landing.style.display = "none";

    // By default, the main container where the cards are is hidden
    container.style.display = "block";

    //Create a logo container // --------------------
    let logoContainer = document.createElement("DIV");
    logoContainer.classList.add("logo-container");

  //After all the cards are created, I store them in a variable and send it
  //with the API DATA to the function to get data of each one of them.
  let cards = document.getElementsByClassName("card");
  let favbuttons = document.getElementsByClassName("fav-btn");
  getSelectedCard(cards, recipes);
};

// - - - IDENTIFY CLICKED CARD AND OPEN OVERLAY - - - //
/* I still need the API data array to get additional information.
Since both arrays have the same lenght, when I click on X card, I can get the data[X] */
const getSelectedCard = (arr, data) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", (e) => {
      e.preventDefault();
      openOverlay(data[i]);
    });
  }
};
