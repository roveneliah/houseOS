import axios from "axios";
import { EthereumAddress } from "../../types/EthereumAddress";
const uri = "https://hub.snapshot.org/graphql";
const query = async (query: string) => {
  const x = await axios
    .post(uri, { query })
    .then((res) => res.data.data.votes)
    .catch((e) => console.log(e));
  return x;
};

const voteQuery = (proposalId: string, voter: EthereumAddress) => `query {
  votes (
    first: 1000
    skip: 0
    where: {
      proposal: "${proposalId}"
      voter: "${voter}"
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

export const fetchVote = async ({
  proposalId,
  voter,
}: {
  proposalId: string;
  voter: EthereumAddress;
}) => {
  return await query(voteQuery(proposalId, voter));
};
