import { removeClassFromArr } from "./additionalFunctions.js";

const calculator = () => {
  const bodySize = document.querySelectorAll(
    ".calculator__choose_medium > input"
  );
  const genderWrapper = document.querySelector("#gender");
  const activityWrapper = document.querySelector("#activity");
  const resultCCAL = document.querySelector(".calculator__result > span");

  const personData = {
    gender: "Woman",
    height: "",
    weight: "",
    age: "",
    ratio: 1.375,
  };

  function initFromLocalStorage() {
    for (let key in personData) {
      if (key === "gender" || key === "ratio") {
        const dataAttrElems = document.querySelectorAll(`[data-${key}]`);

        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, personData[key]);
        }

        const storageValue = localStorage.getItem(key) || personData[key];

        personData[key] = storageValue;

        dataAttrElems.forEach((el) => {
          if (el.getAttribute(`data-${key}`) === storageValue) {
            el.classList.add("calculator__choose-item_active");
          } else {
            el.classList.remove("calculator__choose-item_active");
          }
        });
      }
    }
  }

  initFromLocalStorage();

  window.addEventListener("click", (e) => {
    const t = e.target;
    if (
      t.closest("#activity") &&
      t.classList.contains("calculator__choose-item")
    ) {
      changeValueWithDataAttr(activityWrapper, t, "data-ratio", personData);
    } else if (
      t.closest("#gender") &&
      t.classList.contains("calculator__choose-item")
    ) {
      changeValueWithDataAttr(genderWrapper, t, "data-gender", personData);
    }
    calculateTotal(personData);
  });

  function changeValueWithDataAttr(parent, element, attr, obj) {
    const objKey = attr.slice(5);
    const children = parent.querySelectorAll("div");
    const dataAttr = element.getAttribute(attr);

    removeClassFromArr(children, "calculator__choose-item_active");
    element.classList.add("calculator__choose-item_active");
    obj[objKey] = dataAttr;
    for (let key in obj) {
      localStorage.setItem(key, obj[key]);
    }
  }

  function checkKeysIsTrue(obj) {
    for (let k in obj) {
      if (!obj[k]) {
        return false;
      }
    }
    return true;
  }

  function calculateTotal(obj) {
    if (checkKeysIsTrue(personData)) {
      const { gender, weight, height, age, ratio } = obj;
      let total = 0;

      if (obj.gender === "Man") {
        const BMRman =
          (88.36 + (13.4 * weight + 4.8 * height - 5.7 * age)) * ratio;
        total = BMRman;
      } else {
        const BMRwoman =
          (447.6 + (9.2 * weight + 3.1 * height - 4.3 * age)) * ratio;
        total = BMRwoman;
      }

      if (total > 0) {
        resultCCAL.textContent = total.toFixed();
      } else {
        resultCCAL.textContent = "Error < 0";
      }
      return;
    }

    resultCCAL.textContent = 0;
  }

  function getDynamicData(parent) {
    parent.forEach((input) => {
      input.addEventListener("input", (e) => {
        const t = e.target;
        const nameAttr = t.getAttribute("name");
        const value = t.value.replace(/\D/gi, "");
        if (t.value.match(/\D/) && !value) {
          t.style.border = "2px solid red";
        } else {
          t.style.border = "none";
        }

        t.value = value;
        personData[nameAttr] = value;

        calculateTotal(personData);
      });
    });
  }
  getDynamicData(bodySize);
};

export default calculator;
