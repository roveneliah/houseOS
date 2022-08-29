import dynamic from "next/dynamic";
import { ReactNode, useState } from "react";
import type { NextPage } from "next";
import { useGetComments } from "../../hooks/database/useGetComments";
import { snapshotSpace } from "../../config";
import { fetchProposal } from "../../utils/snapshot/fetchProposal";
import { useCommand } from "../../hooks/generic/useCommand";
import { Comment } from "../../types/Comment";
import { Proposal } from "../../types/Proposal";
import createHook from "@/hooks/createHook";
import CommentList from "./CommentList";
import { fetchProposals } from "@/utils/snapshot/fetchProposals";
const Layout = dynamic(() => import("../Layout"));
const ProposalHeader = dynamic(() => import("./ProposalHeader"));
const ChoiceFilters = dynamic(() => import("./ChoiceFilters"));
const CommentView = dynamic(() => import("./CommentView"));

enum View {
  Comment,
  CommentList,
}

const ProposalPage = ({ id }: { id: string }) => {
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
    <div className="bg-base-200 w-full p-12">
      <div className="flex w-full flex-row justify-center">
        <div className="text-base-content flex w-full flex-col items-start space-y-10 px-12">
          <ProposalHeader proposal={proposal} />
          <ChoiceFilters
            proposal={proposal}
            selectedChoice={selectedChoice}
            setSelectedChoice={setSelectedChoice}
            toggleCommentView={() => setView(View.Comment)}
            view={view}
          />
        </div>
      </div>
      <div className="text-base-content flex w-full flex-row justify-center px-12">
        <div className="bg-base-100 flex w-full flex-col space-y-10 overflow-hidden rounded-b-lg">
          {view === View.CommentList && (
            <CommentList
              toggleCommentView={() => setView(View.Comment)}
              comments={comments}
              proposal={proposal}
              choice={selectedChoice}
            />
          )}

          <CommentView
            proposal={proposal}
            choice={selectedChoice}
            back={() => setView(View.CommentList)}
          />
        </div>
      </div>
    </div>
  );
};

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   return {
//     props: { id: params.id },
//   };
// }

// export async function getStaticPaths() {
//   const proposals = await fetchProposals(snapshotSpace);
//   const paths = proposals.map((proposal: Proposal) => ({
//     params: { id: proposal.id },
//   }));
//   return { paths, fallback: false };
// }

export default ProposalPage;
