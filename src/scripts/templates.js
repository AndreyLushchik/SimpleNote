import {getStorageData, setStorageData} from './api.js'

function createElement(tag, className, text = " ") {
    const element = document.createElement(tag);
    element.className = className;
    const textElement = document.createTextNode(text);
    element.append(textElement);
    return element;
  }

  //Create card
  // function createCard(todo){
  //   let card = createElement('div', 'todo-card');
  //   let leftSide= createElement("div", "left-side");
  //   let title = createElement('h5', "title", 'Title');
  //   let todoText = createElement('span', 'todo-text', "lorem....")
  //   let todoUser = createElement('span', 'todo-user', 'UserName')
  //   leftSide.setAttribute("id", "Search")
  //   let editBtn = createElement('button', ' ')
  //   editBtn.setAttribute("id", "edit")
  //   let deleteBtn = createElement('button', "  " )
  //   deleteBtn.setAttribute("id", "delete-card")
  //   let controlBlock = createElement('div', "control-button" )
  //   let faPen = createElement ("i", "fas-fa-pen", "✎")
  //   let faTrash = createElement ("i", "fas-fa-trash-alt" , "x")
  //   let nexFa = createElement ('button', "next fas fa-chevron-right")
  //   let date = createElement ('div', "create-time", todo.date) 

  //   let rightSide= createElement("div", "right-side");
    
  //   deleteBtn.append(faTrash)
  //   editBtn.append(faPen)
  //   controlBlock.append(editBtn, deleteBtn)
  //   card.append(leftSide, rightSide);
  //   leftSide.append(title, todoText, todoUser)
  //   rightSide.append(controlBlock, nexFa, date)
  //   document.querySelector(".todo-content-card").appendChild(card);
  //   return card
  // }
  
  
//Create card
function createCard(todo){
  let card = createElement('div', 'todo-card');
  left()
 
  card.append(left(), right());
  document.querySelector(".todo-content-card").append(card);
  return card
}

function left(){
  let leftSide= createElement("div", "left-side");
  let title = createElement('h5', "title", 'Title');
  let todoText = createElement('span', 'todo-text', "lorem....")
  let todoUser = createElement('span', 'todo-user', 'UserName')
  leftSide.append(title, todoText, todoUser)
  leftSide.setAttribute("id", "Search")
  return leftSide
}

function right(todo){
  let rightSide= createElement("div", "right-side");
  let editBtn = createElement('button', ' ')
  editBtn.setAttribute("id", "edit")
  let deleteBtn = createElement('button', "  " )
  deleteBtn.setAttribute("id", "delete-card")
  let controlBlock = createElement('div', "control-button" )
  let faPen = createElement ("i", "fas-fa-pen", "✎")
  let faTrash = createElement ("i", "fas-fa-trash-alt" , "x")
  deleteBtn.append(faTrash)
  editBtn.append(faPen)
  controlBlock.append(editBtn, deleteBtn)
  let nexFa = createElement ('button', "next fas fa-chevron-right")
  let date = createElement ('div', "create-time", date) //???
  rightSide.append(controlBlock, nexFa, date)
  return rightSide
}



function showAllTodo() {
  document.querySelector('.discription-header').innerHTML = `Todo: ${getStorageData().length}`
}
  export {createCard, showAllTodo};