const billInput = document.querySelector("#bill-value");

const tipPercentage = document.querySelectorAll(".btn--green");
const customTipPercentage = document.querySelector("#tip-percentage");

const peopleInput = document.querySelector("#people-count");
const peopleInputError = document.querySelector(".label--people-count");

const tipAmount = document.querySelector("#tip-amount");
const tipTotal = document.querySelector("#tip-total");

// Reset
window.addEventListener("load", reset);

const btnReset = document.querySelector(".btn--reset");
btnReset.addEventListener("click", reset);

function reset() {
  btnReset.classList.remove("active");
  billInput.value = null;
  billValue = 0;
  peopleInput.value = null;
  peopleCount = 0;
  peopleInput.classList.remove("invalid");
  peopleInputError.classList.remove("active");
  customTipPercentage.value = null;
  tipValue = 0;
  tipPercentage.forEach((btn) => {
    btn.classList.remove("btn--active");
  });
  tipAmount.innerHTML = "0.00";
  tipTotal.innerHTML = "0.00";
}
// End of reset

// Bill input
billInput.addEventListener("input", billUpdate);

function billUpdate() {
  btnReset.classList.add("active");

  billValue = parseFloat(billInput.value);

  calculate();
}
// End of bill input

// Tip % inputs
tipPercentage.forEach((btn) => {
  btn.addEventListener("click", setButtonClicked);
});

function setButtonClicked(el) {
  btnReset.classList.add("active");

  tipPercentage.forEach((btn) => {
    btn.classList.remove("btn--active");
  });
  customTipPercentage.value = null;

  el.target.classList.add("btn--active");

  tipValue = parseFloat(el.target.innerHTML) / 100;

  calculate();
}
// End of tip % inputs

// Custom tip % input
customTipPercentage.addEventListener("input", setCustomTipValue);

function setCustomTipValue() {
  btnReset.classList.add("active");

  tipValue = parseFloat(customTipPercentage.value / 100);

  tipPercentage.forEach((btn) => btn.classList.remove("btn--active"));

  calculate();
}
// End of tip % inputs

// People count
peopleInput.addEventListener("input", checkPeopleCount);

function checkPeopleCount() {
  btnReset.classList.add("active");

  peopleCount = parseFloat(peopleInput.value);

  if (peopleInput.value < 1 && peopleInput.value != null) {
    peopleInput.classList.add("invalid");
    peopleInputError.classList.add("active");
  } else {
    peopleInput.classList.remove("invalid");
    peopleInputError.classList.remove("active");

    calculate();
  }
}
// End of people count

// Tip calculation
function calculate() {
  if (
    peopleInput.value >= 1 &&
    typeof tipValue !== "undefined" &&
    typeof billValue !== "undefined"
  ) {
    let tipAmountResult = (billValue * tipValue) / peopleCount;
    tipAmount.innerHTML = tipAmountResult.toFixed(2);

    let tipTotalResult = billValue / peopleCount + tipAmountResult;
    tipTotal.innerHTML = tipTotalResult.toFixed(2);
  }
}
// End of tip calculation
