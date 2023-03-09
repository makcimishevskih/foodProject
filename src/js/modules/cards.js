import {
  getData,
  removeClassFromArr,
  addClassToTarget,
} from "./additionalFunctions.js";
const cards = () => {
  class CardItem {
    constructor(img, alt, title, description, price, active, parentSelector) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.transfer = 1.63;
      this.isActive = active;
      this.parent = document.querySelector(parentSelector);
    }

    transferUAHtoRUB() {
      this.price *= this.transfer;
      return this.price.toFixed();
    }

    render() {
      this.parent.innerHTML += `<div class='menu__item ${
        this.isActive ? "menu__item_active" : ""
      }'>
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.transferUAHtoRUB()}</span> руб/день</div>
                    </div>
                </div>`;
    }
  }

  const parent = document.querySelector(".menu > .menu__field > .container");

  parent.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.classList.contains("menu__item")) {
      const allCards = document.querySelectorAll(".menu__item");
      removeClassFromArr(allCards, "menu__item_active");
      addClassToTarget(allCards, t, "menu__item_active");
    }
  });

  getData("http://localhost:3000/menu").then((data) => {
    createNewInstanceCardItem(data, ".menu > .menu__field > .container");
  });

  function createNewInstanceCardItem(arr, parentSelector) {
    arr.forEach((el) => {
      return new CardItem(...Object.values(el), parentSelector).render();
    });
  }
};

export default cards;
