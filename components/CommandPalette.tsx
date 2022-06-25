import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useCommand } from "../hooks/generic/useCommand";
import { CommandFilters } from "../hooks/useGetCommands";
import { Command } from "../types/Command";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import ListIcon from "./icons/ListIcon";
import ClockIcon from "./icons/ClockIcon";
import SearchIcon from "./icons/SearchIcon";
import UsersIcon from "./icons/UsersIcon";
import LinkIcon from "./icons/LinkIcon";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { ChatIcon } from "./icons/ChatIcon";

interface Props {
  commands: Array<Command>;
  setIsOpen: Function;
  isOpen?: boolean;
  noOpacity?: boolean;
  deactivated?: boolean;
  demo?: boolean;
}

export default function CommandPalette({
  commands,
  isOpen = false,
  setIsOpen,
  noOpacity = false,
  deactivated = false,
  demo = false,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  // const [filter, setFilter] = useState(CommandFilters.ALL);

  const {
    options: filters,
    selected,
    next: nextFilter,
    prev: prevFilter,
  } = useSingleSelect([
    { name: CommandFilters.ALL, icon: ListIcon },
    { name: CommandFilters.PROPOSAL, icon: ChatIcon },
    { name: CommandFilters.LINK, icon: LinkIcon },
    { name: CommandFilters.USER, icon: UsersIcon },
  ]);
  const filter = filters[selected].name;
  // const nextFilter = (filter: CommandFilters) => {
  //   switch (filter) {
  //     case CommandFilters.ALL:
  //       setFilter(CommandFilters.PROPOSAL);
  //       break;
  //     case CommandFilters.PROPOSAL:
  //       setFilter(CommandFilters.LINK);
  //       break;
  //     case CommandFilters.LINK:
  //       setFilter(CommandFilters.USER);
  //       break;
  //     case CommandFilters.USER:
  //       setFilter(CommandFilters.ALL);
  //       break;
  //   }
  // };
  // const prevFilter = (filter: CommandFilters) => {
  //   switch (filter) {
  //     case CommandFilters.ALL:
  //       setFilter(CommandFilters.USER);
  //       break;
  //     case CommandFilters.PROPOSAL:
  //       setFilter(CommandFilters.ALL);
  //       break;
  //     case CommandFilters.LINK:
  //       setFilter(CommandFilters.PROPOSAL);
  //       break;
  //     case CommandFilters.USER:
  //       setFilter(CommandFilters.LINK);
  //       break;
  //   }
  // };
  useCommand("k", setIsOpen, !isOpen);
  useCommand("ArrowLeft", prevFilter, filter);
  useCommand("ArrowRight", nextFilter, filter);

  const filteredCommands = commands
    .filter(({ type }) =>
      filter === CommandFilters.ALL ? type : type === filter
    )
    .filter((option) =>
      query ? option.name.toLowerCase().includes(query.toLowerCase()) : option
    );

  const views = [
    { name: "All", view: CommandFilters.ALL, icon: ListIcon },
    { name: "Proposals", view: CommandFilters.PROPOSAL, icon: ChatIcon },
    { name: "Links", view: CommandFilters.LINK, icon: LinkIcon },
    { name: "Users", view: CommandFilters.USER, icon: UsersIcon },
  ];

  const getIcon = (commandType: string) =>
    commandType === "PROPOSAL" ? (
      <ChatIcon />
    ) : commandType === "LINK" ? (
      <LinkIcon />
    ) : commandType === "USER" ? (
      <UsersIcon />
    ) : undefined;

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
        className="fixed inset-0 z-50 mx-auto max-w-[50vw] overflow-y-auto p-4 pt-[25vh] "
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
          )}
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 sacle-95"
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
            className="relative overflow-hidden rounded-lg bg-gray-50 shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex flex-row justify-start bg-gray-300 text-gray-700">
              {views.map(({ name, view, icon }, i): any => (
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
                  <p className="cursor-pointer font-normal text-gray-700">
                    {name}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center space-x-2 p-4">
              <div className="text-gray-800">
                <SearchIcon />
              </div>
              <Combobox.Input
                className="focus:ring-5 h-12 w-full border-0 border-white bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-0"
                placeholder={demo ? "Good job!" : "Search..."}
                autoComplete="false"
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
            {filteredCommands.length > 0 ? (
              <Combobox.Options
                static
                className="max-h-96 divide-y divide-gray-100 overflow-y-auto"
              >
                {filter === CommandFilters.ALL && query === ""
                  ? []
                  : filteredCommands.map((command, i) => (
                      <Combobox.Option value={command} key={i}>
                        {({ active }) => (
                          <div
                            className={`space-x-1 p-4 px-6 ${
                              active && "bg-gray-200"
                            }`}
                          >
                            <div className="flex flex-row justify-between text-gray-800">
                              <div className="items-centers flex flex-row space-x-4">
                                {filter === CommandFilters.ALL && (
                                  <div>{getIcon(command.type)}</div>
                                )}

                                <div className="flex flex-row space-x-2">
                                  {/* <p className="badge badge-mid">⌘{i}</p> */}
                                  <p className="font-normal text-gray-800">
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

// [[ARCHIVED]]
// useEffect(() => {
//   function onKeydown(event: any) {
//     event.key === "k" &&
//       (event.metaKey || event.ctrlKey) &&
//       setIsOpen(!isOpen);
//   }
//   window.addEventListener("keydown", onKeydown);
//   return () => window.removeEventListener("keydown", onKeydown);
// }, [isOpen]);
// useEffect(() => {
//   function onKeydown(event: any) {
//     event.key === "ArrowLeft" &&
//       (event.metaKey || event.ctrlKey) &&
//       prevFilter(filter);
//     event.key === "ArrowRight" &&
//       (event.metaKey || event.ctrlKey) &&
//       nextFilter(filter);
//   }
//   window.addEventListener("keydown", onKeydown);
//   return () => {
//     window.removeEventListener("keydown", onKeydown);
//   };
// }, [filter]);
