import ProposalPage from "@/components/apps/Proposal";
import { useAppDispatch } from "@/redux/app/hooks";
import { launch, open, quitApp } from "@/redux/features/windows/windowsSlice";
import MyProfile from "../components/apps/UserProfile";
import ProposalsListPage from "../components/apps/ProposalList";
import PollsApp from "../components/apps/Polls";
import SignupModal from "../components/SignupModal";

export const useAppLauncher = () => {
  const dispatch = useAppDispatch();
  return {
    launchCreateProfile: () => dispatch(launch({ app: <SignupModal /> })),
    launchProfile: () => dispatch(launch({ app: <MyProfile />, padding: 0 })),
    launchProposalView: () => dispatch(launch({ app: <ProposalsListPage /> })),
    launchPolls: () => dispatch(launch({ app: <PollsApp /> })),
    launchSearch: () => dispatch(open({ windowName: "search" })),
    launchProposal: (id: string) => () =>
      dispatch(launch({ app: <ProposalPage id={id} /> })),
    quit: () => dispatch(quitApp()),
  };
};
