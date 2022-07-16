import { capitalize } from "@/components/ProposalHeader";
import { useRouter } from "next/router";

export const usePath = (): Array<any> => {
  const { asPath: route } = useRouter();

  const path = route
    .split("/")
    .slice(1)
    .map(capitalize)
    .map((pathSlice: string, i: number) => ({
      pathSlice,
      route: route
        .split("/")
        .slice(0, i + 2)
        .join("/"),
    }));

  return path;
};
