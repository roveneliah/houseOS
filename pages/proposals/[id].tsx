import type { NextPage, NextPageContext } from "next";
import { useState } from "react";
import ChoiceFilters from "../../components/FilterTabs";
import ProposalHeader from "../../components/ProposalHeader";
import CommentList from "../../components/CommentList";
import CommentView from "../../components/CommentView";
import { useGetComments } from "../../hooks/proposals/useGetComments";
import { Comment } from "../../types/Comment";
import Layout from "../../components/Layout";
import { Proposal } from "../../types/Proposal";
import { snapshotSpace } from "../../config";
import { fetchProposals } from "../../utils/fetchProposals";
import { fetchProposal } from "../../utils/fetchProposal";
import { useGetVotes } from "../../hooks/proposals/useGetVotes";

enum View {
  Comment = "Comment",
  CommentList = "CommentList",
}

const ProposalPage: NextPage = ({ proposal }: any) => {
  const [view, setView] = useState(View.CommentList);
  const comments: Array<Comment> = useGetComments(proposal.id);
  const [selectedChoice, setSelectedChoice] = useState(0);
  const votes: Array<Comment> = useGetVotes(proposal.id);

  return (
    <Layout>
      <div className="flex w-full flex-col items-start space-y-10 bg-gray-800 px-72 pt-20">
        <ProposalHeader proposal={proposal} />
        <ChoiceFilters
          proposal={proposal}
          selectedChoice={selectedChoice}
          setSelectedChoice={setSelectedChoice}
        />
      </div>
      <div className="items flex w-full flex-col items-start bg-gray-500 px-72 pt-20">
        <div className="flex w-full flex-col space-y-4 pt-4">
          {view === View.CommentList && (
            <CommentList
              toggleCommentView={() => setView(View.Comment)}
              comments={comments}
              proposal={proposal}
              choice={selectedChoice}
              votes={votes}
            />
          )}
          {view === View.Comment && (
            <CommentView
              proposal={proposal}
              choice={selectedChoice}
              back={() => setView(View.CommentList)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  // const proposals = await fetchProposals(snapshotSpace); // TODO: fetch singular from a cache
  // const proposal: Proposal = proposals.find((p) => p.id === params.id);

  const proposal = await fetchProposal(params.id);
  console.log(proposal);

  return {
    props: {
      proposal,
    },
  };
}

export async function getStaticPaths() {
  const proposals = await fetchProposals(snapshotSpace);
  const paths = proposals.map((proposal: Proposal) => ({
    params: { id: proposal.id },
  }));
  return { paths, fallback: false };
}

export default ProposalPage;
