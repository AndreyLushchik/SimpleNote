"use strict";

import { Clock } from "./components/Clock.js";
import { setDataLocalStorage, getDataLocalStorage } from "./components/storage-API.js";
import { LocalStorage } from "./components/Local-storage.js";
import { PopupSmall, Popup } from "./components/Popup.js"
import { Card } from "./components/Card.js";


// App

document.addEventListener("DOMContentLoaded", app);
function app() {
  const data = getDataLocalStorage();
  renderCards(data)
  let clock = new Clock()
  clock.start()
}

// DOM Elements

const btnAdd = document.querySelector(".column-todo__btn-todo--add")
const btnDelete = document.querySelector(".column-done__btn-done--delete")
const header = document.querySelector(".header__flex-container")
const search = document.querySelector(".header__search")
const searchBtn = document.querySelector(".header__seach-btn")
const cancelBtn = document.querySelector(".header__cancel-btn")
const cardContainerTodo = document.querySelector(".column-todo__card-container");
const cardContainerProgress = document.querySelector(".column-progress__card-container");
const cardContainerDone = document.querySelector(".column-done__card-container")

// Event listeners
              

header.addEventListener("click", searchCards)
btnAdd.addEventListener("click", popupRender)
btnDelete.addEventListener("click", popupSmallRender)

// Card Button Todo

const cardBtnTodo = [
  { id: "", class: "card__btn-delete", text: "delete" },
  { id: "", class: "card__btn-edit", text: "edit" },
  { id: "", class: "card__btn-progress", text: ">" }]

// Card Button Progress

const cardBtnProgress = [
  { id: "", class: "card__btn-back", text: "back" },
  { id: "", class: "card__btn-complete", text: "complete" }]

// Card Button Done

const cardBtnDone = [{ id: "", class: "card__btn-delete", text: "delete" }]

// Popup Button 

const popupBtn = [
  {
    class: "popup-warning__footer-btn-red", text: "cansel", padding: "10px", background: "red",
    hendler() {
      const popup = new PopupSmall({}, "", [])
      popup.popupClose()
    }
  },
  {
    class: "popup-warning__footer-btn-blue", text: "ok", padding: "10px", background: "blue",
    hendler() {
      setDataLocalStorage([])
      renderCards([])

      const popup = new PopupSmall({}, "", [])
      popup.popupClose()
    }
  }]

const popupBtnNone = []


// Plugins App 

const asynchronous = (ms) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

function popupSmallRender() {
  const data = getDataLocalStorage()
  if (data.length > 0) {
    const popup = new PopupSmall({}, "All todos will be deleted. Confirm?", [popupBtn])
    popup.popupOpen()
  } else {
    const popup = new PopupSmall({}, "you don't have any cases started", [popupBtnNone])
    popup.popupOpen()
  }
}

function popupRender() {
  const popup = new Popup({})
  popup.popupOpen()
}


function searchCards(event) {
  if (event.target === searchBtn) {
    search.classList.add("show-search")
    const searchTitle = getDataLocalStorage().filter(item => item.title === search.value)
    if (searchTitle.length === 0) {
      search.value = ""
    } else if (searchTitle.length > 0) {
      searchBtn.classList.add("hidden")
      cancelBtn.classList.add("show")
      search.placeholder = "cancel"
      search.value = ""
      renderCards(searchTitle)
      search.classList.remove("show-search")
    }
  } else if (event.target === cancelBtn) {
    search.classList.remove("show-search")
    searchBtn.classList.remove("hidden")
    cancelBtn.classList.remove("show")
    search.placeholder = "search"
    renderCards(getDataLocalStorage())
  }
}


function printUsers({ name, username }) {
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
  const todoStorage = new LocalStorage(popupTitle.value, popupDescription.value, select.value);
  data.push(todoStorage);
  setDataLocalStorage(data);
  popupTitle.value = "";
  popupDescription.value = "";
}


function renderCards(data) {
  cardContainerTodo.innerHTML = ""
  cardContainerProgress.innerHTML = ""
  cardContainerDone.innerHTML = ""
  data.map(item => {

    switch (item.classCard) {
      case "todo":
        const todo = new Card(item, [cardBtnTodo], cardContainerTodo)
        todo.addCard()
        break;
      case "progress":
        const progress = new Card(item, [cardBtnProgress], cardContainerProgress)
        progress.addCard()
        break;
      case "done":
        const done = new Card(item, [cardBtnDone], cardContainerDone)
        done.addCard()
        break;
    }
  })
  renderCounter(".column-todo__title", "Todo", "todo")
  renderCounter(".column-progress__title", "In Progress", "progress")
  renderCounter(".column-done__title", "Done", "done")
}

function counter(classCard) {
  const todo = getDataLocalStorage().filter(item => item.classCard === classCard)
  return todo

}
function renderCounter(itemClass, title, classCard) {
  const todo = counter(classCard)
  document.querySelector(`${itemClass}`).innerText = `${title}:${todo.length}`
}


export { printUsers, fillLocalStorage, renderCards, asynchronous, popupBtnNone, renderCounter }











