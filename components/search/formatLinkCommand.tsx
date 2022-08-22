import { CommandFilters } from "../../hooks/useGetCommands";
import { Command } from "../../types/Command";

export const formatLinkCommand = (command: Command) =>
  command.type === CommandFilters.LINK
    ? {
        ...command,
        name: (
          <p className="font-light text-gray-800/50">
            Go to{" "}
            <span className="font-normal text-gray-800">{command.name}</span>
          </p>
        ),
      }
    : command;
