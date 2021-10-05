import { renderClock } from "./components/clock.js";
import {
  openModal,
  closeModal,
} from "./components/modal_window/modal_window.js";
import { getUser } from "./components/modal_window/modal_windows-select";

setInterval(renderClock, 1000);
// Event Handlers
const openModalBtn = document.querySelector(".js-open-modal");
openModalBtn.addEventListener("click", (event) => {
  if (event.target.id === "add") {
    openModal();
  }
  if (event.target.className === ".js-close-modal") {
    closeModal(event);
  }
});
