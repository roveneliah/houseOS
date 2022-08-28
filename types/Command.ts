import { CommandFilters } from "@/components/search/views";
import { ReactNode } from "react";

export interface Command {
  name: string;
  keywords?: Array<string>;
  link?: string; // TODO: NEED URL type
  app?: ReactNode;
  type: CommandFilters;
  className?: string;
  description?: string;
  icon: (arg0: any) => JSX.Element;
  favorite?: boolean;
  categories?: Array<string>;
}
