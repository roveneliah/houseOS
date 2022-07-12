import { useDispatch } from "react-redux";
import { track as trackAddress } from "../features/users/usersSlice";
import { EthereumAddress } from "@/types/EthereumAddress";
import { listenUser } from "@/utils/firebase/user";
import { compose } from "ramda";

export const useTrackUser = () => {
  const dispatch = useDispatch();

  const track = (address: any) =>
    listenUser(address, compose(dispatch, trackAddress));

  return track;
};
