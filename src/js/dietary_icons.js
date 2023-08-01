export const dietary_icons = (data) => {
  const iconHealth = ["vegan", "gluten-gree", "dairy-free"];
  let logoContainer = document.createElement("DIV")
  data.forEach((n) => {
    iconHealth.forEach((icon) => {
      if (icon == n.toLowerCase()) {
        console.log(n.toLowerCase());
        let logo = document.createElement("img");
        logo.setAttribute("src", `media/${n.toLowerCase()}.png`);
        console.log(logo);
        logo.classList.add("icon")
        logoContainer.appendChild(logo);
      }
    })
  })
  return logoContainer;
}
