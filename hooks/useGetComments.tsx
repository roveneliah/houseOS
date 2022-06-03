import { Comment } from "../types/Comment";

export const useGetComments = (proposalId: string = ""): Array<Comment> => {
  return [
    {
      author: "flexchapman",
      src: "/flex.png",
      body: "LGTM.  Some execution risk since it’s a trusted swap, but Big3 has more to lose.  Blah blah, this is a comment on the comment view showing what it’s like when comments are opened on an individual level.  This is to push readers to look at opinions more dilligently and not just scroll Insta-style.",
      active: true,
    },
    {
      author: "commodore",
      src: "/commodore.png",
      body: "LGTM.  Some execution risk since it’s a trusted swap, but Big3 has more to lose.  Blah blah, this is a comment on the comment view showing what it’s like when comments are opened on an individual level.  This is to push readers to look at opinions more dilligently and not just scroll Insta-style.",
    },
    {
      author: "flexchapman",
      src: "/flex.png",
      body: "LGTM.  Some execution risk since it’s a trusted swap, but Big3 has more to lose.  Blah blah, this is a comment on the comment view showing what it’s like when comments are opened on an individual level.  This is to push readers to look at opinions more dilligently and not just scroll Insta-style.",
      active: true,
    },
    {
      author: "commodore",
      src: "/commodore.png",
      body: "LGTM.  Some execution risk since it’s a trusted swap, but Big3 has more to lose.  Blah blah, this is a comment on the comment view showing what it’s like when comments are opened on an individual level.  This is to push readers to look at opinions more dilligently and not just scroll Insta-style.",
    },
    {
      author: "flexchapman",
      src: "/flex.png",
      body: "LGTM.  Some execution risk since it’s a trusted swap, but Big3 has more to lose.  Blah blah, this is a comment on the comment view showing what it’s like when comments are opened on an individual level.  This is to push readers to look at opinions more dilligently and not just scroll Insta-style.",
      active: true,
    },
    {
      author: "commodore",
      src: "/commodore.png",
      body: "LGTM.  Some execution risk since it’s a trusted swap, but Big3 has more to lose.  Blah blah, this is a comment on the comment view showing what it’s like when comments are opened on an individual level.  This is to push readers to look at opinions more dilligently and not just scroll Insta-style.",
    },
  ];
};
