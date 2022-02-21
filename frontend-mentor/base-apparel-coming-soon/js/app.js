const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validRegex.test(email.value)) {
    email.classList.add("invalid");
  }

  let isValid = true;

  if (input.classList.contains("invalid")) {
    isValid = false;
  }

  if (isValid) {
    input.value = "";
  }
});

input.addEventListener("focus", () => {
  input.classList.remove("invalid");
});
