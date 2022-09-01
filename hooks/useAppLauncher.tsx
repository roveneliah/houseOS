import { useAppDispatch } from "@/redux/app/hooks";
import { launch, open } from "@/redux/features/windows/windowsSlice";
import MyProfile from "../components/me";
import ProposalsListPage from "../components/proposals";
import SignupModal from "../components/SignupModal";

export const useAppLauncher = () => {
  const dispatch = useAppDispatch();
  return {
    launchCreateProfile: () => dispatch(launch({ app: <SignupModal /> })),
    launchProfile: () => dispatch(launch({ app: <MyProfile />, padding: 0 })),
    launchProposalView: () => dispatch(launch({ app: <ProposalsListPage /> })),
    launchSearch: () => dispatch(open({ windowName: "search" })),
  };
};
