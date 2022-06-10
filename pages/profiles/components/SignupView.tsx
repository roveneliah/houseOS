import ConnectButton from "../../../components/CeramicConnectButton";

function SignupView({ address }: { address: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-gray-600">
        No account linked to {address}
      </p>
      <ConnectButton />
    </div>
  );
}
