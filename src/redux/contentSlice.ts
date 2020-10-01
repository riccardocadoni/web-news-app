/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase";

//thunks

interface ErrorMessage {
  errorMessage: string;
}
interface Parameters {
  creatorId: string | undefined;
}

export const getCreatorContent = createAsyncThunk<
  any,
  any,
  {
    rejectValue: ErrorMessage;
  }
>("content/getCreatorContent", async ({ creatorId }, thunkApi) => {
  try {
    const dataSnap = await firebase
      .firestore()
      .collection("content")
      .where("creatorId", "==", creatorId)
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    const res = dataSnap.docs.map((doc) => {
      return {
        ...doc.data(),
        createdAt: JSON.stringify(doc.data().createdAt.toDate()),
        editedAt: JSON.stringify(doc.data().editedAt?.toDate()),
        contentId: doc.id,
      };
    });
    return res;
  } catch (error) {
    console.log("err nel thunk", error);
    return thunkApi.rejectWithValue(error.message);
  }
});

//TODO: think about the data duplication here --
// info present also in explore or profile in linked from there
export const getCreatorInfo = createAsyncThunk<
  any,
  any,
  {
    rejectValue: ErrorMessage;
  }
>("content/getCreatorInfo", async ({ creatorId }, thunkApi) => {
  try {
    const creatorSnap = await firebase
      .firestore()
      .collection("creators")
      .doc(creatorId)
      .get();
    return { ...creatorSnap.data(), creatorId: creatorSnap.id };
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export interface CreatorInfoType {
  firstName: string;
  lastName: string;
  fields?: string[];
  creatorId: string;
  profilePic?: string;
}
export interface CreatorContentType {
  content: any;
  coverUrl: string;
  createdAt: string; // JSON.stringify
  editedAt: string;
  creatorId: string;
  creatorName: string;
  creatorPicUrl: string;
  contentId: string;
  title: string;
  type: number;
}

interface initialContentState {
  creator: {
    info: CreatorInfoType | null;
    content: CreatorContentType[] | null;
  };
  isLoading: boolean;
  errorMessage: string | null;
}

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    creator: {
      info: null,
      content: null,
    },
    isLoading: true,
    errorMessage: null,
  } as initialContentState,
  reducers: {
    reset: (state) => ({
      creator: {
        info: null,
        content: null,
      },
      isLoading: true,
      errorMessage: null,
    }),
  },
  extraReducers: {
    [getCreatorInfo.fulfilled.type]: (state, { payload }) => {
      (state.creator.info = payload), (state.isLoading = false);
    },
    [getCreatorInfo.rejected.type]: (state, { payload }) => {
      (state.errorMessage = payload.payload), (state.isLoading = false);
    },
    [getCreatorInfo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getCreatorContent.fulfilled.type]: (
      state,
      { payload }: { payload: CreatorContentType[] }
    ) => {
      (state.creator.content = payload), (state.isLoading = false);
    },
    [getCreatorContent.rejected.type]: (state, { payload }) => {
      (state.errorMessage = payload), (state.isLoading = false);
    },
    [getCreatorContent.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

//reducers
export const { reset } = contentSlice.actions;

//selectors
export const selectCreator = (state: RootState) => state.content.creator;
export const selectErrorMessage = (state: RootState) =>
  state.content.errorMessage;
export const selectIsLoading = (state: RootState) => state.content.isLoading;
