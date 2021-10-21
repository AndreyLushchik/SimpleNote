
//Шаблон для создания обькта с данными которые храняться в Local storag

export class LocalStorage {
  constructor(title, description, user) {
    this.id = Math.floor(Math.random() * 100_000)
    this.classCard = "todo"
    this.title = title
    this.description = description
    this.user = user
    this.time = new Date().toLocaleTimeString()
  }
}