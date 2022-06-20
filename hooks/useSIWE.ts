import { useCallback, useEffect, useState } from "react";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import {
  getAuth,
  signOut as signOutFirebase,
  signInWithCustomToken,
} from "firebase/auth";
import { app, auth } from "../utils/firebase";
import { Maybe } from "../types/Maybe";
import { useGetUserProfile } from "./users/useGetUserProfile";

export const useFirebase = (token: Maybe<string>) => {
  useEffect(() => {
    console.log("token updated");

    if (token) {
      console.log("Attempting sign in with: ", token);
      signInWithCustomToken(getAuth(), token)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          console.log("VERIFIED");
          console.log(userCredential);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log("ERROR SIGNING IN", error);
        });
    }
  }, [token]);
};

export const useSIWE = () => {
  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { isConnected } = useConnect();
  const [state, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
    token?: string;
  }>({});
  const user = useGetUserProfile();
  const hodler = user?.hodler;
  useFirebase(state.token);
  const signedIn = !!state.address && !state.error && !state.loading;

  const signIn = useCallback(async () => {
    console.log("trying to sign in");
    if (!hodler) {
      console.log("Not a hodler, won't make account");
      return;
    }
    try {
      const address = account?.address;
      const chainId = activeChain?.id;

      if (!address || !chainId) return;

      setState((x) => ({ ...x, error: undefined, loading: true }));
      // Fetch random nonce, create SIWE message, and sign with wallet
      const nonceRes = await fetch("/api/nonce");
      console.log("nonceRes: ", nonceRes);
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: await nonceRes.text(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes: Response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature, address }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");

      verifyRes.json().then(({ token, ok }) => {
        if (!ok) throw new Error("Error verifying message");
        setState((x) => ({
          ...x,
          address,
          token,
          loading: false,
        }));
      });
    } catch (error) {
      setState((x: any) => ({ ...x, error, loading: false }));
    }
  }, [account?.address, activeChain, hodler]);

  // Fetch user when:
  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch("/api/me");
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } catch (_error) {}
    };
    // 1. page loads
    handler();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);

    // 3. new user
  }, [state.address]);

  const signOut = async () => {
    console.log("signing out");
    await fetch("/api/logout");
    signOutFirebase(auth)
      .then((res) => {
        console.log("signed out of firebase");
      })
      .catch((e: any) => console.log("error signing out of firebase", e));
    setState({});
  };

  useEffect(() => {
    state.address && state.address !== account?.address && signOut();
  }, [account?.address, state.address]);

  // useEffect(() => {
  //   console.log(account?.address, state, activeChain, isConnected, signedIn);

  //   account?.address &&
  //     !state.address &&
  //     !state.loading &&
  //     isConnected &&
  //     activeChain &&
  //     !signedIn &&
  //     signIn();
  // }, [account?.address, state.address, isConnected, activeChain, signedIn]);

  return {
    state,
    signIn,
    signOut,
    signedIn,
  };
};
