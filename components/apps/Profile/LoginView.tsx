import { dao } from "@/config";

export default function LoginView() {
  return (
    <div className="flex w-full flex-row justify-center pt-36">
      <div className="bg-base-100 text-base-content flex w-[50vw] flex-col space-y-6 rounded-lg p-8">
        <p className="text-2xl font-bold">
          Please log in to view your profile.
        </p>
        <p className="text-md font-normal">
          Sign in to connect with {dao.memberName}'s, participate in governance,
          and use other widgets coming soon.
        </p>
      </div>
    </div>
  );
}
