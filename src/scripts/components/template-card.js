
import{asynchronous } from "../index.js";
import{setDataLocalStorage,getDataLocalStorage} from "./local-storage.js";
import{CreatePopup} from "./template-popup";


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
    const card = document.querySelectorAll(".card");
    card.forEach(item => {
      item.addEventListener("click", this.eventHandling);
      item.addEventListener("dragstart",this.dragStart);
      item.addEventListener("dragend", this.dragEnd);
    })
};
 

this.eventHandling = function (event) {
  switch(event.target){
 case cardBtnProgress:
 cardContainerProgress.append(card)
 const addProgressClass = getDataLocalStorage()
 addProgressClass.map(item => (item.id == card.id) && (item.classeCard = "progress") )
     setDataLocalStorage(addProgressClass )
     cardBtnEdit.classList.add("hidden")
     cardBtnBack.classList.add("show")
     cardBtnDelete.classList.add("hidden")
     cardBtnComlete.classList.add("show")
     cardBtnProgress.classList.add("hidden")  
     break;
  case cardBtnDelete:
   card.remove();
   const deleteData = getDataLocalStorage().filter( item  => item.id != card.id);
   setDataLocalStorage(deleteData)
   break;
   case cardBtnEdit: 
   getDataLocalStorage().map(item => item.id == card.id && new CreatePopup(item).popupOpen())
   break;
   case cardBtnBack:
   cardContainerTodo.append(card);
   const addTodoClass = getDataLocalStorage()
   addTodoClass.map(item => (item.id == card.id) && (item.classeCard = "todo"))
     setDataLocalStorage(addTodoClass)
     cardBtnEdit.classList.remove("hidden")
     cardBtnBack.classList.remove("show")
     cardBtnDelete.classList.remove("hidden")
     cardBtnComlete.classList.remove("show")
     cardBtnProgress.classList.remove("hidden")
     break;
   case cardBtnComlete:
   cardContainerDone.append(card);
   const addDoneClass = getDataLocalStorage()
   addDoneClass.map(item =>(item.id == card.id) && (item.classeCard = "done"))
   setDataLocalStorage(addDoneClass)
   cardBtnBack.classList.remove("show")
   cardBtnComlete.classList.remove("show")
   cardBtnDelete.classList.remove("hidden")
   break;
 }
}

  // drag drop

  this.dragStart = function(card){
          const drop = document.querySelectorAll(".drop")
          drop.forEach(item =>{
            item.addEventListener("dragover", this.dragOver)
            item.addEventListener("dragenter", this.dragEnter)
            item.addEventListener("dragleave", this.dragLeave)
            item.addEventListener("drop",this.dragDrop)
          })
          asynchronous(0).then(()=> card.target.style.display = "none")

          this.dragDrop = function (event){
          if(event.target === cardContainerTodo ){
          
            //event.target.append(card.target)
            console.log(card.target)
            const  data =  getDataLocalStorage()
            data.map((item) =>{
              if(item.id == card.target.id){
                item.classeCard = "todo"
              
              }
              setDataLocalStorage(data);
           
              card.target.style.background = "blue"
              cardBtnEdit.classList.remove("hidden")
              cardBtnBack.classList.remove("show")
              cardBtnDelete.classList.remove("hidden")
              cardBtnComlete.classList.remove("show")
              cardBtnProgress.classList.remove("hidden")
              event.target.append(card.target)
            })
          } else if(event.target === cardContainerProgress){
           
            //event.target.append(card.target)
            console.log(card.target)
            const data =  getDataLocalStorage();
            data.map(item => {
              if (item.id == card.target.id) {
                item.classeCard = "progress"

              }
              setDataLocalStorage(data)
             
              card.target.style.background = "green"
              cardBtnEdit.classList.add("hidden")
              cardBtnBack.classList.add("show")
              cardBtnDelete.classList.add("hidden")
              cardBtnComlete.classList.add("show")
              cardBtnProgress.classList.add("hidden")
              event.target.append(card.target)
            })
          } else if(event.target ===  cardContainerDone ){
           
            //event.target.append(card.target)
            console.log(card.target)
            const data =  getDataLocalStorage()
            data.map(item => {
              if (item.id == card.target.id) {
                item.classeCard = "done"
               
              }
              setDataLocalStorage(data)
           
              card.target.style.background = "red"
              cardBtnBack.classList.remove("show")
              cardBtnComlete.classList.remove("show")
              cardBtnDelete.classList.remove("hidden")
              event.target.append(card.target)
            })
          }
        }
       this.dragOver = function(event){
       event.preventDefault()
       } 
       this.dragEnter = function(event){
  
       event.target.classList.add("drag-enter")
       }
       this.dragLeave = function(event){
        event.target.classList.remove("drag-enter")
      }
    }
    
      this.dragEnd = function(event){
      event.target.style.display = "block"
    }
    
  //---------------------------------------------------------
  }
