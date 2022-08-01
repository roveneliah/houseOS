import { dao } from "@/config";

export default function LoginView() {
  return (
    <div className="flex w-full flex-row justify-center px-72 pt-36">
      <div className="bg-primary-content flex w-[40vw] flex-col space-y-4 rounded-lg p-8 py-8">
        <p className="text-neutral text-2xl font-bold">
          Please log in to view your profile.
        </p>
        <p className="text-neutral/75 text-md font-bold">
          Sign in to connect with {dao.memberName}'s, participate in governance,
          and use other widgets coming soon.
        </p>
      </div>
    </div>
  );
}
