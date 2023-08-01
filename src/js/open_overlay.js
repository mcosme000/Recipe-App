import { dietary_icons } from "./dietary_icons.js";

const overlay = document.querySelector("#overlay");

export const openOverlay = (data) => {
  const ingredientLines = data.recipe.ingredientLines;
  console.log(`Data from openoverlay`);
  console.log(data);
  let icons = dietary_icons(data.recipe.healthLabels)
  console.log(icons);
  let overlayCard = `<div class="overlay-card">
    <div class="close-btn" id="close-btn">
      <img src="media/close.svg" alt="" class="icon" />
    </div>
    <div class="overlay-img" style="background-image: url(${data.recipe.image});">
    </div>
    <div class="overlay-text padding">
      <h3 class="overlay-title" id="overlay-title">${data.recipe.label}</h3>
      <p class="bold">Ingredients:</p>
      <ul id="ingredients-list"></ul>
      ${icons.children.length > 0 ? `<p class="bold">Dietary restrictions</p>` : ''}
      <a href="${data.recipe.url}" target="_blank" class="button" id="recipe-link">Recipe</a>

    </div>
  </div>`

  document.querySelector(".overlay-content").insertAdjacentHTML("beforeend", overlayCard);

  //Make overlay visible
  overlay.classList.remove("hidden");

  //Create ingredients list
  ingredientLines.forEach((item) => {
    let ingredient = `<li>${item}</li>`
    document.querySelector("#ingredients-list").insertAdjacentHTML("beforeend", ingredient);
  })

  //Hide overlay
  document.querySelector("#close-btn").addEventListener("click", () => {
    overlay.classList.add("hidden");
    // Format the overlay card and ingredients list:
    document.querySelector(".overlay-content").innerHTML = "";
    document.querySelector("#ingredients-list").innerHTML = "";
  });
};
