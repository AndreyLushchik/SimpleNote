/*window.addEventListener('DOMContentLoaded',() =>{
  window.setInterval(function(){
  let now = new Date();
  let clock = document.getElementById("clock");
  clock.innerHTML = now.toLocaleTimeString();
  },1000);
});*/
import {clock} from './clock.js'
import {getStorageData, setStorageData} from './api.js'
import {createCard} from './templates.js'
// import {renderTodos} from './render.js'
import {Todo} from './Todo.js'

renderTodos();
setInterval(clock, 1000);


const todo = document.getElementById('todo')
todo.addEventListener("click", (e) => {
  const {target} = e
  if (target.id === "add") {
    createCard(todo)
    const input = target.previousElementSibling
    const todo = new Todo(input.value)
    const todos = getStorageData()
    todos.push(todo)
    setStorageData(todos)
    renderTodos(target.nextElementSibling)
    input.value = ''
  } 
}); 

function renderTodos(){
  const main = document.querySelector(".todo-content-card");
  main.innerHTML = " "
  getStorageData().forEach(todo => {
    const card = createCard(todo)
    // card.addEventListener('click', onCard)
    main.append(card)
  });
}

function onCard(event) {
  const { target } = event;
  if (this.id === "delete-card") {
    setStorageData(todos);
    renderTodos();
}}
