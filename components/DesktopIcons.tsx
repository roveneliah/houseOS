import { useAppDispatch } from "@/app/hooks";
import { launch, open } from "@/features/windows/windowsSlice";
import Image from "next/image";
import Help from "../pages/help";
import ProposalsListPage from "../pages/proposals";

export function DesktopIcons() {
  const dispatch = useAppDispatch();
  const toggleHelp = () => dispatch(launch(<Help />));
  const openSearch = () => dispatch(open({ windowName: "search" }));
  const launchProposalView = () => dispatch(launch(<ProposalsListPage />));

  return (
    <div className="absolute top-24 left-10 flex flex-col space-y-8">
      <div
        onClick={openSearch}
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
          <Image src="/desktop-icons/Doc.png" width={40} height={50} />
          <p className="font-mono">Proposals</p>
        </div>
      </button>
      <a target={"_blank"} href="https://snapshot.org/#/krausehouse.eth">
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Suit.png" width={40} height={50} />
          <p className="font-mono">Vote</p>
        </div>
      </a>
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
