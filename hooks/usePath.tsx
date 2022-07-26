import { capitalize } from "@/utils/capitalize";
import { useRouter } from "next/router";

export const usePath = (): Array<any> => {
  const { asPath: route } = useRouter();

  // TODO: make own function and test
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
