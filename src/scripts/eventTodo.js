import {getStorageData, setStorageData} from './api.js'
import {createCard, showAllTodo} from './templates.js'
import {renderTodos} from './render.js'

function onCard(event) {
    const { target } = event;
    if (target.id === "delete-card") {  
      console.log('hi')
      const todos = getStorageData().filter((card) => card.id == this.id);
      setStorageData(todos);
      renderTodos();
      showAllTodo()
  } 
}

  export{onCard}