import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  setDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import { db } from "..";
import { EthereumAddress } from "../../../types/EthereumAddress";

export const createUser = async (
  address: EthereumAddress,
  name: string = "Jerry"
) => {
  return await setDoc(
    doc(db, "users", address),
    {
      name,
      address,
    },
    {
      merge: true,
    }
  );
};

export const getUser = async (address: EthereumAddress) => {
  return await getDoc(doc(db, `users/${address}`)).then((doc) => doc.data());
};

export const getUsers = async () =>
  await getDocs(collection(db, "users")).then((querySnapshot: QuerySnapshot) =>
    querySnapshot.docs.map((doc) => doc.data())
  );

export const listenUser = (address: EthereumAddress, callback: Function) =>
  onSnapshot(doc(db, `users/${address}`), (doc) => callback(doc.data()));

export const listenUserTags = (address: EthereumAddress, callback: Function) =>
  onSnapshot(
    collection(db, `users/${address}/tags`),
    (querySnapshot: QuerySnapshot) =>
      callback(querySnapshot.docs.map((doc) => doc.data()))
  );

export const tagUser = async (
  userAddress: EthereumAddress,
  tag: string,
  tagger: EthereumAddress
) =>
  setDoc(
    doc(db, `users/${userAddress}/tags/${tag}`),
    {
      tag,
      taggers: arrayUnion(tagger),
    },
    { merge: true }
  );

export const untagUser = async (
  userAddress: EthereumAddress,
  tag: string,
  tagger: EthereumAddress
) =>
  setDoc(
    doc(db, `users/${userAddress}/tags/${tag}`),
    {
      tag,
      taggers: arrayRemove(tagger),
    },
    { merge: true }
  );

export const addFriend = async (
  userAddress: EthereumAddress,
  friend: EthereumAddress
) =>
  setDoc(
    doc(db, `users/${userAddress}`),
    {
      friends: arrayUnion(friend),
    },
    { merge: true }
  );

export const removeFriend = async (
  userAddress: EthereumAddress,
  friend: EthereumAddress
) =>
  setDoc(
    doc(db, `users/${userAddress}`),
    {
      friends: arrayRemove(friend),
    },
    { merge: true }
  );

export const listenUserComments = async (address: EthereumAddress) => {
  const q = query(
    collectionGroup(db, `comments`),
    where("author", "==", address)
  );
  const querySnapshot: QuerySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const userDb = {
  createUser,
  getUser,
  getUsers,
  addFriend,
  removeFriend,
  tagUser,
  listenUser,
  listenUserComments,
  listenUserTags,
};
