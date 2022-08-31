import { useAppSelector } from "@/redux/app/hooks";

export const useWindowManager = () => {
  const state = useAppSelector((state) => state);

  return {
    search: state.windows.open.search,
  };
};
