import {getStorageData, setStorageData} from './api.js'
import {createCard} from './templates.js'
import {onCard} from './eventTodo.js'
import {showAllTodo} from './templates.js'

function renderTodos(){
    const main = document.querySelector(".todo-content-card");
    main.innerHTML = " "
    getStorageData().forEach(todo => {
      const card = createCard(todo)
      card.addEventListener('click', onCard)
      main.append(card)
      showAllTodo()
    });
  }
  
export {renderTodos}