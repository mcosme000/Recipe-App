"use strict";

//

// --- EDAMAM API KEYS --- //
const appId = "3b2a73e8";
const apiKey = "cd04877bbc5e2a254448c3464867d456";

// ** search recipes on ingredients!! ** //
const startApi = (input) => {
  let searchRecipes = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${appId}&app_key=${apiKey}`;
  axios.get(searchRecipes).then(getRecipes);
};

//

// --- GETTING ELEMENTS FROM HTML --- //
let input = document.getElementById("input");
let showTitle = document.getElementById("show-title");
const submit = document.getElementById("submit");
const landingInput = document.getElementById("landing-input");
const landingSubmit = document.getElementById("landing-submit");
const container = document.getElementById("container");
const cardContainer = document.getElementById("card-container");
let card = document.getElementsByClassName("card");
const greenContainer = document.getElementById("green");

// overlay elements:
let overlay = document.getElementById("overlay");
let overlayImg = document.getElementById("overlay-img");
let overlayTitle = document.getElementById("overlay-title");
const landing = document.getElementById("landing");

// - - - GETTING INFORMATION FROM INPUTS - - - //
/* In the app there are 3 different ways to input information and call the API: 
  1. Main form: located in the header
  2. Form shown on the opening screen (where the user first opens the app)
  3. Li labels with ideas of recipe searches
*/

// --- MAIN FORM --- //
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = input.value;
  console.log(input);
  showTitle.innerHTML = `Showing recipes for the search ${inputValue}`;
  input.value = "";
  startApi(inputValue);
  cleanContainer();
});

// --- OPENING SCREEN FORM --- //
landingSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = landingInput.value;
  showTitle.innerHTML = `Showing recipes for the search ${inputValue}`;
  startApi(inputValue);
  hideLanding();
});

// --- LI LABELS RECOMMENDATIONS --- //
const ideas = document.getElementById("ideas").children;
for (let i = 0; i < ideas.length; i++) {
  ideas[i].addEventListener("click", () => {
    startApi(ideas[i].innerHTML);
    showTitle.innerHTML = `Showing recipes for the search ${ideas[i].innerHTML}`;
  });
}

//

// - - - CREATING CARDS FROM API DATA - - - //
/* This function creates the cards
that will be shown in the main container */
const createRecipeCard = (data) => {
  // console.log(data);
  for (let i = 0; i < data.length; i++) {
    //Getting information from data
    let recipeTitle = data[i].recipe.label;
    let healthLabels = data[i].recipe.healthLabels;
    let mealType = data[i].recipe.mealType;
    let cuisineType = data[i].recipe.cuisineType;
    let imgAtt = data[i].recipe.image;

    // hide the green container
    greenContainer.style.display = "none";

    // By default, the main container where the cards are is hidden
    // I need to change it to visible:
    container.style.display = "block";

    //Create a logo container
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

    //Create a like button container
    let likeContainer = document.createElement("DIV");
    likeContainer.classList.add("like-container");

    //Create a like button
    let likeBtn = document.createElement("IMG");
    likeBtn.setAttribute("src", "media/black-heart.svg");
    likeContainer.appendChild(likeBtn);

    //Create an image
    let imgElement = document.createElement("IMG");
    imgElement.setAttribute("src", imgAtt);

    //Create an image container and append image
    let imgContainer = document.createElement("DIV");
    imgContainer.classList.add("img-container");
    imgContainer.appendChild(imgElement);
    imgContainer.appendChild(likeContainer);
    imgContainer.appendChild(logoContainer);

    // //Create a label container
    // let labelContainer = document.createElement("DIV");
    // labelContainer.classList.add("label-container");

    // //create labels for meal type
    // for (let j = 0; j < mealType.length; j++) {
    //   let label = document.createElement("P");
    //   label.classList.add("label");
    //   label.innerHTML = mealType[j];
    //   labelContainer.appendChild(label);
    // }

    //Create a title
    let titleElement = document.createElement("H3");
    titleElement.classList.add("title");
    titleElement.innerHTML = recipeTitle;

    //Create a recipe container and append elements
    let recipeContentContainer = document.createElement("DIV");
    recipeContentContainer.classList.add("padding", "recipe-content");
    recipeContentContainer.appendChild(titleElement);
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
  getSelectedCard(cards, data);
};

// - - - AFTER CALLING THE API - - - //
/* This function is called after running the API 
It gets the necessary information stored in the API and then
sends that information to the function above to create cards */
const getRecipes = (data) => {
  let recipeData = data.data.hits;
  createRecipeCard(recipeData);
};

//

// - - - IDENTIFY THE CLICKED CARD TO CREATE AN OVERLAY - - - //
/* This function is called when I click on any card */
/* Since I'm not showing all the information in the small cards,
I still need the whole API data array to get extra information 
Since both arrays have the same lenght, when I click on X card, I can get the data[X] */
const getSelectedCard = (arr, data) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", () => {
      // console.log(data[i]);
      openOverlay(data[i]);
    });
  }
};

const openOverlay = (data) => {
  console.log(data);

  //Get elements from overlay HTML
  const overlay = document.getElementById("overlay");
  let overlayImg = document.getElementById("overlay-img");
  let overlayTitle = document.getElementById("overlay-title");
  const recipeLink = document.getElementById("recipe-link");
  const ingredientsList = document.getElementById("ingredients-list");
  const closeBtn = document.getElementById("close-btn");

  //Change content of elements
  overlayTitle.innerHTML = data.recipe.label;
  overlayImg.src = data.recipe.image;
  recipeLink.href = data.recipe.url;

  //Create ingredients list
  for (let i = 0; i < data.recipe.ingredientLines.length; i++) {
    let ingredient = document.createElement("LI");
    ingredient.innerHTML = data.recipe.ingredientLines[i];
    ingredientsList.appendChild(ingredient);
    // I need to format this list everytime I open the overlay!!
  }

  //Add link to button
  recipeLink.href = data.recipe.url;

  //Make overlay visible
  overlay.classList.remove("hidden");

  //Hide overlay
  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    // Format the ingredient list:
    while (ingredientsList.firstChild) {
      ingredientsList.removeChild(ingredientsList.firstChild);
    }
  });
};

//

// - - - CREATE ARRAY OF FAVORITES - - - //

// - - - SHOW THAT ARRAY IN myrecipes.html - - - //
const favoriteContainer = document.getElementById("favorite-container");

const createFavCard = () => {
  console.log("Creating card...!");
};

// - - - HIDE THE LANDING OVERLAY - - - //
const hideLanding = () => {
  landing.classList.add("hidden");
};

// - - - CLEAN THE CARDS FROM CONTAINER - - - //
const cleanContainer = () => {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
};
