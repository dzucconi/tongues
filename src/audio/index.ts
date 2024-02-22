import { Howl } from "howler";
// @ts-ignore
import typing from "./type.mp3";
// @ts-ignore
import backspace from "./backspace.mp3";

export const audio = {
  type: new Howl({ src: [typing], autoplay: false, preload: true }),
  backspace: new Howl({ src: [backspace], autoplay: false, preload: true }),
};
