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
import Profile from "@/components/profiles/[address]";
import { EthereumAddress } from "@/types/EthereumAddress";
import ProposalPage from "@/components/proposals/[id]";
import { CommandFilters } from "@/components/search/views";
import QuestionIcon from "@/components/icons/QuestionIcon";
import { prioritize } from "@/utils/prioritize";
import {
  includes,
  map,
  mergeLeft,
  pipe,
  prop,
  propEq,
  propOr,
  reduce,
} from "ramda";
import { concatAll } from "../utils/concatAll";

const createLinkCommand = ({
  name,
  keywords = [],
  link,
  description,
  favorite,
  categories,
  type,
}: any): Command => ({
  name,
  keywords,
  link,
  type: CommandFilters.LINK,
  description,
  favorite,
  categories,
  icon: type === "QUESTION" ? QuestionIcon : LinkIcon,
});

const createDAOLink = ({
  name,
  keywords = [],
  link,
  description,
  favorite,
  categories,
  type,
}: any): Command => ({
  name,
  keywords,
  link,
  type: CommandFilters.DAO,
  description,
  favorite,
  categories,
  icon: type === "QUESTION" ? QuestionIcon : LinkIcon,
});

const createQuestionLink = ({
  name,
  keywords = [],
  link,
  description,
  favorite,
  categories,
  type,
}: any): Command => ({
  name,
  keywords,
  link,
  type: CommandFilters.QUESTIONS,
  description,
  favorite,
  categories,
  icon: QuestionIcon,
});

const createProposalCommand = (proposal: Proposal): Command => ({
  name: proposal.title,
  // app: <ProposalPage id={proposal.id} />,
  // link: `/proposals/${proposal.id}`,
  link: `https://snapshot.org/#/${snapshotSpace}/proposal/${proposal.id}`,
  type: CommandFilters.PROPOSAL,
  className: `${proposal.state === "active" ? "font-semibold" : "font-normal"}`,
  icon: ChatIcon,
});

const createUserCommand = (user: User): Command => ({
  name: user.name,
  app: <Profile address={user.address} />,
  // link: `/profiles/${user.address}`,
  type: CommandFilters.USER,
  icon: AtIcon,
});

const prioritizeQuestions = prioritize(propEq("icon", QuestionIcon));

// TODO: #31 refactor, not readable
const defaults =
  defaultCommands.map((o: object) => ({
    ...o,
    type: CommandFilters.LINK,
    icon: ArrowRightIcon,
  })) || [];

const linkCommands = commands?.links?.map(createLinkCommand) || [];
const daoCommands =
  commands?.links
    ?.filter(pipe(propOr([], "categories"), includes("DAO")))
    .map(createDAOLink) || [];
const questions =
  commands?.links
    ?.filter((command) => command.type === "QUESTION")
    .map(createQuestionLink) || [];

export const useGetCommands = (): Array<Command> => {
  // const proposals = useGetProposals(snapshotSpace);
  // const users = useGetUsers();
  // const proposalCommands = proposals?.map(createProposalCommand) || [];
  // const userCommands = users?.map(createUserCommand) || [];

  return prioritizeQuestions(
    concatAll(defaults, linkCommands, daoCommands, questions)
  );
};
