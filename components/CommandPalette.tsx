import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useCommand } from "../hooks/generic/useCommand";
import { CommandFilters } from "../hooks/useGetCommands";
import { Command } from "../types/Command";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import ListIcon from "./icons/ListIcon";
import SearchIcon from "./icons/SearchIcon";
import LinkIcon from "./icons/LinkIcon";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { ChatIcon } from "./icons/ChatIcon";
import UsersIcon from "./icons/UsersIcon";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import windowsSlice from "@/features/windows/windowsSlice";

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
  const [query, setQuery] = useState("");

  const {
    options: filters,
    selected,
    next: nextFilter,
    prev: prevFilter,
  } = useSingleSelect(views);
  const filter = filters[selected].name;

  const { search: isOpen } = useAppSelector((state) => state.windows.open);
  const dispatch = useAppDispatch();
  const close = () =>
    dispatch({ type: "windows/close", payload: { windowName: "search" } });
  const toggle = () =>
    dispatch({ type: "windows/toggle", payload: { windowName: "search" } });

  useCommand("k", toggle);
  useCommand("/", toggle);
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
    .filter((option) => !query || contains(query)(option.name || ""))
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
        onClose={close}
        className="fixed inset-0 z-50 mx-auto w-[70vw] overflow-y-auto p-4 pt-[15vh] lg:w-[50vw] xl:w-[50vw] 2xl:w-[40vw]"
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
                command.link && router.push(command.link);
                close();
              }
            }}
            as="div"
            className="bg-base-100 relative overflow-hidden rounded-lg border-4 border-black font-mono shadow-lg shadow-black ring-1 ring-black/5"
          >
            <div className="bg-base-200 flex flex-row justify-start space-x-2 p-4 py-2 outline-none">
              <button
                onClick={close}
                className="btn-circle btn-xs border-4 border-black outline-none"
              ></button>
              <div className="btn-circle btn-xs border-4 border-black"></div>
            </div>
            {/* <div className="bg-base-200 flex flex-row justify-start text-gray-700">
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
            </div> */}
            <div className="flex flex-row items-center space-x-2 border-b p-2 px-6 font-mono">
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
                autoFocus={true}
              />
            </div>
            {filteredCommands.length > 0 ? (
              <Combobox.Options
                static
                className="no-scrollbar divide-base-200 max-h-96 divide-y overflow-hidden overflow-y-auto rounded-lg px-2 py-4"
              >
                {/* {filter === CommandFilters.ALL && (
                  <div className="flex flex-row items-center space-x-1 px-4 pb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <p className="text-xs">Favorites</p>
                  </div>
                )} */}
                {filteredCommands.map((command, i) => (
                  <Combobox.Option value={command} key={i}>
                    {({ active }) => (
                      <div
                        className={`space-x-1 rounded-lg py-2 px-4 ${
                          active && " bg-gray-300/50"
                        }`}
                      >
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
