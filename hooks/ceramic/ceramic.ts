import { TileDocument } from "@ceramicnetwork/stream-tile";
import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";
import { CeramicApi } from "@ceramicnetwork/common";
import {
  useClient,
  useViewerConnection,
  useViewerID,
} from "@self.id/framework";
import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { createHook } from "../createHook";

export function useLoadTile(id: string) {
  const client = useClient();
  const [tile, setTile] = useState<any>(null);
  useEffect(() => {
    // update example
    TileDocument.load(client.ceramic, id).then(setTile);
  }, []);
  return tile;
}

export function useCreateTile(ceramic: CeramicApi, data: any, metadata?: any) {
  const [res, setRes] = useState<any>(null);
  useEffect(() => {
    TileDocument.create(ceramic, data, metadata).then(setRes);
  }, [ceramic]);
  return res?.commitId?.toString();
}

export function useUpdateTile(ceramic: CeramicApi, id: string, data: object) {
  const [res, setRes] = useState<any>(null);
  useEffect(() => {
    TileDocument.load(ceramic, id).then((doc) => {
      doc.update(data);
    });
  }, [ceramic, id]);
  return res;
}

export function useFindTileByController(
  controllers: Array<string>,
  tags?: Array<string>,
  family?: string
) {
  const client = useClient();
  const [tile, setTile] = useState<any>(null);
  useEffect(() => {
    TileDocument.deterministic(client.ceramic, {
      controllers,
      tags,
      family,
    }).then(setTile);
  }, []);

  return tile;
}

export function useDIDByAddress(address: EthereumAddress): string | null {
  const client = useClient();
  const [connection] = useViewerConnection();

  const [did, setDID] = useState<string | null>("");
  useEffect(() => {
    client.toDID(`eip155:1:${address}`).then(setDID);
  }, [address, connection.status]);

  return did;
}

export const updateName = (record: any) => (name: string) =>
  record.merge({ name });
export const setTags =
  (record: any) =>
  (...tags: Array<string>) =>
    record.merge({ tags });
export const addTags =
  (record: any) =>
  (...tags: Array<string>) =>
    record.merge({
      tags: tags
        .filter((tag: string) => !record.content.tags.includes(tag))
        .concat(record?.content?.tags || []),
    });
export const removeTag = (record: any) => (tag: string) =>
  record.merge({ tags: record.content.tags.filter((t: string) => t !== tag) });

export const addFriends =
  (record: any) =>
  (...friends: Array<string>) =>
    record.merge({
      friends: friends
        .filter((tag: string) => !record.content.friends.includes(tag))
        .reduce(
          (acc, friend) => acc.concat(friend),
          record?.content?.friends || []
        ),
    });

// TileDocument.create(ceramic.ceramic, simpleNoteSchema).then((res) => {
//   console.log(res, res.commitId.toString());

//   Caip10Link.fromAccount(ceramic.ceramic, `${address}@eip155:1`).then(
//     (res) => {
//       // console.log("res", res.did, res._context.did._id);
//       // setDid(res._context.did._id);

//       TileDocument.create(
//         ceramic.ceramic,
//         { title: "Title", body: "Body" },
//         {
//           schema: res.commitId.toString(),
//         }
//       ).then((res) => console.log(res));
//     }
//   );
// });
// TODO: HOW TO ADD CONTROLLERS?
