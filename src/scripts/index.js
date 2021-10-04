import { clock } from "./clock.js";
import { createHeader } from "./modal_window.js";
import {
  dropdownIcon,
  dropdown,
  createInput,
  showDropdown,
  toggleDropdown,
  selectOption,
} from "./modal_windows-select";

//Start App
document.addEventListener("DOMContentLoaded", app);

function app() {
  const root = document.getElementById("root");


  //openModalBtn.addEventListener("click", openModal);
  //modal.addEventListener("click", closeModal);
  const header = createHeader();
  header.addEventListener("click", onHeaderClick);

  root.append(header); //вставляет переданный элемент после дочернего

}

// Event Handlers
function onHeaderClick(event) {
  if ((event.target.id = ".js-open-modal")) {
    openModalBtn.addEventListener("click", openModal);
  } else if ((event.target.id = ".js-close-modal")) {
    modal.addEventListener("click", closeModal);
  }
}

setInterval(clock, 1000);
