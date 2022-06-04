import { Proposal } from "../types/Proposal";

export const useGetProposals = (): Array<Proposal> => {
  return [
    {
      title: "Buy a Big3 Team for 500k USDC",
      id: "0x36e24cc2763dfe043d0b2243ff90f7ad10b716e28351283a388776eb98094dc9",
      state: "open",
      author: "0x1234",
      body: "Let's buy a big 3 team homies",
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
    },
    {
      title: "Do it",
      id: "0x16e24cc2763dfe043d0b2243ff90f7ad10b716e28351283a388776eb98094dc4",
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
    },
  ];
};
