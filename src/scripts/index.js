"use strict";


import { renderTime } from "./components/clock.js";
import { getUsers, setData, getData } from "./components/API.js";
import { TodoStorage, CreateCard } from "./components/Template.js";



document.addEventListener('DOMContentLoaded', () => {
  const data = getData()
  renderCards(data)
})

// DOM elements

const wrapper = document.querySelector(".wrapper");


// modal

const wrapper = document.querySelector(".wrapper");

function createPopup() {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.insertAdjacentHTML(
    "afterbegin",
    `<div class="popup__body">
        <div class="popup__content">
        <input type="text" placeholder="Title" class="popup__title">
        <input type="textarea" placeholder="Text" class="popup__description">
        <div class="popup__footer">
        <select name="user" class="popup__user"></select>
        <button class="popup__btn-add">add</button>
         <button class="popup__btn-close">close</button>
        </div>
    </div>
 </div>`
  );
  wrapper.append(popup);
  return popup;
}
const modal = createPopup();
function openPopup() {
  const popupContent = document.querySelector(".popup__content");
  modal.classList.add("open"),
  popupContent.classList.add("open-cont"),
  getUsers()

}

function closePopup() {
 modal.classList.remove("open");
}

// local storage

function createLocalStorage() {
  const select = document.querySelector(".popup__user");
  const popupTitle = document.querySelector(".popup__title");
  const popupDescription = document.querySelector(".popup__description");
  const data = getData();
  const todoStorage = new TodoStorage(
    popupTitle.value,
    popupDescription.value,
    select.value
  );
  data.push(todoStorage);
  setData(data);
  popupTitle.value = "";
  popupDescription.value = "";
}

const btnAdd = document.querySelector(".column-todo__btn-todo--add");

wrapper.addEventListener("click", (e) => {
  if (e.target === btnAdd) {
    openPopup();
  } else if (e.target.className === 'popup__btn-close') {
    closePopup();
  } else if (e.target.className === 'popup__body') {
    closePopup();
  } else if (e.target.className === "popup__btn-add") {
    createLocalStorage();
    renderCards(getData())
    closePopup();
  }
});

// render

function renderCards(data) {
  const cardContainerTodo = document.querySelector(".column-todo__card-container");
  const cardContainerProgress = document.querySelector(".column-progress__card-container");
  cardContainerTodo.textContent = ''
  cardContainerProgress.textContent = ''
  data.forEach((item) => {
    if (item.classeCard === "todo") {
      new CreateCard(item).printCard(cardContainerTodo);
      new CreateCard(item).listener();
    } else if (item.classeCard === "progress") {
      new CreateCard(item).printCard(cardContainerProgress);
      new CreateCard(item).listener();
    }
  });
}
