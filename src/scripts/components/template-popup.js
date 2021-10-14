
import{fillLocalStorage,renderCards,asynchronous} from "./../index.js";
import{getUsers} from "./fetch-API";
import{setDataLocalStorage,getDataLocalStorage} from "./local-storage.js";

export function CreatePopup({id,title,description,user}) {

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
   return popup;
  }
  const wrapper = document.querySelector(".wrapper")
  const createPopup = this.template()
  wrapper.append(createPopup)
  const popupContent = document.querySelector(".popup__content")
  const popupBtnClose = document.querySelector(".popup__btn-close")
  const popupBody = document.querySelector(".popup__body")
  const popupBtnAdd = document.querySelector(".popup__btn-add")

  this.popupOpen = function () {
    asynchronous(0).then(()=> createPopup.classList.add("open"))
    asynchronous(0).then(()=> popupContent.classList.add("open-cont"))
      this.eventHandling(),
      getUsers()
}

  this.popupClose = function () {
    asynchronous(0).then(()=> createPopup.classList.remove("open"))
    asynchronous(0).then(()=> createPopup.classList.remove("open-cont"))
    asynchronous(800).then(()=> createPopup.remove())
   }

  this.eventHandling = function () {
    createPopup.addEventListener("click", (event) => {
        switch (event.target) {
        case  popupBody:
        this.popupClose()
        break;
        case popupBtnAdd:
        const data =  getDataLocalStorage().filter(item => item.id != createPopup.id)
        setDataLocalStorage(data)
        fillLocalStorage()
        const storageData = getDataLocalStorage()
        renderCards(storageData);
        this.popupClose()
        break;
        case popupBtnClose: 
        this.popupClose()
        break;
      }
    })
  }
}
 