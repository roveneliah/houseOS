import axios from "axios";

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
    first: 50,
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
