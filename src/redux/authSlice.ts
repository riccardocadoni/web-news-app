/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase";

//thunks

/* 
  Log in/out thunks don't directly changes the authenticated value 
  of the auth slice because it's handled by useFirebaseAuth hooks 
  */

interface ErrorMessage {
  errorMessage: string;
}
type LoginReturn = any;
interface Credential {
  email: string;
  psw: string;
}
interface SignUpCredential {
  email: string;
  psw: string;
  firstName: string;
  lastName: string;
}

export const signUserIn = createAsyncThunk<
  LoginReturn,
  Credential,
  {
    rejectValue: ErrorMessage;
  }
>("auth/signIn", async (credentials, thunkApi) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.psw);

    return response.user?.email;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
export const signUserUp = createAsyncThunk<
  LoginReturn,
  SignUpCredential,
  {
    rejectValue: ErrorMessage;
  }
>("auth/signUp", async (credentials, thunkApi) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.psw)
      .then((res) =>
        firebase
          .firestore()
          .collection("users")
          .doc(res?.user?.uid)
          .set({
            email: res?.user?.email,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            contentCreator: false,
          })
          .then(() => {
            res?.user?.updateProfile({
              displayName: credentials.firstName + " " + credentials.lastName,
            });
          })
      );

    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const logUserOut = createAsyncThunk("auth/logout", async () => {
  const response = await firebase.auth().signOut();
  return response;
});

export type initialAuthState = {
  authenticated: Boolean;
  isLoading: Boolean;
  errorMessage: null | string;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    isLoading: true,
    errorMessage: null,
  } as initialAuthState,
  reducers: {
    logIn: (state) => {
      state.authenticated = true;
      state.isLoading = false;
    },
    logOut: (state) => {
      state.authenticated = false;
      state.isLoading = false;
    },
    deleteErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: {
    [signUserIn.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [signUserIn.rejected.type]: (state, action) => {
      (state.isLoading = false), (state.errorMessage = action.payload);
    },
    [signUserIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUserUp.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [signUserUp.rejected.type]: (state, action) => {
      (state.isLoading = false), (state.errorMessage = action.payload);
    },
    [signUserUp.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//reducers
export const { logIn, logOut, deleteErrorMessage } = authSlice.actions;

//selectors
export const selectAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const selectErrorMessage = (state: RootState) => state.auth.errorMessage;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
