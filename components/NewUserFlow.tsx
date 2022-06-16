import { useState } from "react";
import { dao } from "../config";
import { createUser } from "../utils/firebase/user";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useGetAllUserTags } from "../hooks/tags/useGetAllUserTags";
import { useRouter } from "next/router";
import { useCommand } from "../hooks/generic/useCommand";

export function NewUserFlow() {
  const [name, setName] = useState();
  const address = useUserAddress();
  const allTags = useGetAllUserTags(address);
  const router = useRouter();
  const [task1a, setTask1a] = useState<boolean>(false);
  const [task1b, setTask1b] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const task2 = selectedTags.length > 0;
  const demoTags = allTags.map((tag) => ({
    ...tag,
    toggle: () =>
      !selectedTags.includes(tag.tag)
        ? setSelectedTags((selectedTags) => selectedTags.concat(tag.tag))
        : setSelectedTags((selectedTags) =>
            selectedTags.filter((t) => t !== tag.tag)
          ),
  }));

  useCommand("k", () => setTask1a(true));
  useCommand("ArrowRight", () => setTask1b(true));

  return (
    <div className="flex min-h-[70vh] w-full flex-col justify-center space-y-8 px-72 pt-36">
      {step === 0 && (
        <>
          <h1 className="text-4xl font-bold">
            Welcome {name || dao.memberName}
          </h1>
          <p className="text-lg font-semibold">
            The Command Palette is your portal around the DAO. You can open it
            with
            <span className="text-gray-700"> ⌘k</span>,{" "}
            <span className="text-gray-700"> ctrl k</span>, or with the button
            at the top-right.
          </p>
          <p className="text-lg font-semibold">
            You can search anything you need there.
            <ul className="pl-3 pt-1">
              <li>• proposals</li>
              <li>• user profiles</li>
              <li>• informational resources</li>
              <li>• useful links</li>
            </ul>
          </p>
          <div className="flex flex-row justify-start space-x-2">
            <input
              type="checkbox"
              checked={task1a}
              className="checkbox bg-gray-200"
            />
            <p className="text-lg font-semibold">
              Open up the Command Palette and have a peek around (it's disabled,
              so you won't be able to navigate anywhere else)
            </p>
          </div>
          <div className="flex flex-row justify-start space-x-2">
            <input
              type="checkbox"
              checked={task1b}
              className="checkbox bg-gray-200"
            />
            <p className="text-lg font-semibold">
              Use the ⌘→ and ⌘← shortcut to switch between filters.
            </p>
          </div>
          {task1a && task1b && (
            <button className="badge badge-lg" onClick={() => setStep(1)}>
              Next
            </button>
          )}
        </>
      )}
      {step === 1 && (
        <>
          <h1 className="text-4xl font-semibold ">Tags</h1>
          <p className="text-lg font-semibold">
            Users are able to tag other users and proposals, which gets shared
            with their friends.
          </p>
          <p className="text-lg font-semibold">
            This gives us a decentralized, opt-in ability to sensemake as a
            community. If you dislike someone else's takes, don't follow them!
          </p>
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">
              Choose some tags to describe yourself.
            </p>
            <div className="border-1 flex flex-row flex-wrap justify-start space-x-2 overflow-auto rounded-lg border  p-3">
              {demoTags.map(({ tag, toggle }: any, i: number) => (
                <p
                  className={`badge my-1 ${
                    selectedTags.includes(tag)
                      ? "badge-dark"
                      : "hover:bg-gray-400"
                  }`}
                  key={i}
                  onClick={toggle}
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
          {task2 && (
            <button className="badge badge-lg" onClick={() => setStep(2)}>
              Next
            </button>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <h1 className="text-4xl font-bold">
            Let's finish setting up your profile.
          </h1>
          <p className="text-lg font-semibold">What's your name?</p>
          <input
            className="border-b-2 bg-transparent text-xl outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && name.length > 2 && (
            <button
              className="badge badge-lg"
              onClick={() => {
                createUser(address, name, selectedTags);
                router.push("/me");
              }}
            >
              Create Profile
            </button>
          )}
        </>
      )}
    </div>
  );
}
