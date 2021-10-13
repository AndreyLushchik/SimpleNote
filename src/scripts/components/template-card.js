
import{setDataLocalStorage,getDataLocalStorage} from "./local-storage.js";
import{CreatePopup} from "./template-popup";
import{renderCards, showTodoProgress, showTodoDone, showTodo} from "./../index";


export function CreateCard({id, title, description, user, time}) {

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

  this.addListeners = function () {
    const card = document.querySelector(".card");
    card.addEventListener("click", this.eventHandling);
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
        showTodo()
        showTodoProgress()
      });
    } else if (event.target === cardBtnDelete) {
      renderCards()
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
      showTodo()
      showTodoProgress()
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
      showTodoDone()
      showTodoProgress()
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