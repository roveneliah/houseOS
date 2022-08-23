import { useAudioPlayer } from "../hooks/useAudioPlayer";

export function AudioPlayer() {
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
