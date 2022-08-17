import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AppFrame from "@/components/AppFrame";
import { launch, open, quitApp, toggle } from "@/features/windows/windowsSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Footer } from "../components/Footer";
import Profile from "../components/[address]";
const Layout = dynamic(() => import("../components/Layout"));

export default function Home() {
  const dispatch = useAppDispatch();
  const toggleHelp = () => dispatch(toggle({ windowName: "help" }));
  const openSearch = () => dispatch(open({ windowName: "search" }));

  const openApp = useAppSelector((state) => state.windows.primaryApp);

  const openProfile = () =>
    dispatch(
      launch(<Profile address={"0x67fE5334db266f3afD937981e83fc4a68403AcAA"} />)
    );
  const quit = () => dispatch(quitApp());

  return (
    <Layout fixedOpen={false} noOpacity={true} paletteStartsOpen={true}>
      <div className="absolute z-auto -mt-12 flex h-full flex-col justify-center font-mono">
        <Image src="/LogoGlobe.svg" width={5000} height={5000} />
      </div>
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
        <a href="/proposals">
          <div className="flex flex-col items-center space-y-1">
            <Image src="/desktop-icons/Doc.png" width={40} height={50} />
            <p className="font-mono">Proposals</p>
          </div>
        </a>
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
      <Footer />
      {openApp && <AppFrame onClose={quit}>{openApp}</AppFrame>}
    </Layout>
  );
}
