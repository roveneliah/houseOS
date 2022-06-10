import { useEffect, useState } from "react";
import { useProvider } from "wagmi";

export const useGetTimeLeft = (proposal: any): string => {
  // const timestamp = proposal.end;
  // const formattedTime = new Date(timestamp).toDateString();

  return proposal.state === "closed" ? "Closed" : proposal.end;
};
