// TODO:
// - Detect if offline and display warning

import { configure, encode } from "queryparams";

export const init = () => {
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

  const configurations: Configuration[] = [
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
      backgroundColor: "red",
      fontColor: "white",
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
    {
      append: [1, 10],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 40],
      nGram: 6,
      textRange: [6, 6.002],
      trim: [10, 10],
    },
    {
      append: [1, 2],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 10],
      nGram: 8,
      textRange: [82, 82.005],
      trim: [1, 1],
    },
    {
      append: [1, 2],
      backgroundColor: "blue",
      fontColor: "white",
      fps: [1, 30],
      nGram: 5,
      textRange: [10, 30],
      trim: [1, 10],
    },
    {
      append: [1, 1],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 30],
      nGram: 5,
      textRange: [20, 50],
      trim: [20, 20],
    },
    {
      append: [1, 2],
      backgroundColor: "black",
      fontColor: "white",
      fps: [24, 30],
      nGram: 3,
      textRange: [51, 51.001],
      trim: [2, 2],
    },
    {
      append: [10, 10],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 24],
      nGram: 9,
      textRange: [0, 100],
      trim: [30, 30],
    },
    {
      append: [1, 5],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 24],
      nGram: 5,
      textRange: [1, 1.001],
      trim: [1, 10],
    },
    {
      append: [1, 3],
      backgroundColor: "white",
      fontColor: "black",
      fps: [1, 24],
      nGram: 5,
      textRange: [0.03, 0.035],
      trim: [1, 5],
    },
    {
      append: [1, 3],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 24],
      nGram: 5,
      textRange: [0.04, 0.05],
      trim: [1, 5],
    },
    {
      append: [1, 1],
      backgroundColor: "red",
      fontColor: "white",
      fps: [1, 10],
      nGram: 7,
      textRange: [0.03, 1],
      trim: [25, 50],
    },
    {
      append: [1, 1],
      backgroundColor: "yellow",
      fontColor: "black",
      fps: [1, 20],
      nGram: 4,
      textRange: [0.03, 1],
      trim: [25, 50],
    },
    {
      append: [1, 1],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 20],
      nGram: 4,
      textRange: [20.03, 20.031],
      trim: [1, 25],
    },
    {
      append: [1, 5],
      backgroundColor: "blue",
      fontColor: "white",
      fps: [1, 30],
      nGram: 4,
      textRange: [27.03, 27.031],
      trim: [5, 25],
    },
    {
      append: [1, 1],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 30],
      nGram: 9,
      textRange: [50, 100],
      trim: [1, 15],
    },
    {
      append: [2, 6],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 24],
      nGram: 6,
      textRange: [10, 90],
      trim: [1, 25],
    },
    {
      append: [1, 1],
      backgroundColor: "black",
      fontColor: "white",
      fps: [15, 30],
      nGram: 11,
      textRange: [10, 90],
      trim: [1, 1],
    },
    {
      append: [1, 1],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 30],
      nGram: 6,
      textRange: [99.985, 99.99],
      trim: [1, 1],
    },
    {
      append: [1, 3],
      backgroundColor: "black",
      fontColor: "white",
      fps: [1, 30],
      nGram: 3,
      textRange: [26, 26.001],
      trim: [1, 3],
    },
    {
      append: [1, 3],
      backgroundColor: "red",
      fontColor: "white",
      fps: [1, 30],
      nGram: 2,
      textRange: [0, 0.0014],
      trim: [1, 3],
    },
  ];

  console.log(`${configurations.length} available configurations`);

  const configuration =
    configurations[params.edition_number] || DEFAULT_CONFIGURATION;

  const base = "https://in-tongues.work.damonzucconi.com/";
  const src = `${base}?${encode(configuration)}`;

  console.log(
    configurations.map((config) => {
      return `${base}?${encode(config)}`;
    })
  );

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
};
