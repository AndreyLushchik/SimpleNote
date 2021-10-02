function getStorageData () {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos) {
      return todos
    }
    return []
  }
  
  function setStorageData (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

export {getStorageData, setStorageData}
  