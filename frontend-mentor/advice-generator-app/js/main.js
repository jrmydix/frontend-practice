const newAdvice = async () => {
  const adviceId = document.querySelector("#advice-id");
  const adviceText = document.querySelector("#advice-text");

  const request = await fetch("https://api.adviceslip.com/advice", {
    cache: "no-cache",
  });
  const data = await request.json();

  adviceId.innerHTML = data.slip.id;
  adviceText.innerHTML = data.slip.advice;
};

const adviceBtn = document.querySelector("#advice-dice");

adviceBtn.addEventListener("click", () => {
  newAdvice();
});

window.onload = () => {
  newAdvice();
};
