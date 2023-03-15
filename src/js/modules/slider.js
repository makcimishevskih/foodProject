import { getZero, removeClassFromArr } from "../utils/helpers/helpers.js";

const slider = () => {
  const slider = document.querySelector(".offer__slider");
  const sliderWrapper = document.querySelector(".offer__slider-wrapper");
  const slides = document.querySelectorAll(".offer__slide");
  const prev = document.querySelector(".offer__slider-prev");
  const next = document.querySelector(".offer__slider-next");

  const parseSlideWidth = parseInt(window.getComputedStyle(slides[0]).width);
  const slidesCount = slides.length;

  let slidesIndex = 1;
  let offset = 0;

  const currentSlide = document.querySelector("#current");
  const totalSlides = document.querySelector("#total");

  totalSlides.textContent = getZero(slidesCount);

  next.addEventListener("click", () => {
    if (slidesIndex === slidesCount) {
      slidesIndex = 1;
      offset = 0;
    } else {
      slidesIndex++;
      offset += parseSlideWidth;
    }
    sliderWrapper.style.transform = `translateX(${-offset}px)`;
    currentNavDot(slidesIndex);
    currentSlideInit(slidesIndex);
  });

  prev.addEventListener("click", () => {
    if (slidesIndex === 1) {
      offset = parseSlideWidth * (slidesCount - 1);
      slidesIndex = slidesCount;
    } else {
      slidesIndex--;
      offset += -parseSlideWidth;
    }
    sliderWrapper.style.transform = `translateX(${-offset}px)`;
    currentNavDot(slidesIndex);
    currentSlideInit(slidesIndex);
  });

  window.addEventListener("click", (e) => {
    const t = e.target;

    if (t && t.classList.contains("dot")) {
      const dots = document.querySelectorAll(".dot");
      removeClassFromArr(dots, "dot_active");
      t.classList.add("dot_active");

      dots.forEach((el, i) => {
        if (el.classList.contains("dot_active")) {
          slidesIndex = i + 1;
          currentSlideInit(i + 1);
          offset = parseSlideWidth * i;
          sliderWrapper.style.transform = `translateX(${-offset}px)`;
        }
      });
    }
  });

  function currentSlideInit(slideNumber = 1) {
    currentSlide.textContent = getZero(slideNumber);
  }

  function currentNavDot(dotNumber = 1) {
    const dots = document.querySelectorAll(".dot");
    removeClassFromArr(dots, "dot_active");

    dots.forEach((el, i) => {
      if (i + 1 === dotNumber) {
        el.classList.add("dot_active");
      } else {
        el.classList.remove("dot_active");
      }
    });
  }

  function createDots() {
    const nav = document.createElement("div");
    nav.classList.add("nav");

    slides.forEach((el, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      nav.append(dot);
    });
    slider.append(nav);
    currentNavDot();
  }

  createDots();
  currentSlideInit();
};

export default slider;
