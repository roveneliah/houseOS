import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { Comment } from "../../types/Comment";
import { db } from ".";
import { EthereumAddress } from "../../types/EthereumAddress";

export const postComment = async (
  proposalId: string,
  comment: any,
  signature: string
) => {
  return await setDoc(
    doc(db, `proposals/${proposalId}/comments/${comment.author}`),
    {
      author: comment.author,
      body: comment.body,
      choice: comment.choice,
      proposalId,
      signature,
    }
  );
};

export const getComments = async (proposalId: string) => {
  return await getDocs(collection(db, `proposals/${proposalId}/comments`)).then(
    (querySnapshot: QuerySnapshot) =>
      querySnapshot.docs.map((doc) => doc.data())
  );
};

export const listenComments = (proposalId: string, callback: Function) =>
  onSnapshot(
    collection(db, `proposals/${proposalId}/comments`),
    (querySnapshot: QuerySnapshot) =>
      callback(querySnapshot.docs.map((doc) => doc.data()))
  );

export const getProposalTags = (proposalId: string, callback: Function) =>
  onSnapshot(collection(db, `proposals/${proposalId}/tags`), (querySnapshot) =>
    callback(querySnapshot.docs.map((doc) => doc.data()))
  );

export const tagProposal = (
  proposalId: string,
  tag: string,
  tagger: EthereumAddress
) =>
  setDoc(doc(db, `proposals/${proposalId}/tags/${tag}`), {
    tag,
    taggers: [tagger],
  });
