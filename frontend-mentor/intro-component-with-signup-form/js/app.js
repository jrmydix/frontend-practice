const form = document.querySelector(".form");
const input = document.querySelectorAll(".form__input");
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!firstName.value) {
    firstName.classList.add("invalid");
  }
  if (!lastName.value) {
    lastName.classList.add("invalid");
  }
  if (!validRegex.test(email.value)) {
    email.classList.add("invalid");
  }
  if (!password.value) {
    password.classList.add("invalid");
  }

  let isValid = true;

  input.forEach((input) => {
    if (input.classList.contains("invalid")) {
      isValid = false;
    }
  });

  if (isValid) {
    input.forEach((input) => {
      input.value = "";
    });
  }
});

input.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.remove("invalid");
  });
});
