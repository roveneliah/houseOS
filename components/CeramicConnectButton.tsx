import { EthereumAuthProvider, useViewerConnection } from "@self.id/framework";
import { useEffect, useState } from "react";

// A simple button to initiate the connection flow. A Provider must be present at a higher level
// in the component tree for the `useViewerConnection()` hook to work.
export default function CeramicConnectButton() {
  const [connection, connect, disconnect] = useViewerConnection();

  const [window1, setWindow] = useState(null);
  useEffect(() => {
    setWindow(window);
  }, []);

  return connection.status === "connected" ? (
    <button
      onClick={() => {
        disconnect();
      }}
      className="btn btn-outline"
    >
      Disconnect
      {/* ({connection.selfID.id}) */}
    </button>
  ) : window1?.ethereum ? (
    <button
      className="btn btn-outline"
      disabled={connection.status === "connecting"}
      onClick={async () => {
        const accounts = await window1?.ethereum?.request({
          method: "eth_requestAccounts",
        });
        await connect(new EthereumAuthProvider(window1?.ethereum, accounts[0]));
      }}
    >
      {connection.status === "connecting" ? "Connecting" : "Sign In"}
    </button>
  ) : (
    <p>
      An injected Ethereum provider such as{" "}
      <a href="https://metamask.io/">MetaMask</a> is needed to authenticate.
    </p>
  );
}
