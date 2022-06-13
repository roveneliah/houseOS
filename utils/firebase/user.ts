import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from ".";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";

export const addUser = async (user: User) => {
  return await addDoc(collection(db, "users"), {
    name: user.name,
    address: user.address,
  });
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
