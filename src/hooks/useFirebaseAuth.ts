import { useEffect } from "react";
import firebase from "../firebase";

import { logIn, logOut, selectAuthenticated } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useFirebaseAuth() {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  //check the auth state
  useEffect(() => {
    const firebaseListener = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in.
          dispatch(logIn());
        } else {
          // No user is signed in.
          if (authenticated) {
            dispatch(logOut());
          } else dispatch(logOut());
        }
      });

    return function cleanUp() {
      firebaseListener();
    };
  }, [dispatch, authenticated]);
}
