import { snapshotSpace, snapshotUrl } from "@/config";
import { useIsNewUser } from "@/hooks/useIsNewUser";
import Image from "next/image";
import Help from "../apps/help";
import { useAppLauncher } from "../../hooks/useAppLauncher";
import { useAppDispatch } from "@/redux/app/hooks";
import { toggle } from "@/redux/features/windows/windowsSlice";

export function DesktopIconsBasic() {
  const dispatch = useAppDispatch();
  const toggleSearch = () => dispatch(toggle({ windowName: "search" }));
  return (
    <div className="absolute bottom-12 w-full flex-row justify-between px-16 sm:left-10 sm:top-24 sm:flex sm:w-fit sm:flex-col  sm:justify-start sm:space-x-0 sm:space-y-8 sm:px-0">
      <a target="_blank" href="https://discord.gg/wAjEq3CM">
        <div className="flex flex-col items-center space-y-1">
          <Image
            alt="Discord"
            src="/desktop-icons/Computer.png"
            width={50}
            height={50}
          />
          <p className="font-mono">Chat</p>
        </div>
      </a>
      {/* <button onClick={() => toggleSearch()}>
        <div className="flex flex-col items-center space-y-1">
          <Image
            alt="Discord"
            src="/desktop-icons/Computer.png"
            width={50}
            height={50}
          />
          <p className="font-mono">Search</p>
        </div>
      </button> */}
      {/* <a
        target="_blank"
        href="https://krausehousework.notion.site/Krause-House-Contributor-Dashboard-a00860761dd4486792aed12cc8187ce2"
      >
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Files.png" width={50} height={50} />
          <p className="font-mono">FAQ</p>
        </div>
      </a> */}
      {/* <a
        target="_blank"
        href="https://krausehousework.notion.site/Krause-House-Contributor-Dashboard-a00860761dd4486792aed12cc8187ce2"
      >
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Suit.png" width={40} height={50} />
          <p className="font-mono">Notion</p>
        </div>
      </a> */}
      <a target="_blank" href="https://snapshot.org/#/krausehouse.eth/">
        <div className="flex flex-col items-center space-y-1">
          <Image
            alt="Voting"
            src="/desktop-icons/Suit.png"
            width={40}
            height={50}
          />
          <p className="font-mono">Voting</p>
        </div>
      </a>
      <a target="_blank" href="https://www.ballhogs.club/">
        <div className="flex flex-col items-center space-y-1">
          <Image
            alt="FAQ"
            src="/desktop-icons/Doc.png"
            width={40}
            height={50}
          />
          <p className="font-mono">FAQ</p>
        </div>
      </a>
    </div>
  );
}
