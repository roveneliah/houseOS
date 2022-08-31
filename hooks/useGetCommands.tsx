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
  allPass,
  defaultTo,
  equals,
  includes,
  is,
  map,
  mergeLeft,
  pipe,
  prop,
  propEq,
  propOr,
  propSatisfies,
  reduce,
  where,
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

// TODO: #31 refactor, not readable, parser combinator?
const parseDefaults = (defaultCommands: any) =>
  defaultTo([])(
    defaultCommands.map(
      mergeLeft({ type: CommandFilters.LINK, icon: ArrowRightIcon })
    )
  );

const parseLinks = (commands: any) =>
  defaultTo([])(commands?.links?.map(createLinkCommand));

const categoryDAO = where({
  categories: allPass([is(Array), includes("DAO")]),
});
const parseDAOCommands = (commands: any) =>
  defaultTo([])(commands?.links?.filter(categoryDAO).map(createDAOLink));

const categoryQuestion = where({ type: equals("QUESTION") });
const parseQuestions = (commands: any) =>
  defaultTo([])(
    commands?.links?.filter(categoryQuestion).map(createQuestionLink)
  );

export const useGetCommands = (): Array<Command> => {
  // const proposals = useGetProposals(snapshotSpace);
  // const users = useGetUsers();
  // const proposalCommands = proposals?.map(createProposalCommand) || [];
  // const userCommands = users?.map(createUserCommand) || [];

  const prioritizeQuestions = prioritize(propEq("icon", QuestionIcon));
  return prioritizeQuestions(
    concatAll(
      parseDefaults(defaultCommands),
      parseLinks(commands),
      parseDAOCommands(commands),
      parseQuestions(commands)
    )
  );
};
