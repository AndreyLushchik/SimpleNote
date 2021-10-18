
// данная функция получает данные с пользователями с сервера, обрабатывает и возвращет promise

import{printUsers} from "./../index.js";

export function getUsers() {
      return new Promise((resolve) =>
      fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((response) => response.forEach(printUsers))
      .then(() => resolve())
      .catch(e => console.log(`Error! ${e}`))
      )
  }

