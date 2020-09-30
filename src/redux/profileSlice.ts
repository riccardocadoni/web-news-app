/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase";
//type
import { CreatorInfoType } from "./contentSlice";

//thunks

interface ErrorMessage {
  errorMessage: string;
}
type LoginReturn = any;
interface Parameters {
  creatorInfo?: CreatorInfoType;
  followingIds?: string[];
}

export const getFollowingData = createAsyncThunk<
  LoginReturn,
  Parameters,
  {
    rejectValue: ErrorMessage;
  }
>("profile/getFollowing", async (parameters, thunkApi) => {
  try {
    const response = await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser?.uid)
      .get();
    const followingIds: string[] = response.data()?.follow;
    if (!followingIds) return null;
    const creatorsData = Promise.all(
      //for every id returns object with creator data
      followingIds.map(async (id: string) => {
        const creatorSnap = await firebase
          .firestore()
          .collection("creators")
          .doc(id)
          .get();
        const creatorData = creatorSnap.data();
        return { ...creatorData, creatorId: creatorSnap.id };
      })
    );
    return creatorsData;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const addNewFollow = createAsyncThunk<
  any,
  Parameters,
  {
    rejectValue: ErrorMessage;
  }
>("profile/addFollow", async ({ creatorInfo, followingIds }, thunkApi) => {
  try {
    let newFollowArray = [];
    if (followingIds) {
      newFollowArray = [...followingIds, creatorInfo?.creatorId];
    } else {
      newFollowArray = [creatorInfo?.creatorId];
    } //ts complain
    await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser?.uid)
      .set({ follow: newFollowArray });

    return creatorInfo;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const deleteFollow = createAsyncThunk<
  any,
  Parameters,
  {
    rejectValue: ErrorMessage;
  }
>("profile/delFollow", async ({ creatorInfo, followingIds }, thunkApi) => {
  try {
    const newFollowArray = followingIds?.filter(
      (item) => item !== creatorInfo?.creatorId
    );
    await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser?.uid)
      .set({ follow: newFollowArray });

    return creatorInfo;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

interface initialProfileState {
  following: CreatorInfoType[] | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    following: null,
    isLoading: false,
    errorMessage: null,
  } as initialProfileState,
  reducers: {
    reset: (state) => ({
      following: null,
      isLoading: false,
      errorMessage: null,
    }),
  },
  extraReducers: {
    [getFollowingData.fulfilled.type]: (state, { payload }) => {
      (state.isLoading = false), (state.following = payload);
    },
    [getFollowingData.rejected.type]: (state, { payload }) => {
      (state.isLoading = false), (state.errorMessage = payload);
    },
    [getFollowingData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addNewFollow.fulfilled.type]: (state, { payload }) => {
      if (state.following) {
        (state.isLoading = false), state.following.push(payload);
      } else {
        (state.isLoading = false),
          (state.following = []),
          state.following.push(payload);
      }
    },
    [addNewFollow.rejected.type]: (state, { payload }) => {
      (state.isLoading = false), (state.errorMessage = payload);
    },
    [addNewFollow.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteFollow.fulfilled.type]: (state, { payload }) => {
      if (state.following) {
        (state.isLoading = false),
          (state.following = state.following.filter(
            (item) => item.creatorId !== payload?.creatorId
          ));
      } else {
        state.isLoading = false;
      }
    },
    [deleteFollow.rejected.type]: (state, { payload }) => {
      (state.isLoading = false), (state.errorMessage = payload);
    },
    [deleteFollow.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//reducers
export const { reset } = profileSlice.actions;

//selectors
export const selectFollowing = (state: RootState) => state.profile.following;
export const selectFollowingIds = (state: RootState): string[] => {
  if (state.profile.following)
    return state.profile.following.map((follow) => follow.creatorId);
  else return [];
};
export const selectErrorMessage = (state: RootState) =>
  state.profile.errorMessage;
export const selectIsLoading = (state: RootState) => state.profile.isLoading;
