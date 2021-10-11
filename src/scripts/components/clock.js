export function renderTime() {
    const clock = document.querySelector(".header__clock");
    let time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
setInterval(renderTime, 1000);


