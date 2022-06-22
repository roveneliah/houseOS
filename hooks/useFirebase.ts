import { useCallback, useState } from "react";
import {
  getAuth,
  signInWithCustomToken,
  signOut as signOutFirebase,
} from "firebase/auth";
import { Maybe } from "../types/Maybe";
import { auth } from "../utils/firebase";

export const useFirebase = () => {
  // TODO: init value should be the result of the api call...
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = useCallback((token: Maybe<string>) => {
    if (token) {
      setLoading(true);
      signInWithCustomToken(getAuth(), token)
        .then((userCredential) => {
          var user = userCredential.user;
          setSignedIn(true);
          setLoading(false);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("ERROR SIGNING IN", error);
          setSignedIn(false);
        });
    }
  }, []);

  const signOut = () => {
    signOutFirebase(getAuth())
      .then((res) => {
        console.log("signed out of firebase");
        setSignedIn(false);
      })
      .catch((e: any) => console.log("error signing out of firebase", e));
  };

  return { signedIn, signIn, signOut, loading };
};
