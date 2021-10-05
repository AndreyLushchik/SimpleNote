export function renderClock() {
  const clock = document.getElementById("clock");
  clock.textContent = getTime();
}

function getTime() {
  const time = new Date();
  return time.toLocaleTimeString();
}
