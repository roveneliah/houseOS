import { useBoolean } from "@/hooks/generic/useBoolean";
import { useRef } from "react";

const tracks = [
  {
    title: "BJTMJHYF",
    author: "grimelabinc",
    credits: "https://soundcloud.com/grimelabinc/bjtmjhyf",
    file: "track0.mp3",
  },
];

export const useAudioPlayer = () => {
  const audioPlayer = useRef<any>();
  const [playing, togglePlay] = useBoolean(false);

  const play = () => {
    audioPlayer?.current?.play();
    togglePlay();
  };
  const pause = () => {
    audioPlayer?.current?.pause();
    togglePlay();
  };

  return {
    audioPlayer,
    playing,
    toggle: () => (playing ? pause() : play()),
    track: tracks[0],
  };
};
