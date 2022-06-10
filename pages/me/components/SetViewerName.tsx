import { useViewerRecord } from "@self.id/framework";
import { useState } from "react";
import { useAccount } from "wagmi";

// Mutate the record

export function SetViewerName() {
  const record = useViewerRecord("basicProfile");
  const [name, setName] = useState("");
  const { data: address } = useAccount();

  console.log(
    record.isMutable,
    record.isMutating,
    record.isError,
    record.isLoading
  );

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        disabled={!record.isMutable || record.isMutating}
        onClick={async () => {
          await record.merge({
            name,
          });
        }}
        className="btn btn-outline"
      >
        Set name
      </button>
    </div>
  );
}
