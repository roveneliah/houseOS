import { useAppDispatch } from "@/redux/app/hooks";
import { launch, open } from "@/redux/features/windows/windowsSlice";
import Image from "next/image";
import Help from "./help";
import ProposalsListPage from "./proposals";

export function DesktopIcons() {
  const dispatch = useAppDispatch();
  const toggleHelp = () => dispatch(launch(<Help />));
  const openSearch =
    (view: number = 0) =>
    () =>
      dispatch(open({ windowName: "search", searchView: 3 }));
  const launchProposalView = () => dispatch(launch(<ProposalsListPage />));

  return (
    <div className="absolute top-24 left-10 flex flex-col space-y-8">
      <div
        onClick={openSearch()}
        className="flex cursor-pointer flex-col items-center space-y-1"
      >
        <Image src="/desktop-icons/Computer.png" width={50} height={50} />
        <p className="font-mono">Explorer</p>
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
      <button onClick={launchProposalView}>
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/suit.png" width={40} height={50} />
          <p className="font-mono">Proposals</p>
        </div>
      </button>
      {/* <button onClick={openSearch(3)}>
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/doc.png" width={40} height={50} />
          <p className="font-mono">Links</p>
        </div>
      </button> */}
      <div
        onClick={toggleHelp}
        className="flex cursor-pointer flex-col items-center space-y-1"
      >
        <Image src="/desktop-icons/Doc.png" width={40} height={50} />
        <p className="font-mono">Help</p>
      </div>
    </div>
  );
}
