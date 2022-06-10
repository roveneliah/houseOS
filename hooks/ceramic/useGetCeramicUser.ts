import { useState, useEffect } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import {
  usePublicRecord,
  useClient as useCeramicClient,
} from "@self.id/framework";
// import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";

export const useGetUserByDID = (did: string) =>
  usePublicRecord("basicProfile", did);

export const useGetCeramicUser = (address: EthereumAddress) =>
  usePublicRecord("basicProfile", `eip155:1:${address}`);

// export const useGetUser = (address: EthereumAddress) => {
//   const [did, setDid] = useState<string>("");
//   const client = useCeramicClient();
//   const publicRecord = usePublicRecord("basicProfile", did);

//   useEffect(() => {
//     Caip10Link.fromAccount(client.ceramic, `${address}@eip155:1`).then(
//       (res) => {
//         // console.log("res", res.did, res._context.did._id);
//         // setDid(res._context.did._id);
//         setDid(res.did || "");
//       }
//     );
//   }, [address]);

//   return publicRecord;
// };
