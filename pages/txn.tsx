import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import AppFrame from "@/components/layout/AppFrame";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Footer } from "../components/home/Footer";
import { DesktopIcons } from "../components/home/DesktopIcons";
const Layout = dynamic(() => import("../components/home/Layout"));
import { RootState } from "@/redux/app/store";
import { useAppLauncher } from "@/hooks/useAppLauncher";
import { useFormText } from "@/hooks/generic/useFormText";
import { useState } from "react";

export default function TxnBuilder() {
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

  const {text, updateText, clear} = useFormText();
  const [res, setRes] = useState<any>();

  const getTxn = (txnJson: string) => {
    return "hi"
  }

  return (
    <Layout fixedOpen={false} noOpacity={true}>
      <div className="absolute z-auto -mt-12 flex h-full flex-col justify-center font-mono">
        <Image src="/LogoGlobe.svg" width={6000} height={6000} alt="logo" />
      </div>
      <DesktopIcons />
      <Footer />

      {/* // TODO: this should be part of layout */}
        <AppFrame
          width={width}
          height={height}
          onClose={quit}
          padding={padding}
        >
          <div className="flex flex-col items-start bg-base-200 p-12 h-full w-full">
            <p>
              Transaction Builder
            </p>
            <textarea rows={4} value={text} onChange={updateText} className="w-1/2"></textarea>
            <button onClick={() => setRes(() => getTxn(text))}>Build</button>
            {res && <p>{res}</p>}
          </div>
        </AppFrame>
      
    </Layout>
  );
}
