import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    updateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFail,
  updateStart,
  updateSuccess,
  updateFail,
} = userSlice.actions;
export default userSlice.reducer;
