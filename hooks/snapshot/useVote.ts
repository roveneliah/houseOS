import snapshot from "@snapshot-labs/snapshot.js";
import { useProvider, useAccount, useSigner } from "wagmi";
import { Web3Provider } from "@ethersproject/providers";

const hub = "https://hub.snapshot.org"; // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client712(hub);

export const useVote = (
  snapshotSpace: string,
  proposalId: string,
  choice: number
) => {
  const vote = async (message: string) => {
    console.log("VOTING");

    const web3 = new Web3Provider(<any>window.ethereum);
    const [account] = await web3.listAccounts();

    return await client.vote(web3, account, {
      space: snapshotSpace,
      proposal: proposalId,
      type: "single-choice",
      choice: choice + 1,
      metadata: JSON.stringify({
        comment: message,
      }),
    });
  };

  return vote;
};
