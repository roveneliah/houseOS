import Image from "next/image";

export const useGetUserTags = (user: any) => ["Contributor", "Steward"];

export default function CommentListItem({ comment }: any) {
  const tags = useGetUserTags(comment.author);
  return (
    <div
      className={`flex flex-row space-x-2 ${
        comment.active ? "bg-gray-50" : "bg-gray-300"
      } px-8 py-8`}
    >
      <div className="flex min-w-fit flex-row items-start justify-end">
        <Image
          src={comment.src}
          width={75}
          height={75}
          className="rounded-full"
          objectFit="contain"
        />
      </div>
      <div className="flex flex-col justify-between space-y-2 px-4">
        <div className="flex flex-row justify-between space-x-4">
          <div className="flex flex-col justify-start space-y-2">
            <div className="flex flex-row space-x-2">
              {tags.map((tag: String) => (
                <p className="badge">{tag}</p>
              ))}
            </div>
            <p className="text-left text-xl font-bold text-gray-700">
              {comment.author}
            </p>
          </div>
          <p className="badge">1000 $KRAUSE</p>
        </div>
        <p className="pr-4 text-left text-gray-900">{comment.body}</p>
      </div>
    </div>
  );
}
