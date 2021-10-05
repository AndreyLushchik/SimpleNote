 export function getClock() {
        const clock = document.getElementById("clock");
        clock.textContent = renderClock()
 }

 function renderClock() {
        let now = new Date();
        now = now.toLocaleTimeString();
        return now
 }