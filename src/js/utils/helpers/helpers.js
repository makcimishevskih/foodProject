function getZero(time) {
  if (time < 0) return;
  return time < 10 ? `0${time}` : time;
}

function removeClassFromArr(arr, className) {
  arr.forEach((el) => el.classList.remove(className));
}
function addClassToTarget(arr, target = null, className) {
  arr.forEach((el) => {
    if (el === target) {
      target.classList.add(className);
    }
  });
}

export { getZero, removeClassFromArr, addClassToTarget };
