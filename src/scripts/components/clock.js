

  export function getCurrentTime() {
      let time = new Date().toLocaleTimeString();
      showClock(time)
  }

  function showClock(time) {
      const clock = document.querySelector(".header__clock")
      clock.innerText = time;
  }




