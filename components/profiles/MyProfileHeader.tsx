import Image from "next/image";
import { defaultAvatar } from "../../config";
import { TagsList } from "../me";

export function MyProfileHeader(props: any) {
  return (
    <div className="bg-base-200 text-base-content flex w-full flex-row justify-center pt-12">
      <div className="flex w-full flex-col items-start space-y-12">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex w-full flex-col items-start justify-start space-y-4">
            <div className="flex w-full flex-row justify-start space-x-2 pr-6">
              <p
                className="rounded-full border border-black px-3 py-1"
                onClick={() => props.setEditView(!props.editView)}
              >
                Edit
              </p>
              <TagsList tags={props.tags} max={3} disabled={true} />
            </div>
            {props.editView ? (
              <input
                value={props.nameInput}
                onBlur={() => {
                  props.nameInput.length > 2 &&
                    props.nameInput != "..." &&
                    props.user.updateName(props.nameInput);
                  props.setEditView(false);
                }}
                onChange={(e) => props.setNameInput(e.target.value)}
                defaultValue="..."
                className="border-b-2 bg-transparent text-left text-5xl font-semibold caret-current outline-none"
              />
            ) : (
              <p className="-ml-2 w-10/12 p-2 pr-4 text-left text-5xl font-bold">
                {props.user?.name}
              </p>
            )}
          </div>
          <div
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-full"
            onClick={props.triggerUpload}
          >
            <Image
              src={props.pfpUrl || defaultAvatar}
              width={150}
              height={150}
              className="rounded-full"
            />
            <div className="absolute hidden min-h-full min-w-full flex-col items-center justify-center rounded-full bg-black/50 group-hover:flex">
              <p className="text-base-100 font-bold">Upload</p>
            </div>
            <input
              type="file"
              className="hidden"
              ref={props.uploadRef}
              onChange={(e) => {
                props.user
                  .setProfilePic(e.target.files?.[0])
                  .then(() => props.setPfpUrl(props.pfpUrl + "/"));
              }}
            />
          </div>
        </div>

        <div className="bg-base-100 text-base-content flex w-full flex-row justify-between space-x-0 overflow-hidden rounded-t-lg border-b">
          {props.views.map(
            ({ name: viewName, toggle, selected, icon }: any, i: number) => (
              <div
                className={` flex w-full flex-row items-center space-x-2 ${
                  selected ? "border-b-2 border-black" : ""
                } px-6 py-3 hover:bg-gray-100`}
                onClick={toggle}
                key={i}
              >
                {icon({})}
                <p className="text-md py-2 font-semibold">{viewName}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
