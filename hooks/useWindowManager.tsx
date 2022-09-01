import { useAppSelector } from "@/redux/app/hooks";
import { RootState } from "@/redux/app/store";

export const useWindowManager = () => {
  const state = useAppSelector((state: RootState) => state);

  return {
    search: state.windows.open.search,
  };
};
