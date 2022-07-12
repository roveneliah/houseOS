import { useEffect } from "react";
import { useFirebase } from "./useFirebase";
import { useSIWE } from "./useSIWE";

export const useSignIn = () => {
  // TODO: implement hodler logic
  const {
    signIn: signInFirebase,
    signOut: signOutFirebase,
    signedIn: signedInFirebase,
    loading: loadingFirebase,
  } = useFirebase();
  const {
    state,
    signIn: signInSIWE,
    signOut: signOutSIWE,
    signedIn: signedInSIWE,
  } = useSIWE();

  const signOut = () => {
    signOutFirebase();
    signOutSIWE();
  };

  const signIn = () => {
    signInSIWE().then(() => {
      console.log("Trying to sign in with firebase");

      signInFirebase(state.token);
    });
  };

  useEffect(() => {
    // console.log("Signed in SIWE", signedInSIWE);
    // console.log("TOKEN", state);

    signedInSIWE && state.token && signInFirebase(state.token, signOutSIWE);
    // !state.token && signedInFirebase && signOutFirebase();
  }, [state.token, signedInSIWE, signedInFirebase]);

  // console.log("signed in with ethereum: ", signedInSIWE);
  // console.log("signed in with firebase: ", signedInFirebase);

  return {
    signOut,
    signIn,
    signedIn: signedInFirebase && signedInSIWE === true,
    loadingFirebase,
  };
};
