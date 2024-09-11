import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import AppFrame from "@/components/layout/AppFrame";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Footer } from "../components/home/Footer";
const Layout = dynamic(() => import("../components/home/Layout"));
import { RootState } from "@/redux/app/store";
import { useAppLauncher } from "@/hooks/useAppLauncher";
import { DesktopIconsBasic } from "@/components/home/DesktopIconsBasic";

export default function Home() {
  const openApp = useAppSelector(
    (state: RootState) => state.windows.primaryApp
  );
  const width = useAppSelector(
    (state: RootState) => state.windows.primaryAppWidth
  );
  const height = useAppSelector(
    (state: RootState) => state.windows.primaryAppHeight
  );
  const padding = useAppSelector(
    (state: RootState) => state.windows.primaryAppPadding
  );
  const { quit } = useAppLauncher();

  return (
    <Layout fixedOpen={false} noOpacity={true}>
      <div className="absolute z-auto -mt-12 hidden h-full flex-col justify-center font-mono sm:flex">
        <Image src="/LogoGlobe.svg" width={6000} height={6000} alt="Logo" />
      </div>
      <div className="hidden sm:block">
        <DesktopIconsBasic />
      </div>

      <Footer />

      {openApp && (
        <AppFrame
          width={width}
          height={height}
          onClose={quit}
          padding={padding}
        >
          {openApp}
        </AppFrame>
      )}
    </Layout>
  );
}
