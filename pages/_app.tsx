import dynamic from "next/dynamic";
import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
const Web3Provider = dynamic(
  () => import("../components/providers/Web3Provider")
);
import { store } from "../redux/app/store";
import { Provider as ReduxProvider } from "react-redux";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_measurementId}`}
      />

      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || []; 
        function gtag() {dataLayer.push(arguments)}
        gtag('js', new Date()); 
        
        gtag('config', '${process.env.NEXT_PUBLIC_measurementId}');
      `}
      </Script>

      <ReduxProvider store={store}>
        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>
      </ReduxProvider>
    </>
  );
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric);
// }

export default MyApp;
