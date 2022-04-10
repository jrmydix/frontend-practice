// Tri state
var buttons = document.getElementsByClassName("btns__theme--btn");
var arr = [...buttons];

arr.forEach((element, index) => {
  element.addEventListener("click", () => {
    element.style.opacity = "1";

    arr
      .filter(function (item) {
        return item != element;
      })
      .forEach((item) => {
        item.style.opacity = "0";
      });
  });
});

// Theme
const btnThemeDark = document.querySelector("#dark");
const btnThemeLight = document.querySelector("#light");
const btnThemeThird = document.querySelector("#third");

if (
  localStorage.theme === "light" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: light)").matches)
) {
  document.documentElement.classList.add("light");
  btnThemeLight.style.opacity = "1";
} else if (localStorage.theme === "third") {
  document.documentElement.classList.add("third");
  btnThemeThird.style.opacity = "1";
} else {
  document.documentElement.classList.add("dark");
  btnThemeDark.style.opacity = "1";
}

btnThemeDark.addEventListener("click", function (e) {
  if (localStorage.theme == "light") {
    localStorage.theme = "dark";
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  } else if (localStorage.theme == "third") {
    localStorage.theme = "dark";
    document.documentElement.classList.remove("third");
    document.documentElement.classList.add("dark");
  }
});

btnThemeLight.addEventListener("click", function (e) {
  if (localStorage.theme == "dark") {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  } else if (localStorage.theme == "third") {
    localStorage.theme = "light";
    document.documentElement.classList.remove("third");
    document.documentElement.classList.add("light");
  }
});

btnThemeThird.addEventListener("click", function (e) {
  if (localStorage.theme == "light") {
    localStorage.theme = "third";
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("third");
  } else if (localStorage.theme == "dark") {
    localStorage.theme = "third";
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("third");
  }
});
