const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let errorMessage = "";
  let email = document.getElementById("email").value;
  let emailInput = document.getElementById("email");

  if (!email) {
    errorMessage = "Whoops! It looks like you forgot to add your email";
    emailInput.classList.add("invalid");
  } else if (!validRegex.test(email)) {
    errorMessage = "Please provide a valid email address";
    emailInput.classList.add("invalid");
  } else {
    errorMessage = "";
  }

  document.querySelector(".form__input--invalid").innerHTML = errorMessage;
});
