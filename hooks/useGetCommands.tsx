import { EthereumAddress } from "../types/EthereumAddress";
import { Proposal } from "../types/Proposal";
import { Command } from "../types/Command";
import { useGetProposals } from "./useGetProposals";
import { useGetUsers } from "./useGetUsers";
import { User } from "../types/User";

export enum CommandFilters {
  ALL = "ALL",
  PROPOSAL = "PROPOSAL",
  LINK = "LINK",
  USER = "USER",
}

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
    link: "/proposals",
  },
];

export const useGetCommands = () => {
  const proposals = useGetProposals("krausehouse.eth");
  const users = useGetUsers();
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
  const createUserCommand = (user: User): Command => ({
    name: user.name,
    link: `/profiles/${user.address}`,
    type: CommandFilters.USER,
  });
  const commands: Array<Command> = [
    ...links.map(createLinkCommand),
    ...proposals.map(createProposalCommand),
    ...users.map(createUserCommand),
  ];
  return commands;
};
