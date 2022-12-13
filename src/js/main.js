// IMPORT FILES
import { greeting } from "./fetch_api.js"
import { createRecipeCard } from "./create_cards.js"

greeting();

// --- EDAMAM API KEYS --- //
const appId = "3b2a73e8";
const apiKey = "cd04877bbc5e2a254448c3464867d456";

let input = document.querySelector("#input"); //use
const submit = document.querySelector("#submit"); //use
const container = document.querySelector("#container");
const loader = document.querySelector("#loader"); //use

// ② FETCH INFORMATION FROM API //
const startApi = (input) => {
  displayLoading();
  document.querySelector("#title").innerHTML = `Showing recipes for the search ${input}`;
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${appId}&app_key=${apiKey}`;
  fetch(url).then(res => res.json()).then((data) => {
    console.log(data.hits);
    createRecipeCard(data.hits);
    hideLoading();
  })
};

// ①　- - - GETTING INFORMATION FROM INPUTS - - - //
// --- Search form --- //
submit.addEventListener("click", (e) => {
  e.preventDefault();
  startApi(input.value);
  input.value = "";
  cleanContainer();
});

// --- li items --- //
const ideas = document.querySelectorAll("#ideas li");
ideas.forEach((n) => {
  n.addEventListener("click", (e) => {
    startApi(e.currentTarget.innerHTML);
  })
})

// const openOverlay = (data) => {
//   console.log(data);

//   //Get elements from overlay HTML
//   const overlay = document.getElementById("overlay");
//   let overlayImg = document.getElementById("overlay-img");
//   let overlayTitle = document.getElementById("overlay-title");
//   const recipeLink = document.getElementById("recipe-link");
//   const ingredientsList = document.getElementById("ingredients-list");
//   const closeBtn = document.getElementById("close-btn");

//   //Change content of elements
//   overlayTitle.innerHTML = data.recipe.label;
//   overlayImg.src = data.recipe.image;
//   recipeLink.href = data.recipe.url;

//   //Create ingredients list
//   for (let i = 0; i < data.recipe.ingredientLines.length; i++) {
//     let ingredient = document.createElement("LI");
//     ingredient.innerHTML = data.recipe.ingredientLines[i];
//     ingredientsList.appendChild(ingredient);
//     // I need to format this list everytime I open the overlay!!
//   }

//   //Add link to button
//   recipeLink.href = data.recipe.url;

//   //Make overlay visible
//   overlay.classList.remove("hidden");

//   //Hide overlay
//   closeBtn.addEventListener("click", () => {
//     overlay.classList.add("hidden");
//     // Format the ingredient list:
//     while (ingredientsList.firstChild) {
//       ingredientsList.removeChild(ingredientsList.firstChild);
//     }
//   });
// };

// - - - SHOW AND HIDE THE LOADER - - - //
const displayLoading = () => {
  loader.style.display = "block";
};

const hideLoading = () => {
  loader.style.display = "none";
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
