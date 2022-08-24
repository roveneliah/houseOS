import { Fragment, ReactNode, useState } from "react";
import { useCommand } from "../../hooks/generic/useCommand";
import { CommandFilters } from "../../hooks/useGetCommands";
import { Command } from "../../types/Command";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import SearchIcon from "../icons/SearchIcon";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { close, launch, toggle } from "@/redux/features/windows/windowsSlice";
import { useRouter } from "next/router";
import { any } from "ramda";
import { contains } from "../../utils/contains";
import { views } from "./views";
import { formatLinkCommand } from "./formatLinkCommand";
import { pageview, event } from "@/utils/google-analytics";

interface Props {
  commands: Array<Command>;
  noOpacity?: boolean;
  deactivated?: boolean;
}

export default function CommandPalette({ commands, noOpacity = false }: Props) {
  const router = useRouter();
  const searchView = useAppSelector((state) => state.windows.searchView);
  const { search: isOpen } = useAppSelector((state) => state.windows.open);
  const [query, setQuery] = useState("");

  const dispatch = useAppDispatch();
  const closeSearch = () => {
    dispatch(close({ windowName: "search" }));
    // setQuery("");
  };
  const toggleSearch = () => {
    dispatch(toggle({ windowName: "search" }));
    // setQuery("");
  };
  const launchApp = (app: ReactNode) => dispatch(launch(app));

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
          ? type === CommandFilters.LINK
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
        className="fixed bottom-[0vh] z-40 mx-auto flex w-full flex-col justify-end overflow-y-auto sm:inset-[15vh] sm:h-fit sm:w-[70vw] sm:flex-none lg:w-[50vw] xl:w-[50vw] 2xl:w-[40vw]"
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
          className="flex h-full flex-col justify-end space-y-4"
        >
          <Combobox
            value={undefined}
            onChange={(command: Command) => {
              command.app
                ? launchApp(command.app)
                : command.link && window.open(command.link);

              command.link && event(command.link, { name: command.name });

              closeSearch();
            }}
            as="div"
            className="border-base-content  bg-base-100 d group relative flex h-screen flex-col justify-end overflow-hidden overflow-y-auto font-mono ring-1 ring-black/5 sm:h-auto sm:max-h-fit sm:rounded-lg sm:border-4 sm:shadow-black"
          >
            <div className="bg-base-200 hidden flex-row justify-start space-x-2 p-4 py-2 outline-none sm:flex">
              <button
                onClick={closeSearch}
                className="btn-circle btn-xs border-base-content border-4 outline-none"
              ></button>
              <div className="btn-circle btn-xs border-base-content border-4"></div>
            </div>
            <div className="bg-base-200 border-base-content order-2 flex flex-row justify-start overflow-x-scroll border-t-0 text-gray-700 group-target:hidden group-open:hidden group-focus-visible:hidden sm:order-2 sm:border-t">
              {views.map(({ title, view, icon }, i): any => (
                <div
                  key={i}
                  className={`flex w-full flex-row items-center justify-start space-x-2 px-5 py-3 ${
                    filter === view && "bg-base-100"
                  } ${i === 0 && "hidden sm:flex"}`}
                  onClick={() =>
                    filters.forEach(
                      (filter) => filter.name === view && filter.toggle()
                    )
                  }
                >
                  {icon({ strokeWidth: 1 })}
                  <p className="cursor-pointer py-1 text-sm font-normal text-gray-700">
                    {title}
                  </p>
                </div>
              ))}
            </div>
            <div className="order-2 hidden flex-row items-center space-x-2 border-b border-t-0 p-2 px-6 font-mono sm:order-2 sm:flex">
              <div className="text-gray-800">
                <SearchIcon />
              </div>
              <Combobox.Input
                className="w-full border-0 border-white bg-transparent py-2 px-2 text-sm text-gray-800 placeholder-gray-400 outline-none"
                placeholder={"Search the DAO..."}
                displayValue={() => query}
                autoComplete="false"
                autoFocus={true}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
            <div className="order-1 sm:order-3">
              {filter === CommandFilters.USER ? (
                <div className="p-4">
                  <p className="px-4 font-semibold text-gray-600">
                    Coming soon...
                  </p>
                </div>
              ) : filteredCommands.length > 0 ? (
                <Combobox.Options
                  static
                  className="no-scrollbar divide-base-200 h-fit max-h-[90vh] justify-end divide-y overflow-hidden overflow-y-scroll border-black px-2 py-4 sm:max-h-96 sm:justify-start sm:rounded-lg sm:border-t sm:border-t-0"
                >
                  <div className="flex min-h-0 flex-col-reverse sm:flex-col">
                    {filteredCommands.map((command, i) => (
                      <Combobox.Option value={command} key={i}>
                        {({ active }) => (
                          <div
                            className={`space-x-1 rounded-lg py-3 px-4 ${
                              active && " bg-gray-300/50"
                            }`}
                          >
                            <a
                              href={command.link}
                              target="_blank"
                              className="outline-none"
                            >
                              <div
                                className={`text-neutral-content flex flex-row items-center justify-start space-x-2 ${
                                  command.className || ""
                                }`}
                              >
                                <div>{command.icon({ strokeWidth: 1 })}</div>
                                <p className="text-ellipses whitespace-nowrap text-sm">
                                  {command.name}
                                </p>
                              </div>
                            </a>
                          </div>
                        )}
                      </Combobox.Option>
                    ))}
                  </div>
                </Combobox.Options>
              ) : (
                <div className="p-4">
                  <p className="px-4 font-semibold text-gray-600">
                    Nothing to see here...
                  </p>
                </div>
              )}
            </div>
            <div className="text-neutral-content bg-base-200 hidden flex-row items-center space-x-2 px-3 py-2 sm:order-4 sm:flex">
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
