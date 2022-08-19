import { Fragment, ReactNode, useState } from "react";
import { useCommand } from "../../hooks/generic/useCommand";
import { CommandFilters } from "../../hooks/useGetCommands";
import { Command } from "../../types/Command";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import ListIcon from "../icons/ListIcon";
import SearchIcon from "../icons/SearchIcon";
import LinkIcon from "../icons/LinkIcon";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { ChatIcon } from "../icons/ChatIcon";
import UsersIcon from "../icons/UsersIcon";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { close, launch, toggle } from "@/redux/features/windows/windowsSlice";
import { useRouter } from "next/router";
import { any, anyPass } from "ramda";

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

interface Props {
  commands: Array<Command>;
  noOpacity?: boolean;
  deactivated?: boolean;
  demo?: boolean;
}

export default function CommandPalette({
  commands,
  noOpacity = false,
  demo = false,
}: Props) {
  const router = useRouter();
  const searchView = useAppSelector((state) => state.windows.searchView);
  const { search: isOpen } = useAppSelector((state) => state.windows.open);
  const dispatch = useAppDispatch();
  const closeSearch = () => dispatch(close({ windowName: "search" }));
  const toggleSearch = () => dispatch(toggle({ windowName: "search" }));
  const launchApp = (app: ReactNode) => dispatch(launch(app));

  const [query, setQuery] = useState("");

  const {
    options: filters,
    selected,
    next: nextFilter,
    prev: prevFilter,
  } = useSingleSelect(views);

  const filter = filters[selected].name;

  useCommand("k", toggleSearch);
  useCommand("/", toggleSearch);
  useCommand("ArrowLeft", prevFilter, filter);
  useCommand("ArrowRight", nextFilter, filter);

  const filteredCommands = commands
    .filter(({ type, favorite }) =>
      filter === CommandFilters.ALL
        ? !query
          ? type === CommandFilters.LINK && favorite
          : type
        : type === filter
    )
    .filter(
      (option) =>
        !query ||
        contains(query)(option.name || "") ||
        any(contains(query))(option.keywords || [])
    )
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
        onClose={closeSearch}
        className="fixed inset-[15vh] z-50 mx-auto h-fit w-[70vw] overflow-y-auto  lg:w-[50vw] xl:w-[50vw] 2xl:w-[40vw]"
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
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="flex flex-col space-y-4"
        >
          {demo && (
            <>
              <p className="alert bg-primary-content text-neutral">
                <div className="flex flex-col items-start">
                  <div className="flex flex-row justify-start space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <p className="text-md">
                      Use{" "}
                      <span className="text-neutral mx-1 cursor-none rounded-lg bg-gray-300 px-2 py-1 text-sm">
                        ⌘→
                      </span>{" "}
                      and{" "}
                      <span className="text-neutral mx-1 cursor-none rounded-lg bg-gray-300 px-2 py-1 text-sm">
                        ⌘←
                      </span>{" "}
                      to switch between filters.
                    </p>
                  </div>
                  <p className="px-7 text-xs">
                    Note: actions are disabled for the demo.
                  </p>
                </div>
              </p>
            </>
          )}
          <Combobox
            value={undefined}
            onChange={(command: Command) => {
              if (!demo) {
                command.app
                  ? launchApp(command.app)
                  : command.link && router.push(command.link);

                closeSearch();
              }
            }}
            as="div"
            className="bg-base-100 border-base-content relative overflow-hidden rounded-lg border-4 font-mono shadow-lg shadow-black ring-1 ring-black/5"
          >
            <div className="bg-base-200 flex flex-row justify-start space-x-2 p-4 py-2 outline-none">
              <button
                onClick={closeSearch}
                className="btn-circle btn-xs border-base-content border-4 outline-none"
              ></button>
              <div className="btn-circle btn-xs border-base-content border-4"></div>
            </div>
            <div className="bg-base-200 border-base-content flex flex-row justify-start border-t text-gray-700">
              {views.map(({ title, view, icon }, i): any => (
                <div
                  key={i}
                  className={`flex w-full flex-row items-center justify-start space-x-2 px-5 py-3 ${
                    filter === view && "bg-base-100"
                  }`}
                  // set filter to
                  onClick={() =>
                    filters.forEach(
                      (filter) => filter.name === view && filter.toggle()
                    )
                  }
                >
                  {icon({ strokeWidth: 1 })}
                  <p className="cursor-pointer text-xs font-normal text-gray-700">
                    {title}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center space-x-2 border-b p-2 px-6 font-mono">
              <div className="text-gray-800">
                <SearchIcon />
              </div>
              <Combobox.Input
                className="w-full border-0 border-white bg-transparent py-2 px-2 text-sm text-gray-800 placeholder-gray-400 outline-none"
                placeholder={demo ? "Good job!" : "Search the DAO..."}
                autoComplete="false"
                autoFocus={true}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
            {filteredCommands.length > 0 ? (
              <Combobox.Options
                static
                className="no-scrollbar divide-base-200 max-h-96 divide-y overflow-hidden overflow-y-auto rounded-lg px-2 py-4"
              >
                {filteredCommands.map((command, i) => (
                  <Combobox.Option value={command} key={i}>
                    {({ active }) => (
                      <div
                        className={`space-x-1 rounded-lg py-2 px-4 ${
                          active && " bg-gray-300/50"
                        }`}
                      >
                        <a href={command.link} target="_blank">
                          <div
                            className={`text-neutral-content flex flex-row items-center justify-start space-x-2 ${
                              command.className || ""
                            }`}
                          >
                            <div>{command.icon({ strokeWidth: 1 })}</div>
                            <p className="text-ellipses whitespace-nowrap text-xs">
                              {command.name}
                            </p>
                          </div>
                        </a>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            ) : (
              <div className="p-4">
                <p className="px-4 font-semibold text-gray-600">
                  Nothing to see here...
                </p>
              </div>
            )}
            <div className="text-neutral-content bg-base-200 flex flex-row items-center space-x-2 px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <p className="text-xs">
                Use{" "}
                <span className="text-neutral-content mx-1 cursor-none rounded-lg">
                  ⌘→
                </span>{" "}
                and{" "}
                <span className="text-neutral-content mx-1 cursor-none rounded-lg">
                  ⌘←
                </span>{" "}
                to switch between filters.
              </p>
            </div>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
