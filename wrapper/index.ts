// TODO:
// - Detect if offline and display warning

import { configure, encode } from "queryparams";

interface Configuration {
  append: number[];
  backgroundColor: string;
  fontColor: string;
  fps: number[];
  nGram: number;
  textRange: number[];
  trim: number[];
}

const { params } = configure({
  edition_number: 0,
});

const DEFAULT_CONFIGURATION = {
  append: [1, 20],
  backgroundColor: "black",
  fontColor: "white",
  fps: [1, 30],
  nGram: 5,
  textRange: [0, 100],
  trim: [1, 5],
};

const configuration: Configuration =
  [
    DEFAULT_CONFIGURATION,
    {
      append: [1, 1],
      backgroundColor: "black",
      fontColor: "white",
      fps: [24, 24],
      nGram: 3,
      textRange: [0, 0.1],
      trim: [1, 1],
    },
    {
      append: [1, 1],
      backgroundColor: "black",
      fontColor: "white",
      fps: [20, 30],
      nGram: 5,
      textRange: [99.998, 100],
      trim: [1, 1],
    },
    {
      append: [1, 1],
      backgroundColor: "darkred",
      fontColor: "cyan",
      fps: [1, 10],
      nGram: 8,
      textRange: [0, 100],
      trim: [20, 20],
    },
    {
      append: [1, 1],
      backgroundColor: "white",
      fontColor: "black",
      fps: [1, 24],
      nGram: 5,
      textRange: [22, 22.002],
      trim: [1, 1],
    },
    {
      append: [1, 3],
      backgroundColor: "yellow",
      fontColor: "black",
      fps: [1, 30],
      nGram: 5,
      textRange: [44, 49.002],
      trim: [10, 10],
    },
    {
      append: [1, 10],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 30],
      nGram: 2,
      textRange: [44, 49.002],
      trim: [10, 10],
    },
  ][params.edition_number] || DEFAULT_CONFIGURATION;

const src = `https://in-tongues.work.damonzucconi.com/?${encode(
  configuration
)}`;

const root = document.getElementById("root")!;

// Check if offline
if (window.navigator.onLine === false) {
  root.innerHTML = `
      <h1>Currently offline. Please check your internet connection.</h1>
  `;
  throw new Error("Offline");
}

const iframe = document.createElement("iframe");
iframe.src = src;

root.appendChild(iframe);
