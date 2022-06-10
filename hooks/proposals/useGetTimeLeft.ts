import { useEffect, useState } from "react";
import { useProvider } from "wagmi";

export const useGetTimeLeft = (proposal: any): string => {
  const provider = useProvider();
  const [timestamp, setTimestamp] = useState<any>();

  useEffect(() => {
    provider && provider.getBlock(proposal.end).then(setTimestamp);
  }, [provider]);
  return proposal.state === "closed" ? "Closed" : timestamp;
};
