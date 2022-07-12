import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useCommand } from "../hooks/generic/useCommand";
import { CommandFilters } from "../hooks/useGetCommands";
import { Command } from "../types/Command";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import ListIcon from "./icons/ListIcon";
// import ClockIcon from "./icons/ClockIcon";
import SearchIcon from "./icons/SearchIcon";
// import UsersIcon from "./icons/UsersIcon";
import LinkIcon from "./icons/LinkIcon";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { ChatIcon } from "./icons/ChatIcon";
import AtIcon from "./icons/AtIcon";
import UsersIcon from "./icons/UsersIcon";

interface Props {
  commands: Array<Command>;
  setIsOpen: Function;
  isOpen?: boolean;
  noOpacity?: boolean;
  deactivated?: boolean;
  demo?: boolean;
}

const views = [
  {
    title: "All",
    name: CommandFilters.ALL,
    view: CommandFilters.ALL,
    icon: ListIcon,
  },
  {
    title: "Users",
    name: CommandFilters.USER,
    view: CommandFilters.USER,
    icon: UsersIcon,
  },
  {
    title: "Proposals",
    name: CommandFilters.PROPOSAL,
    view: CommandFilters.PROPOSAL,
    icon: ChatIcon,
  },
  {
    title: "Links",
    name: CommandFilters.LINK,
    view: CommandFilters.LINK,
    icon: LinkIcon,
  },
];

const contains = (query: string) => (str: string) =>
  str.toLowerCase().includes(query.toLowerCase());

const formatLinkCommand = (command: Command) =>
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

export default function CommandPalette({
  commands,
  isOpen = false,
  setIsOpen,
  noOpacity = false,
  demo = false,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const {
    options: filters,
    selected,
    next: nextFilter,
    prev: prevFilter,
  } = useSingleSelect(views);
  const filter = filters[selected].name;

  useCommand("k", setIsOpen, !isOpen);
  useCommand("/", setIsOpen, !isOpen);
  useCommand("ArrowLeft", prevFilter, filter);
  useCommand("ArrowRight", nextFilter, filter);

  const filteredCommands = commands
    .filter(({ type }) =>
      filter === CommandFilters.ALL
        ? !query
          ? type === CommandFilters.LINK
          : type
        : type === filter
    )
    .filter((option) => !query || contains(query)(option.name))
    .map(formatLinkCommand);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => {
        setQuery("");
      }}
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 mx-auto w-[70vw] overflow-y-auto p-4 pt-[25vh] lg:w-[50vw] xl:w-[50vw] 2xl:w-[40vw]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-300 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {noOpacity || (
            <Dialog.Overlay className="fixed inset-0 bg-gray-900/60" />
          )}
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          // leave="duration-200 ease-in"
          // leaveFrom="opacity-100 scale-100"
          // leaveTo="opacity-0 scale-95"
        >
          <Combobox
            value={undefined}
            onChange={(command: Command) => {
              if (!demo) {
                command.link && router.push(command.link);
                setIsOpen(false);
              }
            }}
            as="div"
            className="relative overflow-hidden rounded-lg bg-gray-50 shadow-xl shadow-black ring-1 ring-black/5"
          >
            <div className="flex flex-row justify-start bg-gray-300 text-gray-700">
              {views.map(({ title, view, icon }, i): any => (
                <div
                  key={i}
                  className={`flex w-full flex-row justify-start space-x-3 p-5 ${
                    filter === view && "bg-gray-50"
                  }`}
                  // set filter to
                  onClick={() =>
                    filters.forEach(
                      (filter) => filter.name === view && filter.toggle()
                    )
                  }
                >
                  {icon({})}
                  <p className="cursor-pointer font-light text-gray-700">
                    {title}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center space-x-2 border-b p-4 px-6">
              <div className="text-gray-800">
                <SearchIcon />
              </div>
              <Combobox.Input
                className="w-full border-0 border-white bg-transparent py-2 px-2 text-sm text-gray-800 placeholder-gray-400 outline-none"
                placeholder={demo ? "Good job!" : "Search the DAO..."}
                autoComplete="false"
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
            {filteredCommands.length > 0 ? (
              <Combobox.Options
                static
                className="max-h-96 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg px-2 py-4"
              >
                {filteredCommands.map((command, i) => (
                  <Combobox.Option value={command} key={i}>
                    {({ active }) => (
                      <div
                        className={`space-x-1 rounded-lg p-4 px-4 ${
                          active && " bg-gray-200"
                        }`}
                      >
                        <div
                          className={`flex flex-row justify-between text-gray-900 ${
                            command.className || ""
                          }`}
                        >
                          <div className="items-centers flex flex-row space-x-4 overflow-clip">
                            <div>{command.icon({ strokeWidth: 1 })}</div>
                            <div className="flex flex-row space-x-2 overflow-clip font-light">
                              <p className=" whitespace-nowrap">
                                {command.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            ) : (
              <div className="p-4">
                <p className="font-semibold  text-gray-600">
                  Nothing to see here...
                </p>
              </div>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
