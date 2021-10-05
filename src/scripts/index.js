import { clock } from "./clock.js";
setInterval(clock, 1000);

import { openModal, closeModal } from "./modal_window.js";
import { createInput, showDropdown} from "./modal_windows-select";

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

const printArea = document.querySelector("#select");
const dropdown = () => {
    const component = document.createElement("div");
    const input = createInput();
    const dropdown = showDropdown();
  
    component.appendChild(input);
    component.appendChild(dropdown);
    printArea.appendChild(component);
  };
  dropdown();
