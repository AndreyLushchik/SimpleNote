
import{fillLocalStorage,renderCards} from "./../index.js";
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
        wrapper.append(createPopup)
        setTimeout(()=> createPopup.classList.add("open"),0)
        setTimeout(()=> popupContent.classList.add("open-cont"),0)
        this.eventHandling(),
        getUsers()
  
    }
  
    this.popupClose = function () {
      setTimeout(()=> createPopup.classList.remove("open"),0)
      setTimeout(()=> popupContent.classList.remove("open-cont"),0)
      setTimeout(()=> createPopup.remove(),800)
     
  
    }
  
      this.eventHandling = function () {
      createPopup.addEventListener("click", (event) => {
        if (event.target === popupBody) {
          this.popupClose()
        } else if (event.target === popupBtnAdd) {
          const data =  getDataLocalStorage().filter(item => item.id != createPopup.id)
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
   