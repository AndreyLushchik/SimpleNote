import { clock } from "./clock.js";
import { openModal, closeModal } from "./modal_window.js";
import { getUser } from "./modal_windows-select";

setInterval(clock, 1000);
// Event Handlers 
const openModalBtn = document.querySelector(".js-open-modal");
openModalBtn.addEventListener('click', event => {
    if (event.target.id === 'add') {
        openModal()
    }
    if (event.target.className === '.js-close-modal') {
        closeModal(event)
    }
})