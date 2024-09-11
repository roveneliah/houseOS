import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";

const ConnectButton = () => {
  const { address, isConnected, isReconnecting } = useAccount();
  const { disconnect } = useDisconnect();

  // State to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  const { open, close } = useWeb3Modal();

  const { data: ensName } = useEnsName({ address });
  const displayName = useMemo(() => ensName || address, [ensName, address]);

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
    <div className="flex flex-row items-center space-x-4 px-4">
      {isConnected ? (
        <button
          className="group btn btn-sm rounded-md bg-transparent font-normal normal-case hover:bg-transparent"
          onClick={() => disconnect()}
        >
          {displayName}
        </button>
      ) : isReconnecting ? (
        <button className="btn loading btn-sm rounded-md border-black bg-transparent font-normal normal-case hover:bg-transparent">
          Reconnecting
        </button>
      ) : (
        <button
          // onClick={() => connect({ connector: injected() })}
          onClick={() => open()}
          className="btn btn-sm rounded-md bg-transparent font-normal normal-case hover:bg-transparent"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
