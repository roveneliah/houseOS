import { BuildingIcon } from "../../components/icons/BuildingIcon";
import {
  ChatIcon,
  GroupIcon,
  LinkIcon,
  ListIcon,
  QuestionIcon,
  UsersIcon,
} from "../../components/icons";

export enum CommandFilters {
  ALL = "ALL",
  PROPOSAL = "PROPOSAL",
  LINK = "LINK",
  USER = "USER",
  QUESTIONS = "QUESTIONS",
  GOVERNANCE = "GOVERNANCE",
  DAO = "DAO",
  CONTRIBUTE = "CONTRIBUTE",
  SOCIAL = "SOCIAL",
}

export const views = [
  {
    title: "All",
    name: CommandFilters.ALL,
    view: CommandFilters.ALL,
    icon: ListIcon,
  },
  // {
  //   title: "Links",
  //   name: CommandFilters.LINK,
  //   view: CommandFilters.LINK,
  //   icon: LinkIcon,
  // },
  // {
  //   title: "Proposals",
  //   name: CommandFilters.PROPOSAL,
  //   view: CommandFilters.PROPOSAL,
  //   icon: ChatIcon,
  // },
  {
    title: "Social",
    name: CommandFilters.SOCIAL,
    view: CommandFilters.SOCIAL,
    icon: UsersIcon,
  },
  // {
  //   title: "Governance",
  //   name: CommandFilters.GOVERNANCE,
  //   view: CommandFilters.GOVERNANCE,
  //   icon: GroupIcon,
  // },
  {
    title: "DAO",
    name: CommandFilters.DAO,
    view: CommandFilters.DAO,
    icon: BuildingIcon,
  },
  // {
  //   title: "Jerrys",
  //   name: CommandFilters.USER,
  //   view: CommandFilters.USER,
  //   icon: UsersIcon,
  // },
  {
    title: "Help",
    name: CommandFilters.QUESTIONS,
    view: CommandFilters.QUESTIONS,
    icon: QuestionIcon,
  },
];
