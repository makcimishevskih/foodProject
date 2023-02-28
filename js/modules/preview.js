function preview() {
    const tabsParent = document.querySelector(".tabheader__items");
    const tabs = document.querySelectorAll(".tabheader__item");

    const tabContent = document.querySelectorAll(".tabcontent");

    function tabsInitialisation(i = 0) {
        tabContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    function hideTabContent() {
        tabContent.forEach((el) => (el.style.display = "none"));
    }

    function deleteClassFromArr(array, className) {
        array.forEach((el) => {
            el.classList.remove(className);
        });
    }

    function showTabContent(element) {
        tabs.forEach((tab, i) => {
            if (tab === element) {
                tabContent[i].style.display = "block";
            }
        });
    }
    function addClassToElem(elem, className) {
        elem.classList.add(className);
    }

    tabsParent.addEventListener("click", (e) => {
        const targ = e.target;
        if (targ && targ.classList.contains("tabheader__item")) {
            hideTabContent();
            deleteClassFromArr(tabs, "tabheader__item_active");
            addClassToElem(targ, "tabheader__item_active");
            showTabContent(targ);
        }
    });

    deleteClassFromArr(tabs, "tabheader__item_active");
    hideTabContent();
    tabsInitialisation();
}

export default preview;
