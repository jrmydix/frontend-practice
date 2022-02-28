const accordion = document.querySelectorAll(".accordion__question");

accordion.forEach((accItem) => {
  accItem.addEventListener("click", function () {
    if (this.classList.contains("active")) {
      this.nextElementSibling.style.maxHeight = "0";
    } else {
      this.nextElementSibling.style.maxHeight = "unset";
    }
    
    this.classList.toggle("active");
  });
});
