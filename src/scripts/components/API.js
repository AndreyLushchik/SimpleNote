// fetch API
function getUsers() {
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((response) => response.forEach(printUsers))
}

function printUsers({ name, username }) {
    const select = document.querySelector(".popup__user");
    const listItem = document.createElement("option");
    listItem.textContent = `${name}, ${username}`;
    select.append(listItem);
}

// local

function setData(data) {
    localStorage.setItem("todos", JSON.stringify(data));
}
function getData() {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (data) {
        return data;
    }
    return [];
}


export { getUsers, printUsers, setData, getData }