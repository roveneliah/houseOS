import { EthereumAddress } from "../types/EthereumAddress";
import { Proposal } from "../types/Proposal";
import { Command } from "../types/Command";

export enum CommandFilters {
  ALL = "ALL",
  PROPOSAL = "PROPOSAL",
  LINK = "LINK",
}

const proposals: Array<Proposal> = [
  {
    author: "flexchapman.eth",
    title: "Full Time Team v1",
    body: "Proposal\n\nRenew the full time team's payments for the next six months...",
    id: "0x34134123",
  },
  {
    author: "spicemaster",
    title: "NFT.NYC Event Costs",
    body: "World",
    id: "0x3453245345",
  },
  {
    author: "mario",
    title: "Add Ice Cube to Stewards team",
    body: "World",
    id: "0x4543523453",
  },
];
const links = [
  {
    name: "Treasury (Etherscan)",
    link: "https://etherscan.io/address/0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2",
  },
  {
    name: "Discord",
    link: "",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/krausehousedao",
  },
  {
    name: "Website",
    link: "https://krausehouse.club",
  },
  {
    name: "Proposals",
    link: "/",
  },
];

export const useGetCommands = () => {
  const createLinkCommand = ({ name, link }: any): Command => ({
    name,
    link,
    type: CommandFilters.LINK,
  });
  const createProposalCommand = (proposal: Proposal): Command => ({
    name: proposal.title,
    link: `/proposals/${proposal.id}`,
    type: CommandFilters.PROPOSAL,
  });
  const commands: Array<Command> = [
    ...links.map(createLinkCommand),
    ...proposals.map(createProposalCommand),
  ];
  return commands;
};
