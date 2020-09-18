import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logUserOut } from "../redux/authSlice";

export interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(logUserOut());
      }}
    >
      LOGOUT
    </button>
  );
};

export default UserProfile;
