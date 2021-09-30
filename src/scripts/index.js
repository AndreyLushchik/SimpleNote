/*window.addEventListener('DOMContentLoaded',() =>{
  window.setInterval(function(){
  let now = new Date();
  let clock = document.getElementById("clock");
  clock.innerHTML = now.toLocaleTimeString();
  },1000);
});*/
import {clock} from './clock.js'
setInterval(clock, 1000);

import { openModal, closeModal } from './modal_window.js'