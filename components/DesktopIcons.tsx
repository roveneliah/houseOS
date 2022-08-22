import { useAppDispatch } from "@/redux/app/hooks";
import { launch, open } from "@/redux/features/windows/windowsSlice";
import Image from "next/image";
import Help from "./help";
import ProposalsListPage from "./proposals";

export function DesktopIcons() {
  const dispatch = useAppDispatch();
  const openSearch =
    (view: number = 0) =>
    () =>
      dispatch(open({ windowName: "search", searchView: 3 }));

  const launchProposalView = () => dispatch(launch(<ProposalsListPage />));
  const toggleHelp = () => dispatch(launch(<Help />));

  return (
    <div className="absolute bottom-12 flex w-full flex-row justify-center space-x-8 sm:top-24 sm:left-10 sm:w-fit sm:flex-col  sm:justify-start sm:space-x-0 sm:space-y-8 sm:px-0">
      <div
        onClick={openSearch()}
        className="flex cursor-pointer flex-col items-center space-y-1"
      >
        <Image src="/desktop-icons/Computer.png" width={50} height={50} />
        <p className="font-mono">Search</p>
      </div>
      <a
        target="_blank"
        href="https://krausehousework.notion.site/Krause-House-Contributor-Dashboard-a00860761dd4486792aed12cc8187ce2"
      >
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Files.png" width={50} height={50} />
          <p className="font-mono">Workspace</p>
        </div>
      </a>
      <a target="_blank" href="https://snapshot.org/#/krausehouse.eth">
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Suit.png" width={40} height={50} />
          <p className="font-mono">Vote</p>
        </div>
      </a>
      {/* <button onClick={openSearch(3)}>
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/doc.png" width={40} height={50} />
          <p className="font-mono">Links</p>
        </div>
      </button> */}
      {/* <div
        onClick={toggleHelp}
        className="hidden cursor-pointer flex-col items-center space-y-1 sm:flex"
      >
        <Image src="/desktop-icons/Doc.png" width={40} height={50} />
        <p className="font-mono">Help</p>
      </div> */}
    </div>
  );
}
