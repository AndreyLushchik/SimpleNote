
export   function TemplateLocalStorage(title, description, user) {
    this.id = Math.random();
    this.classeCard = "todo";
    this.title = title;
    this.description = description;
    this.user = user;
    this.time = new Date().toLocaleTimeString();
  }