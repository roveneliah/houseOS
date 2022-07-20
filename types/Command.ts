import { CommandFilters } from "../hooks/useGetCommands";

export interface Command {
  name: string;
  link: string; // TODO: NEED URL type
  type: CommandFilters;
  className?: string;
  description?: string;
  icon: (arg0: any) => JSX.Element;
  favorite?: boolean;
}
