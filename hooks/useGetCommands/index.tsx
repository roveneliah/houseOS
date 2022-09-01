import { Command } from "../../types/Command";
import { useGetProposals } from "../snapshot/useGetProposals";
import { useGetUsers } from "@/hooks/database/useGetUsers";
import { commands, dao, snapshotSpace } from "@/config";
import defaultCommands from "@/utils/defaultCommands";
import QuestionIcon from "@/components/icons/QuestionIcon";
import { prioritize } from "@/utils/prioritize";
import { propEq } from "ramda";
import { concatAll } from "../../utils/concatAll";

import {
  parseDAOCommands,
  parseLinks,
  parseSocial,
  parseQuestions,
  parseDefaults,
} from "./parsers";

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
      parseSocial(commands),
      parseDAOCommands(commands),
      parseQuestions(commands)
    )
  );
};
