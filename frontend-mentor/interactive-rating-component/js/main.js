const form = document.querySelector("#rating-form");
const main = document.querySelector("main");

const ratings = document.querySelectorAll(".form__ratings--rate");

ratings.forEach((rating) => {
  rating.addEventListener("click", function () {
    ratings.forEach((rating) => {
      rating.classList.remove("rating--selected");
    });

    rating.classList.add("rating--selected");
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (document.querySelector(".rating--selected") != null) {
    let selectedRating =
      document.querySelector(".rating--selected").firstElementChild.textContent;

    main.innerHTML = `<img src="assets/illustration-thank-you.svg" alt="" aria-hidden="true" class="img--selected">

    <div class="text--center">
      <p class="rating__selected">You selected ${selectedRating} out of 5</p>

      <h1>Thank you!</h1>

      <p class="appreciate">We appreciate you taking the time to give a rating. If you ever need more support,
        don’t hesitate to get in touch!</p>
    </div>`;
  }
});
