"use strict";

import{getCurrentTime} from "./components/clock.js";
import{CreatePopup} from "./components/template-popup";
import{setDataLocalStorage,getDataLocalStorage} from "./components/local-storage.js";
import{TemplateLocalStorage} from "./components/template-storage.js";
import{CreateCard} from "./components/template-card.js";

// App

document.addEventListener("DOMContentLoaded", app);
function app(){
const data =  getDataLocalStorage();
renderCards(data)
setInterval(getCurrentTime, 1000);
}

// DOM elements

const btnAdd = document.querySelector(".column-todo__btn-todo--add")
const header = document.querySelector(".header__flex-container")
const search = document.querySelector(".header__search")
const searchBtn = document.querySelector(".header__seach-btn")
const cancelBtn = document.querySelector(".header__cancel-btn")


// Event listeners

header.addEventListener("click",searchCards)
btnAdd.addEventListener("click", createPopup)


// Plugins app 

function createPopup(){
  const emptyObj = {id: "",title: "",description: "",user: "",}
  new CreatePopup(emptyObj).popupOpen()
}

function searchCards(event){
 if(event.target === searchBtn){
  search.classList.add("show-search")
  const searchTitle =  getDataLocalStorage().filter(item => item.title === search.value)
  if(searchTitle.length === 0){
    search.value = ""
  } else if (searchTitle.length > 0){
    searchBtn.classList.add("hidden")
    cancelBtn.classList.add("show") 
    search.placeholder = "cancel"
    search.value = ""
    renderCards(searchTitle)
    search.classList.remove("show-search")
  } 
} else if(event.target === cancelBtn) {
  search.classList.remove("show-search")
  searchBtn.classList.remove("hidden")
  cancelBtn.classList.remove("show")
  search.placeholder = "search"
  renderCards( getDataLocalStorage())
}
}


function printUsers({name,username}) {
  const listItem = document.createElement("option");
  const select = document.querySelector(".popup__user")
  listItem.textContent = `${name}, ${username}`;
  select.append(listItem);
}


function fillLocalStorage() {
  const popupTitle = document.querySelector(".popup__title");
  const popupDescription = document.querySelector(".popup__description");
  const select = document.querySelector(".popup__user")
  const data = getDataLocalStorage();
  const todoStorage = new TemplateLocalStorage(popupTitle.value, popupDescription.value,select.value);
  data.push(todoStorage);
  setDataLocalStorage(data);
  popupTitle.value = "";
  popupDescription.value = "";

}

function renderCards(data) {
  const cardContainerTodo = document.querySelector(".column-todo__card-container");
  const cardContainerProgress = document.querySelector(".column-progress__card-container");
  const cardContainerDone = document.querySelector(".column-done__card-container")
  cardContainerTodo.innerHTML = ""
  cardContainerProgress.innerHTML = ""
  cardContainerDone.innerHTML = ""
  data.map((item) => {
    if (item.classeCard === "todo") {
      new CreateCard(item).printCard(cardContainerTodo);
      new CreateCard(item).addListeners();
    } else if (item.classeCard === "progress") {
      new CreateCard(item).printCard(cardContainerProgress);
      new CreateCard(item).addListeners();
    } else if (item.classeCard === "done") {
      new CreateCard(item).printCard(cardContainerDone);
      new CreateCard(item).addListeners();
    }
  });
}

export{ printUsers,fillLocalStorage,renderCards}