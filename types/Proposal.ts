import { EthereumAddress } from "./EthereumAddress";

export enum ProposalState {
  Active = "active",
  Closed = "closed",
}

export interface Proposal {
  author: EthereumAddress;
  title: string;
  body: string;
  id: string;
  state: ProposalState;
  choices: Array<string>;
  space: string;
  votes: number;
  scores_total: number;
  scores: Array<number>;
  start: number;
  end: number;
}
