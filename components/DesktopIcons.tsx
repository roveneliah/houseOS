import { snapshotSpace, snapshotUrl } from "@/config";
import { useIsNewUser } from "@/hooks/useIsNewUser";
import Image from "next/image";
import Help from "./help";
import { useAppLauncher } from "../hooks/useAppLauncher";

export function DesktopIcons() {
  const isNewUser = useIsNewUser();
  const {
    launchCreateProfile,
    launchProfile,
    launchSearch,
    launchProposalView,
  } = useAppLauncher();

  return (
    <div className="absolute bottom-12 flex w-full flex-row justify-between px-16 sm:top-24 sm:left-10 sm:w-fit sm:flex-col  sm:justify-start sm:space-x-0 sm:space-y-8 sm:px-0">
      <div
        onClick={launchSearch}
        className="flex cursor-pointer flex-col items-center space-y-1"
      >
        <Image src="/desktop-icons/Computer.png" width={50} height={50} />
        <p className="font-mono">Search</p>
      </div>
      {/* <a
        target="_blank"
        href="https://krausehousework.notion.site/Krause-House-Contributor-Dashboard-a00860761dd4486792aed12cc8187ce2"
      >
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Files.png" width={50} height={50} />
          <p className="font-mono">Workspace</p>
        </div>
      </a> */}
      <button onClick={isNewUser ? launchCreateProfile : launchProfile}>
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Suit.png" width={40} height={50} />
          <p className="font-mono">Profile</p>
        </div>
      </button>
      <button onClick={launchProposalView}>
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Doc.png" width={40} height={50} />
          <p className="font-mono">Proposals</p>
        </div>
      </button>
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
