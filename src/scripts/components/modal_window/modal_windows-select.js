function getUser() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((response) => printUser(response));
}

function printUser(users) {
  const printArea = document.querySelector("#select");
  const list = document.createElement("select");
  printArea.append(list);
  users.forEach((users) => {
    const point = document.createElement("option");
    list.append(point);
    point.textContent = `${users.name}. ${users.username}`;
  });
}
getUser();

export { getUser };
