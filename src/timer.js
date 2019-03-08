const TinyTimer = require("tiny-timer");

let timer = null;
let ticks = {};

const callTicks = () => Object.keys(ticks).forEach(key => ticks[key]());

function start(duration, callback) {
  if (timer === null) {
    timer = new TinyTimer();
    timer.on("done", () => {
      stop(); // So a new timer can be started
      callback();
    });
    timer.on("tick", () => {
      callTicks();
    });

    timer.start(duration);
  }
}

function stop() {
  if (timer !== null) {
    timer.stop();
    timer = null;

    // Tick everything one last time with the timer gone
    callTicks();
    ticks = {};
  }
}

function active() {
  return timer !== null && timer.status === "running";
}

function pause() {
  if (timer !== null) {
    timer.pause();
  }
}

function resume() {
  if (timer !== null) {
    timer.resume();
  }
}

function timeLeft() {
  return (timer !== null && timer.status === "running" ? timer.time : 0) / 1000;
}

function update(key, callback) {
  if (timer !== null && !ticks[key]) {
    ticks[key] = callback;
  }
}

exports.start = start;
exports.stop = stop;
exports.active = active;
exports.pause = pause;
exports.resume = resume;
exports.timeLeft = timeLeft;
exports.update = update;
