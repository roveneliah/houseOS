import dynamic from "next/dynamic";
import { useState } from "react";
import type { NextPage } from "next";
import { useGetComments } from "../../hooks/database/useGetComments";
import { snapshotSpace } from "../../config";
import { fetchProposals } from "../../utils/fetchProposals";
import { fetchProposal } from "../../utils/fetchProposal";
import { useCommand } from "../../hooks/generic/useCommand";
import { Comment } from "../../types/Comment";
import { Proposal } from "../../types/Proposal";
import createHook from "@/hooks/createHook";
const Layout = dynamic(() => import("../../components/Layout"));
const ChoiceFilters = dynamic(() => import("../../components/FilterTabs"));
const ProposalHeader = dynamic(() => import("../../components/ProposalHeader"));
const CommentList = dynamic(() => import("../../components/CommentList"));
const CommentView = dynamic(() => import("../../components/CommentView"));

enum View {
  Comment,
  CommentList,
}

const ProposalPage: NextPage = ({ id }: any) => {
  const proposal = createHook(fetchProposal)(id);
  const [view, setView] = useState(View.CommentList);
  const comments: Array<Comment> = useGetComments(proposal.id);

  // TODO: #12 create hook to abstract all this and pass in iterators
  const [selectedChoice, setSelectedChoice] = useState(0);
  // TODO: Change 3 to be dynamic, use the prexisting hook
  const next = () => setSelectedChoice((choice) => (choice + 1) % 3);
  const prev = () => setSelectedChoice((choice) => (choice + 2) % 3);

  useCommand("ArrowRight", next);
  useCommand("ArrowLeft", prev);

  return (
    <Layout>
      <div className="flex w-full flex-row justify-center bg-gray-800 pt-20">
        <div className="flex w-2/3 flex-col items-start space-y-10 ">
          <ProposalHeader proposal={proposal} />
          <ChoiceFilters
            proposal={proposal}
            selectedChoice={selectedChoice}
            setSelectedChoice={setSelectedChoice}
          />
        </div>
      </div>
      <div className="flex min-h-[75vh] w-full  flex-row justify-center bg-gray-500 py-20">
        <div className="flex w-2/3 flex-col space-y-4 pt-4">
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
  return {
    props: { id: params.id },
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
