"use strict";

// EDAMAM API KEYS //
const appId = "3b2a73e8";
const apiKey = "cd04877bbc5e2a254448c3464867d456";

// GETTING ELEMENTS FROM HTML //
let input = document.getElementById("input");
let showTitle = document.getElementById("show-title");
const submit = document.getElementById("submit");
const container = document.getElementById("container");
const cardContainer = document.getElementById("card-container");

// GETTING INFORMATION FROM INPUT //
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = input.value;
  showTitle.innerHTML = inputValue;
  input.value = "";
  startApi(inputValue);
  cleanContainer();
});

const createRecipeCard = (data) => {
  console.log(data);
  let imgAtt;
  for (let i = 0; i < data.length; i++) {
    //GET VARIABLES FROM DATA//
    let recipeTitle = data[i].recipe.label;
    let healthLabels = data[i].recipe.healthLabels;
    let mealType = data[i].recipe.mealType;
    let cuisineType = data[i].recipe.cuisineType;
    imgAtt = data[i].recipe.image;
    //CREATE ELEMENTS//
    let cardElement = document.createElement("DIV");
    let imgContainer = document.createElement("DIV");
    let labelContainer = document.createElement("DIV");
    labelContainer.classList.add("label-container");
    for (let j = 0; j < mealType.length; j++) {
      let label = document.createElement("P");
      label.classList.add("label");
      label.innerHTML = mealType[j];
      console.log(label);
      labelContainer.appendChild(label);
    }
    let imgElement = document.createElement("IMG");
    let recipeContentContainer = document.createElement("DIV");
    let titleElement = document.createElement("H3");

    //CHANGE VALUES OF ELEMENTS//
    cardElement.classList.add("card");
    recipeContentContainer.classList.add("recipe-content");
    titleElement.innerHTML = recipeTitle;
    imgElement.setAttribute("src", imgAtt);

    // CHECK HEALTH LABELS //
    // if (healthLabels.includes("vegan",))

    //APPEND ELEMENTS//
    imgContainer.appendChild(imgElement);
    recipeContentContainer.appendChild(titleElement);
    recipeContentContainer.appendChild(labelContainer);
    cardElement.appendChild(imgContainer);
    cardElement.appendChild(recipeContentContainer);
    cardContainer.appendChild(cardElement);
    container.appendChild(cardContainer);
    // console.log(data[i].recipe.label);
  }
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
