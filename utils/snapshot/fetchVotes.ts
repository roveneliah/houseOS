import axios from "axios";
const uri = "https://hub.snapshot.org/graphql";
const query = async (query: string) => {
  const x = await axios
    .post(uri, { query })
    .then((res) => res.data.data.votes)
    .catch((e) => console.log(e));
  return x;
};

const votesQuery = (proposalId: string) => `query {
  votes (
    first: 1000
    skip: 0
    where: {
      proposal: "${proposalId}"
    }
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    voter
    vp
    vp_by_strategy
    metadata
    vp_state
    created
    proposal {
      id
    }
    choice
    space {
      id
    }
  }
}`;

export const fetchVotes = async (proposalId: string) => {
  return await query(votesQuery(proposalId));
};
