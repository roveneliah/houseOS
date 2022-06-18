import { useCallback, useEffect, useState } from "react";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";

export const useSIWE = () => {
  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { isConnected } = useConnect();
  const [state, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});
  const signedIn = !!state.address && !state.error && !state.loading;

  const signIn = useCallback(async () => {
    console.log("trying to sign in");

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
      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");
      console.log("verifyRes: ", verifyRes);

      console.log("Signed in successfully");
      setState((x) => ({ ...x, address, loading: false }));
    } catch (error) {
      setState((x: any) => ({ ...x, error, loading: false }));
    }
  }, [account?.address, activeChain]);

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
