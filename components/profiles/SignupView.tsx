import CeramicConnectButton from "../archive/ceramic/CeramicConnectButton";

export default function SignupView({ address }: { address: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-gray-600">
        No account linked to {address}
      </p>
      <CeramicConnectButton />
    </div>
  );
}
