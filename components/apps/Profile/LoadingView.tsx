export default function LoadingView({ address }: { address: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-gray-600">
        Loading profile at {address}...
      </p>
    </div>
  );
}
