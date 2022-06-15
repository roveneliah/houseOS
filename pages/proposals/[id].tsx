import type { NextPage, NextPageContext } from "next";
import { useState } from "react";
import ChoiceFilters from "../../components/FilterTabs";
import ProposalHeader from "../../components/ProposalHeader";
import CommentList from "../../components/CommentList";
import CommentView from "../../components/CommentView";
import { useGetComments } from "../../hooks/database/useGetComments";
import { Comment } from "../../types/Comment";
import Layout from "../../components/Layout";
import { Proposal } from "../../types/Proposal";
import { snapshotSpace } from "../../config";
import { fetchProposals } from "../../utils/fetchProposals";
import { fetchProposal } from "../../utils/fetchProposal";
import { useCommand } from "../../hooks/generic/useCommand";

enum View {
  Comment,
  CommentList,
}

const ProposalPage: NextPage = ({ proposal }: any) => {
  const [view, setView] = useState(View.CommentList);
  const comments: Array<Comment> = useGetComments(proposal.id);
  const [selectedChoice, setSelectedChoice] = useState(0);

  console.log(comments);

  useCommand("ArrowRight", () =>
    setSelectedChoice((choice) => (choice + 1) % 3)
  );
  useCommand("ArrowLeft", () =>
    setSelectedChoice((choice) => (choice + 2) % 3)
  );

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
  const proposal = await fetchProposal(params.id);
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
