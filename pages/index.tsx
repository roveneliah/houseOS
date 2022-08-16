import { useAppDispatch } from "@/app/hooks";
import { open, toggle } from "@/features/windows/windowsSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Footer } from "../components/Footer";
const Layout = dynamic(() => import("../components/Layout"));

export default function Home() {
  const dispatch = useAppDispatch();
  const toggleHelp = () => dispatch(toggle({ windowName: "help" }));
  const openSearch = () => dispatch(open({ windowName: "search" }));

  return (
    <Layout fixedOpen={false} noOpacity={true}>
      <div className="absolute z-auto -mt-12 flex h-full flex-col justify-center font-mono">
        <Image src="/logoglobeblue.svg" width={4000} height={4000} priority />
      </div>
      <div className="absolute top-24 left-10 flex flex-col space-y-6">
        <div
          onClick={openSearch}
          className="flex cursor-pointer flex-col items-center space-y-1"
        >
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
        <a href="/proposals">
          <div className="flex flex-col items-center space-y-1">
            <Image src="/Doc.png" width={50} height={50} />
            <p className="font-mono">Proposals</p>
          </div>
        </a>
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
      <Footer />
    </Layout>
  );
}
