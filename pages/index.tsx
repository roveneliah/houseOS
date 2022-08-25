import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import AppFrame from "@/components/views/AppFrame";
import { quitApp, toggle } from "@/redux/features/windows/windowsSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Footer } from "../components/Footer";
import { DesktopIcons } from "../components/DesktopIcons";
const Layout = dynamic(() => import("../components/Layout"));

export default function Home() {
  const dispatch = useAppDispatch();
  const openApp = useAppSelector((state) => state.windows.primaryApp);
  const quit = () => dispatch(quitApp());

  return (
    <Layout fixedOpen={true} noOpacity={true}>
      <div className="absolute z-auto -mt-12 flex h-full flex-col justify-center font-mono">
        <Image src="/LogoGlobe.svg" width={6000} height={6000} />
      </div>
      <DesktopIcons />
      <Footer />

      {/* // TODO: this should be part of layout */}
      {openApp && <AppFrame onClose={quit}>{openApp}</AppFrame>}
    </Layout>
  );
}
