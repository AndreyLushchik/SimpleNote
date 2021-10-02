export function Todo(text){
    this.id = Math.random()
    this.text = text 
    this.date = new Date().toDateString();
  }
  