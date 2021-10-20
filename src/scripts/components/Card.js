
// шаблон для динамического создания карточек. Конструктор как аргумент принимает обьект с данными,
// из local storage для сохранения дел после перезагрузки страницы. А так же background-color и массив для динамического создания кнопок.
// в данном классе реализованы методы динамического создания карточки. Добавления ее в DOM дерево,
// динамического добавления слушателя событий на карточку для взаимодействия с ее кнопками и реализации Drag & Drop.

import { renderCards, asynchronous, popupBtnNone, renderCounter } from "./../index.js";
import { setDataLocalStorage, getDataLocalStorage } from "./storage-API.js";
import { PopupSmall, Popup } from "./Popup.js";

export class Card {

    constructor({ id, title, description, user, time }, [btn], column) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.user = user;
        this.time = time;
        this.btn = btn;
        this.column = column
    }

    createCard() {
        return `<div class="card" draggable="true" id="${this.id}">
        <h3 class="card__title">${this.title}</h3>
        <input disabled type="textarea" placeholder="Todo" class="card__description" value=${this.description}>
        <p class="card__user">${this.user}</p>
        <div class="card__time">${this.time}</div>
        </div>`;
    }

    addCard() {
        this.column.insertAdjacentHTML("afterbegin", this.createCard());
        this.createBtn()
        this.addListenerCard()
        this.dragAndDrop()

    }

    addListenerCard() {
        const card = document.querySelector(".card")
        const cardBtnProgress = document.querySelector(".card__btn-progress")
        const cardBtnDelete = document.querySelector(".card__btn-delete")
        const cardBtnEdit = document.querySelector(".card__btn-edit")
        const cardBtnBack = document.querySelector(".card__btn-back")
        const cardBtnComlete = document.querySelector(".card__btn-complete")

        document.addEventListener("click", (event) => {
            switch (event.target) {
                case cardBtnProgress:
                    const lengthProgresse = getDataLocalStorage().filter(item => item.classCard === "progress")
                    if (lengthProgresse.length >= 5) {
                        const popup = new PopupSmall({}, "it is necessary to finish the things started", [popupBtnNone])
                        popup.popupOpen()
                        break;
                    } else {
                        const addProgressClass = getDataLocalStorage()
                        addProgressClass.find(item => (item.id == card.id) && (item.classCard = "progress"))
                        setDataLocalStorage(addProgressClass)
                        renderCards(addProgressClass)
                        break;
                    }
                case cardBtnDelete:
                    card.remove();
                    const deleteData = getDataLocalStorage().filter(item => item.id != card.id)
                    setDataLocalStorage(deleteData)
                    renderCounter(".column-todo__title", "Todo", "todo")
                    renderCounter(".column-progress__title", "In Progress", "progress")
                    renderCounter(".column-done__title", "Done", "done")
                    break;
                case cardBtnEdit:
                    getDataLocalStorage().find(item => {
                        if (item.id == card.id) {
                            const popup = new Popup(item)
                            popup.popupOpen()
                        }
                    })
                    break;
                case cardBtnBack:
                    const addTodoClass = getDataLocalStorage()
                    addTodoClass.find(item => (item.id == card.id) && (item.classCard = "todo"))
                    setDataLocalStorage(addTodoClass)
                    renderCards(addTodoClass)
                    break;
                case cardBtnComlete:
                    const addDoneClass = getDataLocalStorage()
                    addDoneClass.find(item => (item.id == card.id) && (item.classCard = "done"))
                    setDataLocalStorage(addDoneClass)
                    renderCards(addDoneClass)
                    break;
            }
        })
    }

    dragAndDrop() {
        const card = document.querySelector(".card")
        const cardContainerTodo = document.querySelector(".column-todo__card-container")
        const cardContainerProgress = document.querySelector(".column-progress__card-container");
        const cardContainerDone = document.querySelector(".column-done__card-container")
        card.addEventListener("dragstart", (event) => {
            const drop = document.querySelectorAll(".drop")
            drop.forEach(item => {
                item.addEventListener("dragover", (event) => {
                    event.preventDefault()
                })
                item.addEventListener("dragenter", (event) => {
                    event.target.classList.add("drag-enter")
                })
                item.addEventListener("dragleave", (event) => {
                    event.target.classList.remove("drag-enter")
                })
                item.addEventListener("drop", (event) => {
                    switch (event.target) {
                        case cardContainerTodo:
                            const addClassTodo = getDataLocalStorage()
                            addClassTodo.find(item => (item.id == card.id) && (item.classCard = "todo"))
                            setDataLocalStorage(addClassTodo)
                            renderCards(addClassTodo)
                            break;
                        case cardContainerProgress:
                            const addProgressClass = getDataLocalStorage()
                            addProgressClass.find(item => item.id == card.id && (item.classCard = "progress"))
                            setDataLocalStorage(addProgressClass)
                            renderCards(addProgressClass)
                            break;
                        case cardContainerDone:
                            const addClasseDone = getDataLocalStorage()
                            addClasseDone.find(item => (item.id == card.id) && (item.classCard = "done"))
                            setDataLocalStorage(addClasseDone)
                            renderCards(addClasseDone)
                            break;
                    }
                })
            })
            asynchronous(0).then(() => event.target.style.display = "none")
        })
        card.addEventListener("dragend", (event) => {
            event.target.style.display = "block"
        })
    }




    createBtn() {
        const card = document.querySelectorAll(".card")
        this.btn.forEach(item => {
            const btn = document.createElement("button")
            btn.id = this.id
            btn.className = item.class
            btn.textContent = item.text
            card.forEach(item => item.id == btn.id && item.append(btn))
        })
    }
}




