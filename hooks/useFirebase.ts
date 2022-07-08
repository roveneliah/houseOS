import { useCallback, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut as signOutFirebase,
} from "firebase/auth";
import { Maybe } from "../types/Maybe";

export const useFirebase = () => {
  // TODO: init value should be the result of the api call...
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      console.log("Auth state changed", user);

      setSignedIn(user != undefined);
      setLoading(false);
    });
  }, []);

  const signIn = useCallback((token: Maybe<string>, onError?: any) => {
    if (token) {
      console.log("Signing into Firebase with token", token);

      setLoading(true);
      !loading &&
        signInWithCustomToken(getAuth(), token)
          .then((userCredential) => {
            console.log("Signed in ", userCredential);
            setSignedIn(true);
            setLoading(false);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR SIGNING IN", error);
            setSignedIn(false);
            setLoading(false);
            onError();
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
