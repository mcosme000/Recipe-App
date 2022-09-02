"use strict";

//

// --- EDAMAM API KEYS --- //
const appId = "3b2a73e8";
const apiKey = "cd04877bbc5e2a254448c3464867d456";

//

// --- GETTING ELEMENTS FROM HTML --- //
let input = document.getElementById("input");
let showTitle = document.getElementById("show-title");
const submit = document.getElementById("submit");
const container = document.getElementById("container");
const cardContainer = document.getElementById("card-container");
let card = document.getElementsByClassName("card");

//

// --- GETTING INFORMATION FROM INPUT --- //
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = input.value;
  showTitle.innerHTML = inputValue;
  input.value = "";
  startApi(inputValue);
  cleanContainer();
});

//

// - - - THE MAIN FUNCTION - - - //
const createRecipeCard = (data) => {
  // console.log(data);
  for (let i = 0; i < data.length; i++) {
    //

    // - - - GET VARIABLES FROM DATA - - - //
    let recipeTitle = data[i].recipe.label;
    let healthLabels = data[i].recipe.healthLabels;
    let mealType = data[i].recipe.mealType;
    let cuisineType = data[i].recipe.cuisineType;
    let imgAtt = data[i].recipe.image;

    //

    // - - - CREATE ELEMENTS - - - //
    let cardElement = document.createElement("DIV");
    let imgContainer = document.createElement("DIV");
    let labelContainer = document.createElement("DIV");
    let logoContainer = document.createElement("DIV");
    labelContainer.classList.add("label-container");
    let imgElement = document.createElement("IMG");
    let recipeContentContainer = document.createElement("DIV");
    let titleElement = document.createElement("H3");

    //

    //create labels for meal type
    for (let j = 0; j < mealType.length; j++) {
      let label = document.createElement("P");
      label.classList.add("label");
      label.innerHTML = mealType[j];
      labelContainer.appendChild(label);
    }

    //

    // - - - ADD CLASSES AND ATT TO EACH ELEMENT - - - //
    cardElement.classList.add("card");
    recipeContentContainer.classList.add("recipe-content");
    logoContainer.classList.add("logo-container");
    titleElement.innerHTML = recipeTitle;
    imgElement.setAttribute("src", imgAtt);

    //

    // - - - CHECK HEALTH LABELS - - - //
    // I declared an array that contains the three names of the labels I will use in this project.
    // I loop through the data array and then loop agan through the iconHealth one.
    // If the elements are the same, I change the att for the icon
    // (the icon names must be the exact in order to work).
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

    //

    //APPEND ELEMENTS//
    imgContainer.appendChild(imgElement);
    recipeContentContainer.appendChild(titleElement);
    recipeContentContainer.appendChild(labelContainer);
    cardElement.appendChild(imgContainer);
    cardElement.appendChild(recipeContentContainer);
    cardElement.appendChild(logoContainer);
    cardContainer.appendChild(cardElement);
    container.appendChild(cardContainer);
  }

  // ----------
  //When all the cards are created, I call them and send them and the DATA
  //to the function to get data of each one of them.
  let cards = document.getElementsByClassName("card");
  getOverlay(cards, data);
};

// ** search recipes on ingredients!! ** //
const startApi = (input) => {
  let searchRecipes = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${appId}&app_key=${apiKey}`;
  axios.get(searchRecipes).then(getRecipes);
};

const getRecipes = (data) => {
  let recipeData = data.data.hits;
  createRecipeCard(recipeData);
};

const cleanContainer = () => {
  console.log("Cleaning container...");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
};

// GET HOVERED CARD
// Since I'm not showing all the information in the small cards, I still need the
// whole data array to get extra information and show it on the overlay.
// Since both arrays have the same lenght, when I click on X card, I can get the data[X]
const getOverlay = (arr, data) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", () => {
      console.log(data[i]);
    });
  }
};
