import { getZero } from "./additionalFunctions.js";

const timer = (date) => {
  const finishTime = date;

  const initializationDate = () => {
    const promoFinishTime = new Date(finishTime);
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const day = document.querySelector(".promotion__descr .day");
    const month = document.querySelector(".promotion__descr .month");
    const time = document.querySelector(".promotion__descr .time");

    day.textContent = promoFinishTime.getDate();
    month.textContent = months[promoFinishTime.getMonth()];
    time.textContent =
      getZero(promoFinishTime.getHours()) +
      ":" +
      getZero(promoFinishTime.getMinutes());
  };

  const getTime = (deadline) => {
    const currentTime = new Date();
    const endTime = Date.parse(deadline) - currentTime;

    let days, hours, minutes, seconds;

    if (endTime <= 0) {
      days = "00";
      hours = "00";
      minutes = "00";
      seconds = "00";
    } else {
      days = Math.floor(endTime / (1000 * 60 * 60 * 24));
      hours = Math.floor((endTime / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((endTime / (1000 * 60)) % 60);
      seconds = Math.floor((endTime / 1000) % 60);
    }

    return {
      days,
      hours,
      minutes,
      seconds,
      endTime,
    };
  };

  const initializationTimer = () => {
    const timerId = setInterval(setTimer, 1000);

    const daysContainer = document.querySelector("#days");
    const hoursContainer = document.querySelector("#hours");
    const minutesContainer = document.querySelector("#minutes");
    const secondsContainer = document.querySelector("#seconds");

    function setTimer() {
      const { days, hours, minutes, seconds, endTime } = getTime(finishTime);
      if (endTime === 0) clearInterval(timerId);
      daysContainer.textContent = getZero(days);
      hoursContainer.textContent = getZero(hours);
      minutesContainer.textContent = getZero(minutes);
      secondsContainer.textContent = getZero(seconds);
    }
  };

  initializationTimer();
  initializationDate();
};

export default timer;
