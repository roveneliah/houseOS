import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import AppFrame from "@/components/views/AppFrame";
import { quitApp, toggle } from "@/redux/features/windows/windowsSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Footer } from "../components/Footer";
import { DesktopIcons } from "../components/DesktopIcons";
import ListFrame from "@/components/views/ListFrame";
const Layout = dynamic(() => import("../components/Layout"));
import { RootState } from "@/redux/app/store";
import { useAppLauncher } from "@/hooks/useAppLauncher";

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
      <div className="absolute z-auto -mt-12 flex h-full flex-col justify-center font-mono">
        <Image src="/LogoGlobe.svg" width={6000} height={6000} />
      </div>
      <DesktopIcons />
      <Footer />

      {/* // TODO: this should be part of layout */}
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
      {/* <ListFrame
        title="test list"
        list={[
          { name: "a", onClick: () => console.log("a") },
          { name: "b", description: "yolo" },
          { name: "c" },
        ]}
      /> */}
    </Layout>
  );
}
