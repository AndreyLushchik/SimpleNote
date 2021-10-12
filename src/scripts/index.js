"use strict";

// App

document.addEventListener("DOMContentLoaded", app);
function app(){
const data =  getDataLocalStorage();
renderCards(data)
}

// DOM elements

const wrapper = document.querySelector(".wrapper")
const btnAdd = document.querySelector(".column-todo__btn-todo--add")
const header = document.querySelector(".header__flex-container")
const clock = document.querySelector(".header__clock")
const search = document.querySelector(".header__search")
const searchBtn = document.querySelector(".header__seach-btn")
const cancelBtn = document.querySelector(".header__cancel-btn")


// clock

function renderTime() {
  let time = new Date().toLocaleTimeString();
  clock.innerText = time;
}
setInterval(renderTime, 1000);

// search 

header.addEventListener("click",searchCard)

function searchCard(event){
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

// plugins popup почистить!!!

function CreatePopup({id,title,description,user}) {

  this.template = function () {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.id = id
    popup.insertAdjacentHTML(
      "afterbegin",
      `<div class="popup__body">
                <div class="popup__content">
                <input type="text" placeholder="Title" class="popup__title" value=${title}>
                <input type="textarea" placeholder="Todo" class="popup__description" value=${description}>
                <div class="popup__footer">
                <select name="user" class="popup__user">
                <option>${user}</option>
                </select>
                <button class="popup__btn-add">add</button>
                 <button class="popup__btn-close">close</button>
                </div>
            </div>
         </div>`
    );
    wrapper.append(popup);
    return popup;
  }
  const createPopup = this.template()
  const popup = document.querySelector(".popup")
  const popupContent = document.querySelector(".popup__content")
  const popupBtnClose = document.querySelector(".popup__btn-close")
  const popupBody = document.querySelector(".popup__body")
  const popupBtnAdd = document.querySelector(".popup__btn-add")

  this.popupOpen = function () {
      createPopup.classList.add("open"),
      popupContent.classList.add("open-cont"),
      this.eventHandling(),
      getUsers()

  }

  this.popupClose = function () {
      popup.remove()

  }

    this.eventHandling = function () {
    createPopup.addEventListener("click", (event) => {
      if (event.target === popupBody) {
        this.popupClose()
      } else if (event.target === popupBtnAdd) {
        const data =  getDataLocalStorage().filter(item => item.id != popup.id)
        setDataLocalStorage(data)
        fillLocalStorage();
        renderCards( getDataLocalStorage());
        this.popupClose()
      } else if (event.target === popupBtnClose) {
        this.popupClose()
      }
    })
  }
}
 
//--------------------------------------------

const someObj = {id: "",title: "",description: "",user: "",}
btnAdd.addEventListener("click", () => {
new CreatePopup(someObj).popupOpen()
})


// plugins cards 

function CreateCard({id, title, description, user, time}) {

  const card = document.querySelector(".card");
  const cardContainerTodo = document.querySelector(".column-todo__card-container")
  const cardContainerProgress = document.querySelector(".column-progress__card-container");
  const cardContainerDone = document.querySelector(".column-done__card-container")
  const cardBtnDelete = document.querySelector(".card__btn-delete");
  const cardBtnComlete =document.querySelector(".card__btn-complete")
  const cardBtnProgress = document.querySelector(".card__btn-progress");
  const cardBtnEdit = document.querySelector(".card__btn-edit");
  const cardBtnBack = document.querySelector(".card__btn-back")

  this.template = function () {
    return `<div class="card" draggable="true" id="${id}">
    <h3 class="card__title">${title}</h3>
    <input disabled type="textarea" placeholder="Todo" class="card__description" value=${description}>
    <p class="card__user">${user}</p>
    <button class="card__btn-edit">EDIT</button>
    <button class="card__btn-back">BACK</button>
    <button class="card__btn-delete">DELETE</button>
    <button class="card__btn-complete">COMPLETE</button>
    <button class="card__btn-progress">></button>
    <div class="card__time">${time}</div>
    </div>`;
  }


  this.printCard = function (item) {
    const card = this.template();
    item.insertAdjacentHTML("afterbegin", card);
  };

  this.dragStart = function(e){
      cardContainerTodo.addEventListener("dragover", this.dragOver);
      cardContainerTodo.addEventListener("drop",this.dragDrop);
      cardContainerProgress.addEventListener("dragover",this.dragOver);
      cardContainerProgress.addEventListener("drop",this.dragDrop);
      cardContainerDone.addEventListener("dragover", this.dragOver);
      cardContainerDone.addEventListener("drop",this.dragDrop)
      console.log(e.target)
      setTimeout(()=>  e.target.classList.add("hidden"),0)
      this.dragDrop = function (event){
      if(event.target === cardContainerTodo ){
        event.target.append(e.target)
        console.log(e.target)
        const  data =  getDataLocalStorage()
        data.map((item) =>{
          if(item.id == e.target.id){
            item.classeCard = "todo"
            setDataLocalStorage(data);
            cardBtnEdit.classList.remove("hidden")
            cardBtnBack.classList.remove("show")
            cardBtnDelete.classList.remove("hidden")
            cardBtnComlete.classList.remove("show")
            cardBtnProgress.classList.remove("hidden")
          }
        })
      } else if(event.target === cardContainerProgress){
        event.target.append(e.target);
        console.log(e.target)
        const data =  getDataLocalStorage();
        data.map(item => {
          if (item.id == e.target.id) {
            item.classeCard = "progress"
          }
          setDataLocalStorage(data)
          cardBtnEdit.classList.add("hidden")
          cardBtnBack.classList.add("show")
          cardBtnDelete.classList.add("hidden")
          cardBtnComlete.classList.add("show")
          cardBtnProgress.classList.add("hidden")
        })
      } else if(event.target ===  cardContainerDone ){
        event.target.append(e.target);
        console.log(e.target)
        const data =  getDataLocalStorage()
        data.map(item => {
          if (item.id == e.target.id) {
            item.classeCard = "done"
            setDataLocalStorage(data)
            cardBtnBack.classList.remove("show")
            cardBtnComlete.classList.remove("show")
            cardBtnDelete.classList.remove("hidden")
          }
        })
      }
    }
   this.dragOver = function(event){
   event.preventDefault()
   } 
}

  this.dragEnd = function(event){
  event.target.classList.remove("hidden")
}


  this.addListeners = function () {
    const card = document.querySelector(".card");
    card.addEventListener("click", this.eventHandling);
    card.addEventListener("dragstart",this.dragStart);
    card.addEventListener("dragend", this.dragEnd);
};

  this.eventHandling = function (event) {
    if (event.target === cardBtnProgress) {
      cardContainerProgress.append(card);
      const data =  getDataLocalStorage();
      data.map((item) => {
        if (item.id == card.id) {
          item.classeCard = "progress"
        }
        setDataLocalStorage(data);
        cardBtnEdit.classList.add("hidden")
        cardBtnBack.classList.add("show")
        cardBtnDelete.classList.add("hidden")
        cardBtnComlete.classList.add("show")
        cardBtnProgress.classList.add("hidden")
      });
    } else if (event.target === cardBtnDelete) {
      card.remove();
      const data =  getDataLocalStorage().filter((item) => item.id != card.id);
      setDataLocalStorage(data);
    } else if (event.target === cardBtnEdit) {
      getDataLocalStorage().map((item) => {
        if (item.id == card.id) {
          new CreatePopup(item).popupOpen()
        }
      })
    } else if(event.target === cardBtnBack){
      cardContainerTodo.append(card);
      const data =  getDataLocalStorage()
      data.map(item => {
        if (item.id == card.id) {
          item.classeCard = "todo"
          setDataLocalStorage(data)
          cardBtnEdit.classList.remove("hidden")
          cardBtnBack.classList.remove("show")
          cardBtnDelete.classList.remove("hidden")
          cardBtnComlete.classList.remove("show")
          cardBtnProgress.classList.remove("hidden")
        }
      })
    } else if(event.target === cardBtnComlete){
      cardContainerDone.append(card);
      const data =  getDataLocalStorage();
      data.map(item => {
        if (item.id == card.id) {
          item.classeCard = "done"
        }
        setDataLocalStorage(data)
        cardBtnBack.classList.remove("show")
        cardBtnComlete.classList.remove("show")
        cardBtnDelete.classList.remove("hidden")
      })
    }
   }
  }


// fetch API

function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((response) => response.forEach(printUsers));
}

