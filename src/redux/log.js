import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMintState: null,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    updateCurrentMintState(state, action) {
      state.currentMintState = action.payload;
    },
  },
});

export const { updateCurrentMintState } = logSlice.actions;
export default logSlice.reducer;
