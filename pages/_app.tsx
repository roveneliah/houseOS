import dynamic from "next/dynamic";
import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
const Web3Provider = dynamic(() => import("../components/Web3Provider"));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

export default MyApp;
