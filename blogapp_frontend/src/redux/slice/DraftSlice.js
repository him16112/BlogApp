import { createSlice } from "@reduxjs/toolkit";

const DraftSlice = createSlice({
  name: "Draft",
  initialState: {
    refresh: false,
  },
  reducers: {
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { setRefresh } = DraftSlice.actions;

export default DraftSlice.reducer;
