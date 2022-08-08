import { useAppDispatch } from "@/app/hooks";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
const Layout = dynamic(() => import("../components/Layout"));

export default function Home() {
  const { audioPlayer, playing, toggle, track } = useAudioPlayer();

  const dispatch = useAppDispatch();
  const toggleHelp = () =>
    dispatch({ type: "windows/toggle", payload: { windowName: "help" } });

  return (
    <Layout fixedOpen={false} noOpacity={true}>
      <div className="absolute top-1/4 z-auto font-mono">
        <Image src="/LogoBG.png" width={700} height={500} />
      </div>
      <div className="absolute top-24 left-10 flex flex-col space-y-6">
        <div className="flex flex-col items-center space-y-1">
          <Image src="/Computer.png" width={50} height={50} />
          <p className="font-mono">Explorer</p>
        </div>
        <a
          target="_blank"
          href="https://krausehousework.notion.site/Krause-House-Contributor-Dashboard-a00860761dd4486792aed12cc8187ce2"
        >
          <div className="flex flex-col items-center space-y-1">
            <Image src="/Files.png" width={50} height={50} />
            <p className="font-mono">Workspace</p>
          </div>
        </a>
        <div className="flex flex-col items-center space-y-1">
          <Image src="/Doc.png" width={50} height={50} />
          <p className="font-mono">Proposals</p>
        </div>
        <a target={"_blank"} href="https://snapshot.org/#/krausehouse.eth">
          <div className="flex flex-col items-center space-y-1">
            <Image src="/Suit.png" width={50} height={50} />
            <p className="font-mono">Vote</p>
          </div>
        </a>
        <div
          onClick={toggleHelp}
          className="flex cursor-pointer flex-col items-center space-y-1"
        >
          <Image src="/Doc.png" width={50} height={50} />
          <p className="font-mono">Help</p>
        </div>
      </div>
      <div className="bg-base-200 absolute bottom-0 flex w-full flex-row justify-between border-t border-black py-3 px-8">
        <div className="">
          <p className="font-mono text-sm">Press ctrl-k to search...</p>
        </div>
        <div className="flex cursor-pointer flex-row items-center space-x-2">
          <audio ref={audioPlayer} src={track.file} preload="metadata" />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
          </svg> */}
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
          {/* <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
            </svg>
          </div> */}
          <a href={track.credits} target="_blank">
            <p className="font-mono text-sm">
              {track.title} - {track.author}
            </p>
          </a>

          {/* {!playing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )} */}
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="font-mono text-sm">House OS v0.1</p>
        </div>
      </div>
    </Layout>
  );
}
