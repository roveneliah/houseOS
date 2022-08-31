import { filter, propEq } from "ramda";
import { EthereumAddress } from "./EthereumAddress";

export enum ProposalState {
  Active = "active",
  Closed = "closed",
}

export const isActive: (p: Proposal) => boolean = propEq(
  "state",
  ProposalState.Active
);
export const filterActive: (ps: Array<Proposal>) => Array<Proposal> =
  filter(isActive);

export interface Proposal {
  author: EthereumAddress;
  title: string;
  body: string;
  id: string;
  state: ProposalState;
  choices: Array<string>;
  space: any;
  votes: number;
  scores_total: number;
  scores: Array<number>;
  start: number;
  end: number;
}
