import ClockIcon from "@/components/icons/ClockIcon";
import LockedIcon from "@/components/icons/LockedIcon";
import { capitalize } from "@/utils/capitalize";
import { dao, defaultAvatar, proposalTags } from "@/config";
import { useOnKeydown } from "@/hooks/generic/useCommand";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { Proposal, ProposalState } from "@/types/Proposal";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { prop } from "ramda";
import { useState } from "react";
const Layout = dynamic(() => import("../components/Layout"));

const exampleTags: { tag: string }[] = [
  "Good Person",
  "Total Scammer",
  "DAO Expert",
].map((tag: string) => ({
  tag,
}));

const proposal: Proposal = {
  author: "asdfasdf",
  title: "Swap Treasury assets into Dogecoin",
  body: "This is definitely a good idea.",
  id: "0123",
  state: ProposalState.Active,
  choices: ["For", "Against", "Redraft Proposal"],
  space: "krausehouse.eth",
  scores_total: 12430,
  scores: [9045, 1200, 2185],
  votes: 55,
  start: 420,
  end: 69,
};
const tags = ["This is", "the worst", "idea."].map((tag: string) => ({
  tag,
  taggers: [],
}));

export default function Help() {
  const [view, setView] = useState("User");

  const faqDirectory = ["Search", "Tags"];
  const { options, selected, next, prev } = useSingleSelect(
    faqDirectory.map((entry) => ({
      name: entry,
    }))
  );

  const menu = ["Proposals", `${dao.memberName}s`, "Links"];
  const {
    next: menuNext,
    prev: menuPrev,
    selected: menuIndex,
  } = useSingleSelect(menu.map((name) => ({ name })));

  useOnKeydown("ArrowDown", menuNext);
  useOnKeydown("ArrowRight", menuNext);
  useOnKeydown("ArrowUp", menuPrev);
  useOnKeydown("ArrowLeft", menuPrev);
  useOnKeydown("w", prev);
  useOnKeydown("a", prev);
  useOnKeydown("s", next);
  useOnKeydown("d", next);

  const router = useRouter();
  useOnKeydown("1", () => router.push("/proposals"));
  useOnKeydown("2", () => {}); // TODO: open search to specific pane
  useOnKeydown("3", () => {});

  return (
    <Layout>
      <div className="flex w-full flex-col space-y-12 px-16 pt-24">
        <div className="flex w-full flex-col space-y-4">
          <p className="text-6xl font-bold">Help</p>
          <div className="flex basis-1/5 flex-row space-x-4">
            {faqDirectory.map((view, i) => (
              <p
                className={`${
                  selected === i && "text-info"
                } hover:text-info cursor-pointer text-xl`}
                onClick={() => options[i].toggle()}
              >
                {view}
              </p>
            ))}
          </div>
        </div>
        <div className="no-scrollbar max-w-4/5 flex h-[80vh] flex-col space-y-36 overflow-y-auto overflow-x-clip">
          {options[selected].name === "Search" && (
            <div className="w-full space-y-8">
              <div className="flex flex-col space-y-1">
                <p className="text-base-content text-3xl font-semibold">
                  Search
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-xl font-normal">
                  <span className="text-info font-semibold">
                    Search is your map
                  </span>{" "}
                  around the DAO.
                </p>
                <p className="text-xl font-normal">
                  You can find all{" "}
                  <span className="text-info font-semibold">links</span>,{" "}
                  <span className="text-info font-semibold">
                    {dao.memberName}s
                  </span>
                  , and{" "}
                  <span className="text-info font-semibold">proposals</span>{" "}
                  from search.
                </p>
                <p className="text-xl font-normal">
                  Open it anywhere using{" "}
                  <span className="text-info font-semibold">⌘k</span> or{" "}
                  <span className="text-info font-semibold">ctrl k</span> .
                </p>
              </div>
              {/* <div className="flex w-fit flex-col space-y-2">
                {menu.map((item: string, i: number) => (
                  <div
                    // ${ menuIndex === i && "text-gray-50"}
                    className={`flex cursor-pointer flex-row items-center space-x-2 hover:text-gray-50`}
                  >
                    <span className="kbd kbd-sm border">{i + 1}</span>
                    <p className="text-md font-normal">{item}</p>
                  </div>
                ))}
              </div> */}
            </div>
          )}

          {/*
          {options[selected].name === "Navigation" && (
            <div className="w-full space-y-8">
              <p className="text-primary-content text-5xl font-semibold">
                Navigation
              </p>
              <div className="flex flex-col space-y-2">
                <p className="text-xl font-normal">
                  <span className="text-info font-semibold">
                    Search is your map
                  </span>{" "}
                  around the DAO.
                </p>

                <p className="text-xl font-normal">
                  Open it anywhere using{" "}
                  <span className="text-info font-semibold">⌘k</span> or{" "}
                  <span className="text-info font-semibold">ctrl k</span> .
                </p>
              </div>
            </div>
          )}
          */}

          {options[selected].name === "Tags" && (
            <div className="space-y-8">
              <p className="text-base-content text-3xl font-semibold">Tags</p>
              <div className="flex flex-col space-y-2">
                <p className="text-xl font-normal">
                  Tags help us{" "}
                  <span className="text-warning font-semibold">gossip</span> to
                  get context on each other and proposals.
                </p>
                <p className="text-xl font-normal">
                  When you tag something, anyone following you will see those
                  tags.
                </p>
              </div>

              <div className="">
                <div className="flex cursor-pointer flex-row space-x-1">
                  {["User", "Proposal"].map((viewName) => (
                    <div onClick={() => setView(viewName)}>
                      <p
                        className={`${
                          view === viewName && "bg-base-content text-base-100"
                        } text-base-content border-base-content rounded-t-lg border-x border-t px-3 py-1`}
                      >
                        {viewName}
                      </p>
                    </div>
                  ))}
                </div>

                {view === "User" && (
                  <div className="border-base-content w-full rounded-tr border-x border-t p-8 text-3xl font-semibold">
                    <div className="flex w-full flex-row justify-between">
                      <div className="flex w-full flex-col items-start space-y-12">
                        <div className="flex w-full flex-row items-center justify-between">
                          <div className="flex w-full flex-col items-start justify-start space-y-4">
                            <div className="flex w-full flex-row space-x-2">
                              <div className="flex flex-row justify-start space-x-2">
                                <p className="border-success text-success min-w-fit rounded-full border px-3 py-1 text-sm font-semibold hover:bg-opacity-50">
                                  Following
                                </p>
                              </div>
                              <div className="flex flex-row space-x-1">
                                {exampleTags.slice(0, 3).map((tag, i) => (
                                  <div
                                    data-tip={`${
                                      ["Commodore", "Flex Chapman", "Mario"][
                                        i % 3
                                      ]
                                    } and ${
                                      Math.floor(Math.random() * 10) + 2
                                    } others.`}
                                    className="tooltip-warning tooltip"
                                  >
                                    <p className="border-warning text-warning whitespace-nowrap rounded-full border px-3 py-1 text-sm font-semibold">
                                      {tag.tag}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <p className="text-base-content text-left text-4xl font-bold">
                              {dao.memberName}
                            </p>
                          </div>
                          <div className="hidden rounded-full border-gray-400 lg:block">
                            <Image
                              src={defaultAvatar}
                              width={150}
                              height={150}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {view === "Proposal" && (
                  <div className="text-primary-content flex w-full flex-col items-start space-y-10 rounded-tr border-x border-t p-8">
                    <div className="flex w-full flex-col space-y-6">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex w-full flex-row items-center space-x-6">
                          {!!proposal.state &&
                            (proposal.state === "closed" ? (
                              <div className="text-error flex flex-row space-x-1 p-1 font-light">
                                <LockedIcon strokeWidth={1} />
                                <p className="">{capitalize(proposal.state)}</p>
                              </div>
                            ) : (
                              <div className="text-success flex flex-row space-x-1 p-1 font-light">
                                <ClockIcon strokeWidth={1} />
                                <p className="">{capitalize(proposal.state)}</p>
                              </div>
                            ))}

                          <div className="flex flex-row space-x-2">
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
                                d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                              />
                            </svg>
                            <p className="text-primary-content whitespace-nowrap font-light">
                              {proposal.votes} Votes
                            </p>
                          </div>
                        </div>
                        <div className=" flex min-h-full flex-row items-center space-x-2 font-semibold">
                          {tags
                            .map(prop("tag"))
                            .slice(0, 3)
                            .map((tag: any, i: number) => (
                              <div
                                data-tip={`${
                                  ["Commodore", "Flex Chapman", "Mario"][i % 3]
                                } and ${Math.floor(
                                  Math.random() * 10 + 2
                                )} others.`}
                                className="tooltip-warning tooltip"
                              >
                                <p className="border-warning text-warning whitespace-nowrap rounded-full border py-1 px-3 text-sm">
                                  {tag}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-4">
                        <p className="text-left text-4xl font-semibold">
                          {proposal.title}
                        </p>
                        <p className="text-left text-xl font-light">
                          {proposal.body}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="absolute left-8 bottom-8">
        <div className="flex w-full justify-center">
          <kbd className="kbd">w</kbd>
        </div>
        <div className="flex w-full justify-center gap-1">
          <kbd className="kbd">a</kbd>
          <kbd className="kbd">s</kbd>
          <kbd className="kbd">d</kbd>
        </div>
      </div> */}
    </Layout>
  );
}
