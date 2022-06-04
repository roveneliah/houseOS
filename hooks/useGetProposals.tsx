import axios from "axios";
import { useEffect, useState } from "react";
import { Proposal } from "../types/Proposal";

const BASIC = ["For", "Against", "Abstain"];
const KRAUSE = ["For", "Abstain (For)", "Abstain (Against)", "Against"];
const uri = "https://hub.snapshot.org/graphql";
const query = async (query: string) => {
  const x = await axios
    .post(uri, { query })
    .then((res) => res.data.data.proposals)
    .catch((e) => console.log(e));
  return x;
};

const liveProposalsQuery = (space: string) => `query Proposals {
  proposals (
    first: 20,
    skip: 0,
    where: {
      space_in: ["${space}"],
    },
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    title
    body
    choices
    start
    end
    snapshot
    type
    state
    author
    scores
    scores_total
    votes
    space {
      id
      name
    }
  }
}`;
export const fetchProposals = async (space: string) =>
  await query(liveProposalsQuery(space));

export const useGetProposals = (snapshotSpace: string): Array<Proposal> => {
  //fetch from snapshotapi
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals(snapshotSpace).then(setProposals);
  }, []);

  return proposals;

  return [
    {
      title: "Buy a Big3 Team for 500k USDC",
      id: "0x36e24cc2763dfe043d0b2243ff90f7ad10b716e28351283a388776eb98094dc9",
      state: "open",
      author: "0x1234",
      body: "Let's buy a big 3 team homies",
      choices: BASIC,
    },
    {
      title: "Treasury Diversification: Token Swap Alliance Proposal",
      id: "0x26e24cc2763dfe043d0b2243ff90f7ad10b716e28351283a388776eb98094dc8",
      state: "open",
      author: "0x1234",
      body: `Proposal
      Swap $25,000 worth of $KRAUSE (30-day TWAP) for:
      
      $5,000 of $FF
      $5,000 of $HAUS
      $5,000 of $CABIN
      $5,000 of $YUP
      $5,000 of $BANK
      All of which will have a 3 year lock up.
      
      TWAP = Time Weighted Average Price`,
      choices: KRAUSE,
    },
    {
      title: "Do it",
      id: "0x16e24cc2763dfe043d0b2243ff90f7ad10b716e28351283a388776eb98094dc4",
      state: "open",
      author: "0x1234",
      choices: BASIC,
      body: `Proposal
      Swap $25,000 worth of $KRAUSE (30-day TWAP) for:
      
      $5,000 of $FF
      $5,000 of $HAUS
      $5,000 of $CABIN
      $5,000 of $YUP
      $5,000 of $BANK
      All of which will have a 3 year lock up.
      
      TWAP = Time Weighted Average Price`,
    },
  ];
};
