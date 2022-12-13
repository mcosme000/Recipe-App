
import { openOverlay } from "./open_overlay.js"

const greenContainer = document.querySelector("#green");
const cardContainer = document.querySelector("#card-container");


export const createRecipeCard = (recipes) => {
  console.log(recipes);
  recipes.forEach((recipe) => {
    console.log(recipe);
    `<div class="tripcard">
      <img src="/images/athens.jpg" alt="Trip image" class="trip-card-img">
      <div class="trip-content">
        <div>
          <h2>Trip to Athems</h2>
          <p>Discover the capital of Greece!</p>
        </div>
        <h2>179.99</h2>
      </div>
    </div>`
    let recipeTag = `<div class="card">
      <div class="logo-container">
        <img src="media/vegan.svg" alt="" class="logo" />
        <img src="media/gluten-free.svg" alt="" class="logo" />
      </div>
      <div class="img-container" style="background-image: url("${recipe.recipe.image}")></div>
      <div class="card-content">
        <div class="like-container">
          <img src="media/black-heart.svg">
        </div>
        <h3 class="title">${recipe.recipe.label}</h3>
      </div>
    </div>`
  });

  for (let i = 0; i < recipes.length; i++) {
    //Getting information from data
    let recipeTitle = recipes[i].recipe.label;
    let healthLabels = recipes[i].recipe.healthLabels;
    let mealType = recipes[i].recipe.mealType;
    let cuisineType = recipes[i].recipe.cuisineType;
    let imgAtt = recipes[i].recipe.image;

    // hide the green container
    greenContainer.style.display = "none";

    // By default, the main container where the cards are is hidden
    container.style.display = "block";

    //Create a logo container // --------------------
    let logoContainer = document.createElement("DIV");
    logoContainer.classList.add("logo-container");

    //Create icons for health labels:
    /* I declared an array that contains the three names of the labels I will use in this project.
       I loop through the data array and then loop agan through the iconHealth one.
       If the elements are the same, I change the att for the icon
       (the icon names must be the exact in order to work). */
    const iconHealth = ["Vegan", "Gluten-Free", "Dairy-Free"];
    for (let i = 0; i < healthLabels.length; i++) {
      for (let j = 0; j < iconHealth.length; j++) {
        if (healthLabels[i] === iconHealth[j]) {
          let logo = document.createElement("img");
          logo.setAttribute("src", `media/${iconHealth[j]}.svg`);
          logoContainer.appendChild(logo);
        }
      }
    }

    //Create an image // --------------------
    let imgElement = document.createElement("IMG");
    imgElement.setAttribute("src", imgAtt);

    //Create an image container and append image // --------------------
    let imgContainer = document.createElement("DIV");
    imgContainer.classList.add("img-container");
    imgContainer.appendChild(imgElement);
    imgContainer.appendChild(logoContainer);

    //Create a title /// --------------------
    let titleElement = document.createElement("H3");
    titleElement.classList.add("title");
    titleElement.innerHTML = recipeTitle;

    //Create a recipe container and append elements
    let recipeContentContainer = document.createElement("DIV");
    recipeContentContainer.classList.add("padding", "recipe-content");
    recipeContentContainer.appendChild(titleElement); // --------------------
    // recipeContentContainer.appendChild(labelContainer);

    //Create a card element and append ALL the previous elements
    let cardElement = document.createElement("DIV");
    cardElement.classList.add("card");
    cardElement.appendChild(imgContainer);
    cardElement.appendChild(recipeContentContainer);

    //Append elements to the card container and the container
    cardContainer.appendChild(cardElement);
    container.appendChild(cardContainer);
  }

  //After all the cards are created, I store them in a variable and send it
  //with the API DATA to the function to get data of each one of them.
  let cards = document.getElementsByClassName("card");
  let favbuttons = document.getElementsByClassName("fav-btn");
  console.log(favbuttons);
  getSelectedCard(cards, recipes);
};

// - - - IDENTIFY THE CLICKED CARD TO CREATE AN OVERLAY - - - //
/* Since I'm not showing all the information in the small cards,
I still need the whole API data array to get extra information
Since both arrays have the same lenght, when I click on X card, I can get the data[X] */
const getSelectedCard = (arr, data) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", (e) => {
      e.preventDefault();
      openOverlay(data[i]);
    });
  }
};