function printUsers({name,username}) {
  const listItem = document.createElement("option");
  const select = document.querySelector(".popup__user")
  listItem.textContent = `${name}, ${username}`;
  select.append(listItem);
}

// Local Storage 

function setDataLocalStorage(data) {
  localStorage.setItem("todos", JSON.stringify(data));
}

function getDataLocalStorage() {
  const data = JSON.parse(localStorage.getItem("todos"));
  if (data) {
    return data;
  }
  return [];
}

function TemplateLocalStorage(title, description, user) {
  this.id = Math.random();
  this.classeCard = "todo";
  this.title = title;
  this.description = description;
  this.user = user;
  this.time = new Date().toLocaleTimeString();
}

function fillLocalStorage() {
  const popupTitle = document.querySelector(".popup__title");
  const popupDescription = document.querySelector(".popup__description");
  const select = document.querySelector(".popup__user")
  const data =  getDataLocalStorage();
  const todoStorage = new TemplateLocalStorage(
    popupTitle.value,
    popupDescription.value,
    select.value
  );
  data.push(todoStorage);
  setDataLocalStorage(data);
  popupTitle.value = "";
  popupDescription.value = "";

}


// render

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
    } else if (item.classeCard === "done"){
      new CreateCard(item).printCard(cardContainerDone);
      new CreateCard(item).addListeners();
    }
  });
}

