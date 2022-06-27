import { Proposal } from "../types/Proposal";
import { Command } from "../types/Command";
import { useGetProposals } from "./snapshot/useGetProposals";
import { useGetUsers } from "@/hooks/database/useGetUsers";
import { User } from "@/types/User";
import { commands, snapshotSpace } from "@/config";
import defaultCommands from "@/utils/defaultCommands";

export enum CommandFilters {
  ALL = "ALL",
  PROPOSAL = "PROPOSAL",
  LINK = "LINK",
  USER = "USER",
}

const createLinkCommand = ({ name, link, description }: any): Command => ({
  name,
  link,
  type: CommandFilters.LINK,
});

const createProposalCommand = (proposal: Proposal): Command => ({
  name: proposal.title,
  link: `/proposals/${proposal.id}`,
  type: CommandFilters.PROPOSAL,
  className: `${proposal.state === "active" ? "font-semibold" : "font-normal"}`,
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
    ...(defaultCommands.map((o) => ({ ...o, type: CommandFilters.LINK })) ||
      []),
    ...(commands?.links?.map(createLinkCommand) || []),
    ...(proposals?.map(createProposalCommand) || []),
    ...(users?.map(createUserCommand) || []),
  ];
};
