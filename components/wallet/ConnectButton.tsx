import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

const ConnectButton = () => {
  // Use hooks to manage connection state
  const { connect } = useConnect();

  const { address, isConnected, isReconnecting } = useAccount();
  const { disconnect } = useDisconnect();

  // State to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If not mounted, render nothing to avoid server-client mismatch
  if (!isMounted) {
    return null; // Alternatively, you can render a loading spinner or placeholder
  }

  // Render the connect buttons only after the component has mounted
  return (
    <div className="hidden flex-row items-center space-x-4 px-4 sm:flex">
      {isConnected ? (
        <button
          className="group btn btn-sm rounded-md bg-transparent font-normal normal-case hover:bg-transparent"
          onClick={() => disconnect()}
        >
          {address ? address : "Connected"}
        </button>
      ) : isReconnecting ? (
        <button className="btn loading btn-sm rounded-md border-black bg-transparent font-normal normal-case hover:bg-transparent">
          Reconnecting
        </button>
      ) : (
        <button
          onClick={() => connect({ connector: injected() })}
          className="btn btn-sm rounded-md bg-transparent font-normal normal-case hover:bg-transparent"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
