"use strict";
import preview from "./modules/preview.js";
import timer from "./modules/timer.js";
import modal from "./modules/modal.js";
import cards from "./modules/cards.js";
import form from "./modules/form.js";
import slider from "./modules/slider.js";
import calculator from "./modules/calculator.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("sctipt");
  timer("2023-06-04");
  preview();
  modal();
  cards();
  form();
  slider();
  calculator();
});
