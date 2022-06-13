import { Proposal } from "../types/Proposal";
import { Command } from "../types/Command";
import { useGetProposals } from "./snapshot/useGetProposals";
import { useGetUsers } from "./database/useGetUsers";
import { User } from "../types/User";
import { commands, snapshotSpace } from "../config";

export enum CommandFilters {
  ALL = "ALL",
  PROPOSAL = "PROPOSAL",
  LINK = "LINK",
  USER = "USER",
}

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

export const useGetCommands = (): Array<Command> => {
  const proposals = useGetProposals(snapshotSpace);
  const users = useGetUsers();
  return [
    ...commands?.links?.map(createLinkCommand),
    ...proposals?.map(createProposalCommand),
    {
      name: "Me",
      link: `/profile`,
      type: CommandFilters.USER,
    },
    ...users?.map(createUserCommand),
  ];
};
