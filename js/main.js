"use strict";
const slides = document.querySelectorAll(".js-slide");
const btnPrev = document.querySelector(".js-btn-prev");
const btnNext = document.querySelector(".js-btn-next");
const dotContainer = document.querySelector(".js-dot");

// Main Slide Function
const slider = function () {
  // Assigning VAlues
  let curSlide = 0;
  const maxSlide = slides.length;

  // Create Dots
  const createDots = function () {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide=${i}>
        </button>`
      )
    );
  };

  // Activate Dots
  const activateDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // Goto Slide
  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Previous Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    gotoSlide(curSlide);
    activateDots(curSlide);
  };

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    gotoSlide(curSlide);
    activateDots(curSlide);
  };

  // Calling startup function
  const init = function () {
    gotoSlide(0);
    createDots();
    activateDots(0);
  };
  init();

  // Event handlers
  btnPrev.addEventListener("click", prevSlide);
  btnNext.addEventListener("click", nextSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateDots(slide);
    }
  });
};
slider();
