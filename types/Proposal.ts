import { EthereumAddress } from "./EthereumAddress";

export interface Proposal {
  author: EthereumAddress;
  title: string;
  body: string;
  id: string;
}
