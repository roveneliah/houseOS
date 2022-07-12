import dynamic from "next/dynamic";
import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
const Web3Provider = dynamic(() => import("../components/Web3Provider"));
import store from "../app/store";
import { Provider as ReduxProvider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ReduxProvider>
  );
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric);
// }

export default MyApp;
