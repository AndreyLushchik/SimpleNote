const closeModalBtn = document.querySelector(".js-close-modal");
const modal = document.querySelector(".js-modal-backdrop");
modal.addEventListener("click", closeModal);

function openModal() {
  modal.classList.remove("modal-hidden");
}

function closeModal(event) {
  if (event.target === modal || event.target === closeModalBtn)
    modal.classList.add("modal-hidden");
}

export { openModal, closeModal };
