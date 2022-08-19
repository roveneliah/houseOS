import { useAudioPlayer } from "../hooks/useAudioPlayer";

function AudioPlayer() {
  const { audioPlayer, playing, toggle, track } = useAudioPlayer();

  return (
    <div className="flex cursor-pointer flex-row items-center space-x-2">
      <audio ref={audioPlayer} src={track.file} preload="metadata" />
      <div onClick={toggle} className="cursor-pointer">
        {playing ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>
      <a href={track.credits} target="_blank">
        <p className="font-mono text-sm">
          {track.title} - {track.author}
        </p>
      </a>
    </div>
  );
}

export function Footer({ audio = false }) {
  return (
    <div className="bg-base-200 absolute bottom-0 flex hidden w-full flex-row justify-between border-t border-black py-3 px-8 sm:flex">
      <div className="">
        <p className="font-mono text-sm">Press ctrl-k to search...</p>
      </div>
      {audio && <AudioPlayer />}
      <div className="flex flex-row items-center space-x-2">
        <p className="font-mono text-sm">House OS v0.1</p>
      </div>
    </div>
  );
}
