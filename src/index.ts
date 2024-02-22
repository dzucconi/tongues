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
  nGram: number;
  fps: Tuple;
  trim: Tuple;
  append: Tuple;
}>({
  nGram: 5,
  fps: [1, 30],
  trim: [1, 5],
  append: [1, 20],
});

// @ts-ignore
window.reconfigure = reconfigure;

const ngrams = nGram(params.nGram)(data);

const range = ([min, max]: Tuple) => {
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

prefillScreen();

const init = () => {
  ambient();

  decider.start();
};

init();
