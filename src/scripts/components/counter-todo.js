import { getDataLocalStorage } from "./local-storage.js";
function todoCounter() {
    const cardData = getDataLocalStorage()
    let countTodo = 0
    let countDone = 0
    let countProgress = 0
    if (cardData) {cardData.filter(count => {
      switch (count.classeCard) {
        case "todo":
          ++countTodo
        break
        case 'done':
          ++countDone
          break
        case 'progress':
          ++countProgress
          break
        default:
          break
      }
    })
  }else{
    countProgress, countTodo, countDone = 0, 0, 0
  }
    return [countTodo, countProgress, countDone]
  }
export function printCounter() {
    const [todo, progress, done] = todoCounter()
    const printTodo = document.querySelector('.column-todo__title').innerHTML = `Todo: <span>${todo}</span>`;
    const printProgress = document.querySelector('.column-progress__title').innerHTML = `In progress: <span>${progress}</span>`;
    const printDone = document.querySelector('.column-done__title').innerHTML = `Done: <span>${done}</span>`;
}