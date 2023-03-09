"use strict";

import "../css/style.css";

import "../css/menu.css";
import "../css/order.css";
import "../css/modal.css";
import "../css/offer.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/preview.css";
import "../css/promotion.css";
import "../css/sidepanel.css";
import "../css/calculator.css";

import form from "./modules/form.js";
import cards from "./modules/cards.js";
import timer from "./modules/timer.js";
import modal from "./modules/modal.js";
import slider from "./modules/slider.js";
import preview from "./modules/preview.js";
import calculator from "./modules/calculator.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("script");

  timer("2023-06-04");
  form();
  modal();
  cards();
  slider();
  preview();
  calculator();
});
