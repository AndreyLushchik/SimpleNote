/*window.addEventListener('DOMContentLoaded',() =>{
  window.setInterval(function(){
  let now = new Date();
  let clock = document.getElementById("clock");
  clock.innerHTML = now.toLocaleTimeString();
  },1000);
});*/
import {clock} from './clock.js'
import {getStorageData, setStorageData} from './api.js'
import {createCard, showAllTodo} from './templates.js'
import {renderTodos} from './render.js'
import {Todo} from './Todo.js'
import {onCard} from './eventTodo.js'

renderTodos();
setInterval(clock, 1000);

const todo = document.getElementById('todo')
todo.addEventListener("click", (e) => {
  const {target} = e
  if  (target.id === "add") {
    createCard(todo)
    const input = target.previousElementSibling
    const newTodo = new Todo(input.value)
    const todos = getStorageData()
    todos.push(newTodo)
    setStorageData(todos)
    renderTodos(target.nextElementSibling)
    showAllTodo()
    input.value = ''
  }
}); 
