import { EthereumAddress } from "./EthereumAddress";

export interface Proposal {
  author: EthereumAddress;
  title: string;
  body: string;
  id: string;
  state: "active" | "closed";
  choices: Array<string>;
  space: string;
  totalVotes: number;
  scores_total: number;
  scores: Array<number>;
  start: number;
  end: number;
}
