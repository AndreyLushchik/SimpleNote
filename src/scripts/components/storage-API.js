// функции для работы  c Local storage Api
// set примает в себя данные для запонения хранилища.
// get возвращет данные из хранилища.

function setDataLocalStorage(data) {
    localStorage.setItem("todos", JSON.stringify(data));
  }
  
  function getDataLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todos"));
    return  data ?? []
  }

  export{setDataLocalStorage,getDataLocalStorage}