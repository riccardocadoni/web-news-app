import React from "react";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Feed from "../screens/Feed";
import Explore from "../screens/Explore";
import UserProfile from "../screens/UserProfile";
import CreatorProfile from "../screens/CreatorProfile";

//PUBLIC ROUTES (IF NOT LOGGED IN)
export const publicRoutes = [
  { name: "SignUp", path: "/signup", exact: true, main: () => <SignUp /> },
  { name: "SignIn", path: "/signin", exact: true, main: () => <SignIn /> },
];

//NORMAL USERS ROUTES
export const userRoutes = [
  { name: "Feed", path: "/feed", exact: true, main: () => <Feed /> },
  { name: "Explore", path: "/explore", exact: true, main: () => <Explore /> },
  {
    name: "Profile",
    path: "/profile",
    exact: true,
    main: () => <UserProfile />,
  },
  {
    name: "CreatorProfile",
    path: "/creator/:creatorId",
    exact: true,
    main: () => <CreatorProfile />,
  } /*
  {
    name: "Content",
    path: "/content/:id",
    exact: true,
    main: () => <Visualizer />,
  }, */,
];
