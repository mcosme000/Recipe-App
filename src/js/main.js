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
  container.classList.remove("hidden");
  displayLoading();
  document.querySelector("#title").innerHTML = `Showing recipes for the search ${input}`;
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${appId}&app_key=${apiKey}`;
  fetch(url).then(res => res.json()).then((data) => {
    console.log(data.hits);
    createRecipeCard(data.hits);
    hideLoading();
    hideLanding();
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

// - - - SHOW AND HIDE THE LOADER - - - //
const displayLoading = () => {
  loader.style.display = "block";
};

const hideLoading = () => {
  loader.style.display = "none";
};

// - - - HIDE THE LANDING OVERLAY - - - //
const hideLanding = () => {
  document.querySelector("#landing").classList.add("hidden");
};

// - - - CLEAN THE CARDS FROM CONTAINER - - - //
const cleanContainer = () => {
  document.querySelector("#card-container").innerHTML = "";
};
