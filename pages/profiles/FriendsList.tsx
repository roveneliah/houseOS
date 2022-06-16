import { EthereumAddress } from "../../types/EthereumAddress";
import { ProfilePreview } from "./components/ProfilePreview";

export function FriendsList({ friends }: { friends: Array<EthereumAddress> }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg">
      {friends?.map((address: EthereumAddress, i: number) => (
        <ProfilePreview address={address} key={i} i={i} />
      ))}
    </div>
  );
}
