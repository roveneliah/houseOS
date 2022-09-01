import {
  QuestionIcon,
  LinkIcon,
  ArrowRightIcon,
  AtIcon,
} from "@/components/icons";
import { CommandFilters } from "@/components/search/views";
import { Command } from "@/types/Command";
import { User } from "@/types/User";
import {
  allPass,
  defaultTo,
  equals,
  includes,
  is,
  mergeLeft,
  mergeRight,
  where,
} from "ramda";
import { Proposal } from "@/types/Proposal";
import Profile from "@/components/profiles/[address]";
import { ChatIcon } from "@/components/icons/ChatIcon";

const createLinkCommand = (o: any): Command => ({
  ...o,
  type: CommandFilters.LINK,
  icon: o.type === "QUESTION" ? QuestionIcon : LinkIcon,
});
export const parseLinks = (commands: any) =>
  defaultTo([])(
    commands?.links
      ?.map(mergeRight({ type: CommandFilters.LINK }))
      .map((o: any) =>
        mergeRight({ icon: o.type === "QUESTION" ? QuestionIcon : LinkIcon })(o)
      )
  );

const createDAOLink = (o: any): Command => ({
  ...o,
  type: CommandFilters.DAO,
  icon: o.type === "QUESTION" ? QuestionIcon : LinkIcon,
});
const categoryDAO = where({
  categories: allPass([is(Array), includes("DAO")]),
});
export const parseDAOCommands = (commands: any) =>
  defaultTo([])(commands?.links?.filter(categoryDAO).map(createDAOLink));

const createSocialLink = (o: any): Command => ({
  ...o,
  type: CommandFilters.SOCIAL,
  icon: o.type === "QUESTION" ? QuestionIcon : LinkIcon,
});
const categorySocial = where({
  categories: allPass([is(Array), includes("SOCIAL")]),
});
export const parseSocial = (commands: any): Command =>
  defaultTo([])(commands?.links?.filter(categorySocial).map(createSocialLink));

const createQuestionLink = (o: any): Command => ({
  ...o,
  type: CommandFilters.QUESTIONS,
  icon: QuestionIcon,
});
const categoryQuestion = where({ type: equals("QUESTION") });
export const parseQuestions = (commands: any) =>
  defaultTo([])(
    commands?.links?.filter(categoryQuestion).map(createQuestionLink)
  );

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
export const parseDefaults = (defaultCommands: any) =>
  defaultTo([])(
    defaultCommands.map(
      mergeLeft({ type: CommandFilters.LINK, icon: ArrowRightIcon })
    )
  );
