import { useEffect, useState } from "react";
import { useFirebase } from "./useFirebaseAuth";
import { useIsNewUser } from "../useIsNewUser";
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

  const noAccount = useIsNewUser();

  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => {
    // console.log("Signed in SIWE", signedInSIWE);
    // console.log("TOKEN", state);

    signedInSIWE && signInFirebase(state.token, signOutSIWE);
    setLoad(true);
    // !state.token && signedInFirebase && signOutFirebase();
  }, [state.token, signedInSIWE]);

  return {
    signOut,
    signIn: signInSIWE,
    signedIn: signedInFirebase && signedInSIWE,
    loadingFirebase,
    hasProfile: signedInFirebase && signedInSIWE && !noAccount,
  };
};
