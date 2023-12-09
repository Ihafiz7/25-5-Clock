import "./styles.css";

const TWEMTY_FIVE_MINUTES = 25 * 60;
const FIVE_MINUTES = 5 * 60;

let bsl = 5 * 60;
let sl = 25 * 60;
let isSessionMode = true;
let sTime;
let breakTimer;

const bslMinus = document.getElementById("bsl-minus");
const bslSpan = document.getElementById("bsl-span");
const bslAdd = document.getElementById("bsl-add");
const slMinus = document.getElementById("sl-minus");
const slSpan = document.getElementById("sl-span");
const slAdd = document.getElementById("sl-add");
const timeMinutes = document.getElementById("time-minutes");
const timeSeconds = document.getElementById("time-seconds");
const sPlay = document.getElementById("s-play");
const sPause = document.getElementById("s-pause");
const sReset = document.getElementById("s-reset");
const seTitle = document.getElementById("se-title");

bslMinus.addEventListener("click", () => {
  if (bsl - 60 === 0) {
    return;
  }
  bsl -= 60;
  bslSpan.textContent = bsl / 60;
});

bslAdd.addEventListener("click", () => {
  bsl += 60;
  bslSpan.textContent = bsl / 60;
});

slMinus.addEventListener("click", () => {
  if (sl - 60 === 0) {
    return;
  }
  sl -= 60;
  slSpan.textContent = sl / 60;
  if (isSessionMode) {
    timeMinutes.textContent = sl / 60;
  }
});

slAdd.addEventListener("click", () => {
  sl += 60;
  slSpan.textContent = sl / 60;
  if (isSessionMode) {
    timeMinutes.textContent = sl / 60;
  }
});

function updateTime(length) {
  if (Math.floor(length / 60).toString().length === 1) {
    timeMinutes.textContent = "0" + Math.floor(length / 60);
  } else {
    timeMinutes.textContent = Math.floor(length / 60);
  }

  if ((length % 60).toString().length === 1) {
    timeSeconds.textContent = "0" + (length % 60);
  } else {
    timeSeconds.textContent = length % 60;
  }
}

sPlay.addEventListener("click", () => {
  if (isSessionMode) {
    startSession();
  } else {
    startBreak();
  }
});

sPause.addEventListener("click", () => {
  if (isSessionMode) {
    clearInterval(sTime);
  }
});

sReset.addEventListener("click", () => {
  reset();
});

function reset() {
  isSessionMode = true;
  bsl = FIVE_MINUTES;
  sl = TWEMTY_FIVE_MINUTES;
  bslSpan.textContent = FIVE_MINUTES / 60;
  slSpan.textContent = TWEMTY_FIVE_MINUTES / 60;
  clearInterval(sTime);
  timeMinutes.textContent = TWEMTY_FIVE_MINUTES / 60;
  timeSeconds.textContent = "00";
}

function startBreak() {
  clearInterval(sTime);
  isSessionMode = false;
  seTitle.textContent = "Break";
  breakTimer = setInterval(() => {
    bsl -= 1;
    updateTime(bsl);
    if (bsl === 0) {
      sl = parseInt(slSpan.textContent, 10) * 60;
      updateTime(sl);
      startSession();
    }
  }, 1000);
}

function startSession() {
  clearInterval(breakTimer);
  isSessionMode = true;
  seTitle.textContent = "Session";
  sTime = setInterval(() => {
    sl -= 1;
    updateTime(sl);
    if (sl === 0) {
      bsl = parseInt(bslSpan.textContent, 10) * 60;
      updateTime(bsl);
      startBreak();
    }
  }, 1000);
}
