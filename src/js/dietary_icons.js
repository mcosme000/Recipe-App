export const dietary_icons = (data) => {
  const iconHealth = ["Vegan", "Gluten-Free", "Dairy-Free"];
  let logoContainer = document.createElement("DIV")
  data.forEach((n) => {
    iconHealth.forEach((icon) => {
      if (icon == n) {
        let logo = document.createElement("img");
        logo.setAttribute("src", `media/${n}.png`);
        logo.classList.add("icon")
        logoContainer.appendChild(logo);
      }
    })
  })
  return logoContainer;
}
