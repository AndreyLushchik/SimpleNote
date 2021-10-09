import { getData, setData } from "./API";

function CreateCard({ id, title, description, user, time }) {
    this.template = function () {
        return `<div class="card" draggable="true" id="${id}">
         <h3 class="card__title">${title}</h3>
         <p class="card__description">${description}</p>
         <p class="card__user">${user}</p>
         <button class="card__btn-edit">EDIT</button>
         <button class="card__btn-delete">DELETE</button>
         <button class="card__btn-progress">></button>
         <div class="card__time">${time}</div>
         </div>`;
    };

    const cardd = document.querySelector(".card");
    const cardContainerProgress = document.querySelector(
        ".column-progress__card-container"
    );
    const cardBtnDelete = document.querySelector(".card__btn-delete");
    const cardBtnProgress = document.querySelector(".card__btn-progress");
    const cardBtnEdit = document.querySelector(".card__btn-edit");

    this.printCard = function (item) {
        const card = this.template();
        item.insertAdjacentHTML("afterbegin", card);
    };

    this.listener = function () {
        const cardListener = document.querySelector(".card");
        cardListener.addEventListener("click", this.addListener);
    };

    this.addListener = function (event) {
        if (event.target === cardBtnProgress) {
            cardContainerProgress.append(cardd);
            let data = getData();
            data.forEach((item) => {
                item.classeCard = "progress"
                setData(data);
            });
            //setData(data);
        } else if (event.target === cardBtnDelete) {
            cardd.remove();
            const data = getData().filter((item) => item.id != cardd.id);
            setData(data);
        }
    };
    console.log(this);
}


function TodoStorage(title, description, user) {
    this.id = Math.floor((Math.random()) * 300000);
    this.classeCard = "todo";
    this.title = title;
    this.description = description;
    this.user = user;
    this.time = new Date().toLocaleTimeString();
}

export { TodoStorage, CreateCard }