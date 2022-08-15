import { formatTaggers } from "@/pages/profiles/[address]";

export function TagsView(props: any) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-b-lg">
      {props.allTags.map(
        ({ tag, taggers, toggle, description }: any, i: number) => (
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col">
              <div className="group flex w-full flex-row justify-between space-x-2 border-b py-2 px-6">
                <div className="flex w-full flex-row  items-center justify-start space-x-2">
                  <div className="flex w-1/3 flex-row items-center space-x-4 overflow-hidden">
                    <div className="flex flex-row space-x-2">
                      <p className="badge badge-light badge-sm flex">
                        {taggers.length}
                      </p>
                      <div onClick={toggle}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 ${
                            taggers.includes(props.address)
                              ? "text-neutral"
                              : `${
                                  props.signedIn && "hover:text-neutral"
                                } text-gray-200`
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>

                    <p
                      className={`text-md whitespace-nowrap text-gray-900 ${
                        i < 3 && taggers.length > 0
                          ? "font-bold"
                          : "font-normal"
                      }`}
                    >
                      {tag}
                    </p>
                  </div>
                  <div className="flex w-2/3 flex-row items-center justify-between">
                    <p className="flex text-ellipsis whitespace-nowrap px-6 text-sm font-normal text-gray-700 group-hover:hidden lg:flex">
                      {formatTaggers(taggers, props.users)}
                    </p>
                    <p className="hidden text-ellipsis whitespace-nowrap px-6 text-sm font-normal text-gray-700 group-hover:flex">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
