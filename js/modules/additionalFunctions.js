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

// function openModal(modal, timerId) {
//     const scrollWidth = window.innerWidth - document.body.clientWidth;
//     clearTimeout(timerId);
//     modal.classList.add("show");
//     document.body.style.overflow = "hidden";
//     document.body.style.paddingRight = scrollWidth + "px";
// }

// function closeModal(modal) {
//     modal.classList.remove("show");
//     document.body.style.overflow = "";
//     document.body.style.paddingRight = "";
// }

async function postData(url, method = "GET", formData, form) {
    const response = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return response.json();
}

async function getData(url) {
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            console.log("You have an error: ", response.status);
            throw new Error("Error: ", response.status, err);
        }
    } catch (err) {
        console.log("You have an error", err);
        throw new Error("Error", err);
    }
}

export { getZero, postData, getData, removeClassFromArr, addClassToTarget };
