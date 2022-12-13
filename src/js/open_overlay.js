// overlay elements:
let overlay = document.getElementById("overlay");
let overlayImg = document.getElementById("overlay-img");
let overlayTitle = document.getElementById("overlay-title");
const landing = document.getElementById("landing");

export const openOverlay = (data) => {
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
