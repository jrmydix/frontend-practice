function emailValidation() {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let errorMessage = "";
  let email = document.getElementById("email").value;

  if (!email) {
    errorMessage = "Oops! Please add your email";
  } else if (!validRegex.test(email)) {
    errorMessage = "Oops! Please check your email";
  } else {
    errorMessage = "";
  }

  document.getElementById("error-message").innerHTML = errorMessage;
}
