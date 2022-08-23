import { AudioPlayer } from "./AudioPlayer";

export function Footer({ audio = false }) {
  return (
    <div className="bg-base-200 absolute bottom-0 flex hidden w-full flex-row justify-between border-t border-black py-3 px-8 sm:flex">
      <div className="">
        <p className="font-mono text-sm">Press ctrl-k to search...</p>
      </div>
      {audio && <AudioPlayer />}
      <div className="flex flex-row items-center space-x-2">
        <a
          target={"_blank"}
          href="https://docs.google.com/forms/d/e/1FAIpQLSfPSPSvYaJmI8AcQ0sgNubkB_pCIo5qsfiQLiS4THQ0K7ePPw/viewform?usp=sf_link"
        >
          <p className="font-mono text-sm">
            Got any feedback or ideas for House OS?
          </p>
        </a>
      </div>
    </div>
  );
}
