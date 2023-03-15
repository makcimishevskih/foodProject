import { openModal, closeModal } from "./modal";
import { postData } from "../utils/services/services.js";

const form = () => {
  const forms = document.querySelectorAll("form");
  const modal = document.querySelector(".modal");
  const modalDialog = document.querySelector(".modal__dialog");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const body = {};

      const message = {
        default: "",
        loading: "/src/img/preloader.gif",
        error: "Что-то пошло не так!",
        success: "Спасибо, скоро с Вами свяжутся!",
      };

      const statusModal = document.createElement("div");
      const inputs = form.querySelectorAll("input");

      function createStatusModal(img) {
        openModal(modal);

        modalDialog.classList.add("hide");
        statusModal.classList.add("modal__dialog");

        statusModal.innerHTML = `
          <div class="modal__content">
            <div class="modal__close">×</div>
              <div class="modal__title">
                <img class="loader" src=${img} alt="preloader"/>
              </div>
          </div>
          `;

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
        modalDialog.classList.remove("hide");
        statusModal.remove();
        closeModal(modal);
      }

      inputs.forEach((input) => {
        body[input.name] = input.value;
      });

      createStatusModal(message.loading);

      postData("POST", body)
        .then(() => {
          form.reset();
          changeModalContext(message.success);

          setTimeout(() => {
            resetModal(statusModal);
          }, 3000);
        })
        .catch((err) => {
          changeModalContext(message.error);
          console.log("xxxxxxxxxxxxxxxxxxx");
          setTimeout(() => {
            resetModal(statusModal);
          }, 3000);

          throw new Error(`Ошибка отправки формы: ${message.error} ${err}`);
        });
    });
  });
};

export default form;
