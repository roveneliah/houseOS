import { Command } from "../../types/Command";
import { useGetProposals } from "../snapshot/useGetProposals";
import { useGetUsers } from "@/hooks/database/useGetUsers";
import { commands, dao, snapshotSpace } from "@/config";
import defaultCommands from "@/utils/defaultCommands";
import { prioritize } from "@/utils/prioritize";
import { map, propEq } from "ramda";
import { concatAll } from "../../utils/concatAll";

import {
  parseDAOCommands,
  parseLinks,
  parseSocial,
  parseQuestions,
  parseDefaults,
  createQuestionLink,
  categoryQuestion,
} from "./parsers";
import { QuestionIcon } from "@/components/icons";

export const useGetCommands = (): Array<Command> => {
  // const proposals = useGetProposals(snapshotSpace);
  // const users = useGetUsers();
  // const proposalCommands = proposals?.map(createProposalCommand) || [];
  // const userCommands = users?.map(createUserCommand) || [];

  const prioritizeQuestions = prioritize(propEq("icon", QuestionIcon));
  const parseQuestions = (command: Command) => categoryQuestion(command) ? createQuestionLink(command) : command
  return prioritizeQuestions(
    concatAll(
      parseDefaults(defaultCommands),
      parseLinks(commands),
      parseSocial(commands),
      parseDAOCommands(commands),
    ).map(parseQuestions)
  );
};
