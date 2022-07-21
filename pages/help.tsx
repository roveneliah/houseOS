import ClockIcon from "@/components/icons/ClockIcon";
import LockedIcon from "@/components/icons/LockedIcon";
import TagsList from "@/components/profiles/TagsList";
import { capitalize } from "@/components/ProposalHeader";
import { dao, defaultAvatar, proposalTags } from "@/config";
import { useGetUser } from "@/hooks/database/useGetUser";
import { useUserAddress } from "@/hooks/ethereum/useUserAddress";
import { useGetAllProposalTags } from "@/hooks/proposals/useGetAllProposalTags";
import { useGetUserProfile } from "@/hooks/users/useGetUserProfile";
import { Proposal, ProposalState } from "@/types/Proposal";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { prop } from "ramda";
import { useEffect, useState } from "react";
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

  return (
    <Layout>
      <div className="flex w-3/5 max-w-3xl flex-col space-y-16 pt-36">
        <div className="space-y-8">
          <p className="text-primary-content text-5xl font-semibold">Tags</p>
          <div className="flex flex-col space-y-6">
            <p className="text-xl font-normal">
              Tags help us{" "}
              <span className="text-warning font-semibold">gossip</span> to stay
              up to speed and get context on each other and proposals.
            </p>
            <p className="text-xl font-normal">
              You inherit the tags of anyone you follow.
            </p>
          </div>

          <div>
            <div className="flex flex-row space-x-1">
              {["User", "Proposal"].map((view) => (
                <div onClick={() => setView(view)}>
                  <p className="text-primary-content rounded-t-lg border-x border-t px-3 py-1">
                    {view}
                  </p>
                </div>
              ))}
            </div>

            {view === "User" && (
              <div className="w-full rounded-tr border-x border-t p-8 text-3xl font-semibold">
                <div className="flex w-full flex-row justify-between">
                  <div className="flex w-full flex-col items-start space-y-12">
                    <div className="flex w-full flex-row items-center justify-between">
                      <div className="flex w-full flex-col items-start justify-start space-y-4">
                        <div className="flex w-full flex-row space-x-2">
                          <div className="flex flex-row justify-start space-x-2">
                            <p className="border-success text-success min-w-fit rounded-full border px-3 py-1 text-sm font-semibold hover:bg-opacity-50">
                              Following
                            </p>
                            {/* <p className="whitespace-nowrap rounded-full border border-gray-100 px-3 py-1 text-sm font-semibold text-gray-100">
                        1200 $KRAUSE
                      </p> */}
                          </div>
                          <div className="flex flex-row space-x-1">
                            {exampleTags.slice(0, 3).map((tag) => (
                              <div
                                data-tip="gossip"
                                className="tooltip-warning tooltip"
                              >
                                <p className="border-warning text-warning whitespace-nowrap rounded-full border px-3 py-1 text-sm font-semibold">
                                  {tag.tag}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-left text-4xl font-bold text-gray-200">
                          {dao.memberName}
                        </p>
                      </div>
                      <div className="hidden rounded-full border-4 border-gray-400 lg:block">
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
                        .map((tag: any) => (
                          <div
                            data-tip="Tags help gain context."
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
      </div>
    </Layout>
  );
}
