import { nGram } from "n-gram";
import { FrameInterval } from "frame-interval";
import { ambient } from "audiate";
import { audio } from "./audio";
// @ts-ignore
import data from "bundle-text:./data/pg7178.txt";

const ROOT = document.getElementById("root")!;

const CONFIG = {
  nGram: 5,
  fps: 5,
  append: 100,
  trim: 100,
};

const ngrams = nGram(CONFIG.nGram)(data);

const range = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const random = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const append = (n: number) => {
  audio.type.play();

  ROOT.innerHTML += new Array(n)
    .fill(0)
    .map(() => {
      const word = random(ngrams);
      return `<span>${word}</span>`;
    })
    .join("");
};

const trim = (n: number) => {
  audio.backspace.play();

  for (var i = 0; i < n; i++) {
    ROOT.removeChild(ROOT.childNodes[0]);
  }
};

const getLineHeight = () => {
  const style = window.getComputedStyle(ROOT);

  return parseFloat(style.lineHeight);
};

const isOverflowing = () =>
  document.body.offsetHeight + getLineHeight() * 2 > window.innerHeight;

const prefillScreen = () => {
  while (!isOverflowing()) {
    append(100);
  }

  // Trim until we're not overflowing
  while (isOverflowing()) {
    trim(CONFIG.trim);
  }
};

let runner: FrameInterval | null = null;

const decider = new FrameInterval(1, () => {
  if (runner) {
    runner.stop();
  }

  runner = new FrameInterval(range(1, 30), () => {
    isOverflowing() ? trim(range(1, 5)) : append(range(1, 20));
  });

  runner.start();
});

prefillScreen();

const init = () => {
  ambient();

  decider.start();
};

init();
