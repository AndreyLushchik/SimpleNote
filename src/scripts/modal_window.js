const openModalBtn = document.querySelector(".js-open-modal");
const closeModalBtn = document.querySelector(".js-close-modal");
const modal = document.querySelector(".js-modal-backdrop");

/*
openModalBtn.addEventListener("click", openModal);
modal.addEventListener("click", closeModal);*/

function createElement(tag, className, text = "") {
  const element = document.createElement(tag);
  element.className = className;

  const textElement = document.createTextNode(text);
  element.append(textElement);

  return element;
}

function createHeader() {
  const header = createElement();

  function openModal() {
    modal.classList.remove("modal-hidden");
  }

  function closeModal(event) {
    if (event.target === modal || event.target === closeModalBtn)
      modal.classList.add("modal-hidden");
  }

  header.append(openModal, closeModal);
  return header;
}

export { createHeader };
