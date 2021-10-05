function Todo(text){
    this.id = Math.random().toString()
    this.text = text 
    this.date = new Date().toLocaleTimeString();
}
 
export {Todo}