import { EthereumAddress } from "./EthereumAddress";

export interface User {
  address: EthereumAddress;
  id?: string;
  name: string;
  avatarSrc?: string;
  tags: Array<string>;
  friends?: Array<EthereumAddress>;
  removeTag: (tag: string) => void;
  addTags: (...tags: Array<string>) => void;
  updateName: (name: string) => void;
}
