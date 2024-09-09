import { snapshotSpace, snapshotUrl } from "@/config";
import { useIsNewUser } from "@/hooks/useIsNewUser";
import Image from "next/image";
import Help from "../apps/help";
import { useAppLauncher } from "../../hooks/useAppLauncher";

export function DesktopIconsBasic() {
  return (
    <div className="absolute bottom-12 flex w-full flex-row justify-between px-16 sm:top-24 sm:left-10 sm:w-fit sm:flex-col  sm:justify-start sm:space-x-0 sm:space-y-8 sm:px-0">
      <a target="_blank" href="https://discord.gg/wAjEq3CM">
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Computer.png" width={50} height={50} />
          <p className="font-mono">Discord</p>
        </div>
      </a>
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
          <Image src="/desktop-icons/Suit.png" width={40} height={50} />
          <p className="font-mono">Voting</p>
        </div>
      </a>
      <a target="_blank" href="https://www.ballhogs.club/">
        <div className="flex flex-col items-center space-y-1">
          <Image src="/desktop-icons/Doc.png" width={40} height={50} />
          <p className="font-mono">FAQ</p>
        </div>
      </a>
    </div>
  );
}
