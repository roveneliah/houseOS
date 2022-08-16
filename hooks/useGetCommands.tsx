import { Proposal } from "../types/Proposal";
import { Command } from "../types/Command";
import { useGetProposals } from "./snapshot/useGetProposals";
import { useGetUsers } from "@/hooks/database/useGetUsers";
import { User } from "@/types/User";
import { commands, dao, snapshotSpace } from "@/config";
import defaultCommands from "@/utils/defaultCommands";
import AtIcon from "@/components/icons/AtIcon";
import { ChatIcon } from "@/components/icons/ChatIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import ArrowRightIcon from "@/components/icons/ArrowIcon";
import Profile from "@/components/[address]";
import { EthereumAddress } from "@/types/EthereumAddress";
import ProposalPage from "@/pages/proposals/[id]";

export enum CommandFilters {
  ALL = "ALL",
  PROPOSAL = "PROPOSAL",
  LINK = "LINK",
  USER = "USER",
}

const createLinkCommand = ({
  name,
  link,
  description,
  favorite,
}: any): Command => ({
  name,
  link,
  type: CommandFilters.LINK,
  description,
  favorite,
  icon: LinkIcon,
});

const createProposalCommand = (proposal: Proposal): Command => ({
  name: proposal.title,
  // link: `/proposals/${proposal.id}`,
  app: <ProposalPage id={proposal.id} />,
  type: CommandFilters.PROPOSAL,
  className: `${proposal.state === "active" ? "font-semibold" : "font-normal"}`,
  icon: ChatIcon,
});

const createUserCommand = (user: User): Command => ({
  name: user.name,
  // link: `/profiles/${user.address}`,
  type: CommandFilters.USER,
  icon: AtIcon,
  app: <Profile address={user.address} />,
});

export const useGetCommands = (): Array<Command> => {
  const proposals = useGetProposals(snapshotSpace);
  const users = useGetUsers();
  return [
    ...(defaultCommands.map((o) => ({
      ...o,
      type: CommandFilters.LINK,
      icon: ArrowRightIcon,
    })) || []),
    ...(commands?.links?.map(createLinkCommand) || []),
    ...(proposals?.map(createProposalCommand) || []),
    ...(users?.map(createUserCommand) || []),
  ];
};
