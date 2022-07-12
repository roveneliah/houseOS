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
  runTransaction,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "..";
import { dao } from "../../../config";
import { EthereumAddress } from "../../../types/EthereumAddress";

export const createUser = async (
  address: EthereumAddress,
  name: string = dao.memberName,
  tags: Array<string> = []
) => {
  const batch = writeBatch(db);
  batch.set(
    doc(db, "users", address),
    {
      name,
      address,
    },
    {
      merge: true,
    }
  );
  tags.forEach(async (tag) =>
    batch.set(doc(db, `users/${address}/tags/${tag}`), {
      tag,
      taggers: [address],
    })
  );
  await batch.commit();
};

export const updateName = async (address: EthereumAddress, name: string) =>
  updateDoc(doc(db, "users", address), { name });

export const getUser = async (address: EthereumAddress) => {
  return await getDoc(doc(db, `users/${address}`)).then((doc) => doc.data());
};

export const getUsers = async () =>
  await getDocs(collection(db, "users")).then((querySnapshot: QuerySnapshot) =>
    querySnapshot.docs.map((doc) => doc.data())
  );

export const listenUser = (
  address?: EthereumAddress,
  callback: Function = () => {}
) => onSnapshot(doc(db, `users/${address}`), (doc) => callback(doc.data()));

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
  await setDoc(
    doc(db, `users/${userAddress}/tags/${tag}`),
    {
      tag,
      taggers: arrayUnion(tagger),
    },
    { merge: true }
  )
    .then((res) => console.log("Tagged User Successfully"))
    .catch((e) => console.log("Error untagging user: ", e));

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
  )
    .then((res) => console.log("Untagged User Successfully"))
    .catch((e) => console.log("Error untagging user: ", e));

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
  if (address) {
    const q = query(
      collectionGroup(db, `comments`),
      where("author", "==", address)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  }
};

export const getPfp = async (address: EthereumAddress) =>
  getDownloadURL(ref(storage, `pfps/${address}.png`)).catch(() =>
    getDownloadURL(ref(storage, "coachrick.png")).catch(() =>
      console.log("Could not retrieve pfp")
    )
  );

export const setProfilePic = async (address: EthereumAddress, pic: File) => {
  console.log("Setting pfp: ", pic);

  return await uploadBytes(ref(storage, `pfps/${address}.png`), pic);
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
