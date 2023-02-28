// @ts-nocheck
import { postData } from "./additionalFunctions.js";
import { openModal, closeModal } from "./modal";
const form = () => {
    const forms = document.querySelectorAll("form");
    const modal = document.querySelector(".modal");
    const modalDialog = document.querySelector(".modal__dialog");

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const message = {
                default: "",
                loading: "/img/preloader.gif",
                error: "Что-то пошло не так!",
                success: "Спасибо, скоро с Вами свяжутся!",
            };

            const statusModal = document.createElement("div");

            function createStatusModal() {
                openModal(modal);

                modalDialog.classList.add("hide");
                statusModal.classList.add("modal__dialog");

                statusModal.innerHTML = `
                    <div class="modal__content">
                        <div class="modal__close">×</div>
                        <div class="modal__title">
                            <img style='width: 50px; height: 50px;' src=
                            ${message.loading} alt='preloader'/>
                        </div>
                        </div>`;
                // @ts-ignore
                modal.append(statusModal);
            }

            function changeModalContext(message) {
                statusModal.innerHTML = `
                    <div class="modal__content">
                        <div class="modal__close">×</div>
                        <div class="modal__title">${message}</div>
                    </div>`;
            }

            function resetModal() {
                // @ts-ignore
                modalDialog.classList.remove("hide");
                statusModal.remove();
                closeModal(modal);
            }

            const inputs = form.querySelectorAll("input");
            const obj = {};

            inputs.forEach((input) => {
                obj[input.name] = input.value;
            });

            try {
                createStatusModal();
                postData("http://localhost:3000/requests", "POST", obj, form)
                    .catch((err) => {
                        changeModalContext(message.error);
                        setTimeout(() => {
                            // @ts-ignore
                            resetModal(statusModal);
                        }, 3000);
                        throw new Error(`${message.error} ${err}`);
                    })
                    .then(() => {
                        form.reset();
                        changeModalContext(message.success);
                        setTimeout(() => {
                            // @ts-ignore
                            resetModal(statusModal);
                        }, 3000);
                    });
            } catch (err) {
                // @ts-ignore
                throw new Error("Ошибка отправки формы:", err);
            }
        });
    });
};

export default form;
