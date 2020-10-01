/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase";
//type
import { CreatorContentType } from "../types";

//thunks

interface ErrorMessage {
  errorMessage: string;
}

export const getFeed = createAsyncThunk<
  any,
  any,
  {
    rejectValue: ErrorMessage;
  }
>("feed/getFeed", async (_, thunkApi) => {
  try {
    const creatorSnap = await firebase
      .firestore()
      .collection("feeds")
      .doc(firebase.auth().currentUser?.uid)
      .collection("feed")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    const res = creatorSnap.docs.map((doc) => {
      return {
        ...doc.data(),
        createdAt: JSON.stringify(doc.data().createdAt.toDate()),
        editedAt: JSON.stringify(doc.data().editedAt?.toDate()),
        contentId: doc.id,
      };
    });
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

interface initialFeedState {
  feed: CreatorContentType[] | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
    isLoading: true,
    errorMessage: null,
  } as initialFeedState,
  reducers: {
    reset: (state) => ({
      feed: null,
      isLoading: true,
      errorMessage: null,
    }),
  },
  extraReducers: {
    [getFeed.fulfilled.type]: (state, { payload }) => {
      (state.isLoading = false), (state.feed = payload);
    },
    [getFeed.rejected.type]: (state, { payload }) => {
      (state.isLoading = false), (state.errorMessage = payload);
    },
    [getFeed.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//reducers
export const { reset } = feedSlice.actions;

//selectors
export const selectFeed = (state: RootState) => state.feed.feed;
export const selectErrorMessage = (state: RootState) => state.feed.errorMessage;
export const selectIsLoading = (state: RootState) => state.feed.isLoading;
