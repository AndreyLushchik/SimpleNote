const openModalBtn = document.querySelector(".js-open-modal");
const closeModalBtn = document.querySelector(".js-close-modal");
const modal = document.querySelector(".js-modal-backdrop");

openModalBtn.addEventListener("click", openModal);
modal.addEventListener("click", closeModal);

function openModal() {
  modal.classList.remove("modal-hidden");
}

function closeModal(event) {
  if (event.target === modal || event.target === closeModalBtn)
    modal.classList.add("modal-hidden");
}

export { openModal, closeModal };
