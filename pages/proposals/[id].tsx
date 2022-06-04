import type { NextPage, NextPageContext } from "next";
import { useState } from "react";
import ChoiceFilters from "../../components/FilterTabs";
import ProposalHeader from "../../components/ProposalHeader";
import CommentList from "../../components/CommentList";
import CommentView from "../../components/CommentView";
import { useGetComments } from "../../hooks/useGetComments";
import { Comment } from "../../types/Comment";
import Layout from "../../components/Layout";
import { Proposal } from "../../types/Proposal";
import { useGetProposals } from "../../hooks/useGetProposals";

enum View {
  Comment = "Comment",
  CommentList = "CommentList",
}

const ProposalPage: NextPage = ({ proposal }: any) => {
  console.log(proposal);
  const [view, setView] = useState(View.CommentList);
  const comments: Array<Comment> = useGetComments();

  return (
    <Layout>
      <div className="flex w-full flex-col items-start space-y-10 bg-gray-800 px-72 pt-20">
        <ProposalHeader proposal={proposal} />
        <ChoiceFilters proposal={proposal} />
      </div>
      <div className="items flex w-full flex-col items-start bg-gray-500 px-72 pt-20">
        <div className="flex w-full flex-col space-y-4 pt-4">
          {view === View.CommentList && (
            <CommentList
              toggleCommentView={() => setView(View.Comment)}
              comments={comments}
            />
          )}
          {view === View.Comment && (
            <CommentView
              comment={{
                author: "flexchapman",
                src: "/flex.png",
                body: "LGTM.  Some execution risk since it’s a trusted swap, but Big3 has more to lose.  Blah blah, this is a comment on the comment view showing what it’s like when comments are opened on an individual level.  This is to push readers to look at opinions more dilligently and not just scroll Insta-style.",
                active: true,
              }}
              back={() => setView(View.CommentList)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }: any) {
  const proposals = useGetProposals();
  const proposal = proposals.find((p) => p.id === params.id);
  return {
    props: {
      proposal,
    },
  };
}

export async function getStaticPaths() {
  const proposals = useGetProposals();
  const paths = proposals.map((proposal: Proposal) => ({
    params: { id: proposal.id },
  }));
  return { paths, fallback: false };
}

export default ProposalPage;
