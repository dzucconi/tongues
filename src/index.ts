import { nGram } from "n-gram";
import { FrameInterval } from "frame-interval";
import { ambient } from "audiate";
import { audio } from "./audio";
import { configure } from "queryparams";

// @ts-ignore
import data from "bundle-text:./data/pg7178.txt";

const ROOT = document.getElementById("root")!;

type Tuple = [number, number];

const { params, reconfigure } = configure<{
  append: Tuple;
  backgroundColor: string;
  fontColor: string;
  fps: Tuple;
  nGram: number;
  textRange: Tuple;
  trim: Tuple;
}>({
  append: [1, 20], // Range of ngrams to append
  backgroundColor: "black",
  fontColor: "white",
  fps: [1, 30], // Range of FPS
  nGram: 5, // N-gram size
  textRange: [0, 100], // Start/stop percentage of text to use for n-grams // [99.995, 100]
  trim: [1, 5], // Range of ngams to remove
});

// @ts-ignore
window.reconfigure = reconfigure;

const textWindow = (text: string, [startPercentage, endPercentage]: Tuple) => {
  const start = Math.floor(text.length * (startPercentage / 100));
  const end = Math.floor(text.length * (endPercentage / 100));
  return text.substring(start, end);
};

const ngrams = nGram(params.nGram)(textWindow(data, params.textRange));

const range = ([min, max]: Tuple) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const random = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const append = (n: number) => {
  audio.type.play();

  for (var i = 0; i < n; i++) {
    const word = random(ngrams);
    const span = document.createElement("span");
    span.textContent = word;
    ROOT.appendChild(span);
  }
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

const init = () => {
  document.body.style.backgroundColor = params.backgroundColor;
  document.body.style.color = params.fontColor;

  // Fill until overflowing
  while (!isOverflowing()) {
    append(100);
  }

  // Trim until we're not overflowing
  while (isOverflowing()) {
    trim(20);
  }
};

let runner: FrameInterval | null = null;

const decider = new FrameInterval(1, () => {
  if (runner) {
    runner.stop();
  }

  runner = new FrameInterval(range(params.fps), () => {
    isOverflowing() ? trim(range(params.trim)) : append(range(params.append));
  });

  runner.start();
});

init();

const start = () => {
  ambient();

  decider.start();
};

start();
