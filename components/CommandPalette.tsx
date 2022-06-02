import { Dialog, Combobox, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import SearchIcon from "./icons/SearchIcon";

const createLink = (name: string, link: string) => ({
  name,
  link,
  type: "LINK",
});
const commands = [
  createLink(
    "Treasury (Etherscan)",
    "https://etherscan.io/address/0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2"
  ),
  createLink("Discord", ""),
  createLink("Twitter", "https://twitter.com/krausehousedao"),
  createLink("Website", "https://krausehouse.club"),
  { name: "Wallet", action: () => console.log("WALLET"), type: "PAGE" },
  { name: "Proposals", action: () => console.log("Proposals"), type: "PAGE" },
  { name: "Treasury", action: () => console.log("Treasury"), type: "PAGE" },
];

enum Filters {
  ALL = "ALL",
  PROPOSAL = "PROPOSAL",
  PAGE = "PAGE",
  LINK = "LINK",
}

export default function CommandPalette({}: any) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(Filters.ALL);

  const filteredCommands = commands
    .filter(({ type }) => (filter === Filters.ALL ? type : type === filter))
    .filter((option) =>
      query ? option.name.toLowerCase().includes(query.toLowerCase()) : option
    );

  useEffect(() => {
    function onKeydown(event: any) {
      event.key === "k" &&
        (event.metaKey || event.ctrlKey) &&
        setIsOpen(!isOpen);
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen]);

  useEffect(() => {
    function onKeydown(event: any) {
      event.key === "1" && event.ctrlKey && setFilter(Filters.ALL);
      event.key === "2" && event.ctrlKey && setFilter(Filters.PROPOSAL);
      event.key === "3" && event.ctrlKey && setFilter(Filters.PAGE);
      event.key === "4" && event.ctrlKey && setFilter(Filters.LINK);
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [filter]);

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
        className="fixed inset-0 mx-auto max-w-[50vw] overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-300 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
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
            onChange={(command: any) => {
              // navigate if link, otherwise execute command?
              command.link && router.push(command.link);
            }}
            as="div"
            className="relative overflow-hidden rounded-lg bg-gray-50 shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex flex-row justify-start bg-gray-300">
              <div
                className={`flex w-full flex-row justify-start space-x-3 p-5 ${
                  filter === Filters.ALL && "bg-gray-50"
                }`}
                onClick={() => setFilter(Filters.ALL)}
              >
                <p className="badge badge-mid">⌃1</p>
                <p className={` cursor-pointer font-semibold text-gray-700`}>
                  All
                </p>
              </div>
              <div
                className={`flex w-full flex-row justify-start space-x-3 p-5 ${
                  filter === Filters.PROPOSAL && "bg-gray-50"
                }`}
                onClick={() => setFilter(Filters.PROPOSAL)}
              >
                <p className="badge badge-mid">⌃2</p>
                <p className={` cursor-pointer font-semibold text-gray-700`}>
                  Proposals
                </p>
              </div>
              <div
                className={`flex w-full flex-row justify-start space-x-3  p-5 ${
                  filter === Filters.PAGE && "bg-gray-50"
                }`}
                onClick={() => setFilter(Filters.PAGE)}
              >
                <p className="badge badge-mid">⌃3</p>
                <p className={` cursor-pointer font-semibold text-gray-700`}>
                  Pages
                </p>
              </div>
              <div
                className={`flex w-full flex-row justify-start space-x-3 p-5 ${
                  filter === Filters.LINK && "bg-gray-50"
                }`}
                onClick={() => setFilter(Filters.LINK)}
              >
                <p className="badge badge-mid">⌃4</p>
                <p className={` cursor-pointer font-semibold text-gray-700`}>
                  Links
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2 p-4">
              <SearchIcon />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:ring-0"
                placeholder="Search..."
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
            {filteredCommands.length > 0 ? (
              <Combobox.Options
                static
                className="max-h-96 divide-y divide-gray-100 overflow-y-auto py-8"
              >
                {filteredCommands.map((command, i) => (
                  <Combobox.Option
                    onClick={command.action || (() => {})}
                    value={command}
                  >
                    {({ active }) => (
                      <div
                        className={`space-x-1 p-4 ${active && "bg-gray-200"}`}
                      >
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-row space-x-2">
                            <p className="badge badge-mid">⌘{i}</p>
                            <p className="font-semibold text-gray-800">
                              {command.name}
                            </p>
                          </div>
                          <p className="badge badge-dark">{command.type}</p>
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
