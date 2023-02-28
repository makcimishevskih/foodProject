function openModal(modal, timerId) {
    const scrollWidth = window.innerWidth - document.body.clientWidth;
    clearTimeout(timerId);
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollWidth + "px";
}

function closeModal(modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
}

const modal = () => {
    const modal = document.querySelector(".modal");
    const html = document.documentElement;
    let timerId = setTimeout(openModal, 500000);

    function connectWithUs(e, className) {
        const t = e.target;
        if (t === modal) {
            closeModal(modal);
        } else if (t && t.classList.contains(className)) {
            openModal(modal, timerId);
        }
    }

    function showModalByScroll() {
        const maxPageHeight = Math.max(html.clientHeight, window.innerHeight, html.scrollHeight);

        if (html.clientHeight + scrollY >= maxPageHeight) {
            openModal(modal, timerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("click", (e) => connectWithUs(e, "btn__connect"));

    modal.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("modal__close")) {
            closeModal(modal);
        }
    });

    window.addEventListener("keydown", (e) => {
        if (modal.classList.contains("show") && e.key === "Escape") {
            closeModal(modal);
        }
    });

    window.addEventListener("scroll", showModalByScroll);
};

export default modal;
export { openModal, closeModal };
