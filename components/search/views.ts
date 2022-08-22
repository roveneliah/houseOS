import { CommandFilters } from "../../hooks/useGetCommands";
import ListIcon from "../icons/ListIcon";
import LinkIcon from "../icons/LinkIcon";
import { ChatIcon } from "../icons/ChatIcon";
import UsersIcon from "../icons/UsersIcon";

export const views = [
  {
    title: "All",
    name: CommandFilters.ALL,
    view: CommandFilters.ALL,
    icon: ListIcon,
  },
  {
    title: "Links",
    name: CommandFilters.LINK,
    view: CommandFilters.LINK,
    icon: LinkIcon,
  },
  {
    title: "Proposals",
    name: CommandFilters.PROPOSAL,
    view: CommandFilters.PROPOSAL,
    icon: ChatIcon,
  },
  {
    title: "Users",
    name: CommandFilters.USER,
    view: CommandFilters.USER,
    icon: UsersIcon,
  },
];
