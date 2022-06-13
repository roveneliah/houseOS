import axios from "axios";
const uri = "https://hub.snapshot.org/graphql";
const query = async (query: string) => {
  const x = await axios
    .post(uri, { query })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) => res.data.data.proposal)
    .catch((e) => console.log(e));
  return x;
};

const proposalQuery = (proposalId: string) => `query {
  proposal(id:"${proposalId}") {
    id
    title
    body
    choices
    start
    end
    snapshot
    state
    author
    created
    scores
    votes
    scores_by_strategy
    scores_total
    scores_updated
    plugins
    network
    strategies {
      name
      network
      params
    }
    space {
      id
      name
    }
  }
}`;

export const fetchProposal = async (proposalId: string) => {
  // console.log("fetchProposal", proposalId);
  // console.log(proposalQuery(proposalId));
  return await query(proposalQuery(proposalId));
};
