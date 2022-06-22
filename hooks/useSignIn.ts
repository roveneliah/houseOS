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
      signInFirebase(state.token);
    });
  };

  useEffect(() => {
    state.token && signInFirebase(state.token);
  }, [state.token]);

  return {
    signOut,
    signIn,
    signedIn: signedInFirebase && signedInSIWE,
    loadingFirebase,
  };
};
