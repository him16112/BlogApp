import { createSlice } from "@reduxjs/toolkit";

const CommentSlice = createSlice({
  name: "Comment",
  initialState: {
    isEditButtonClicked: false,
  },

  reducers: {
    setIsEditButtonClicked: (state) => {
      state.isEditButtonClicked = !state.isEditButtonClicked;
    },
  },
});

export const { setIsEditButtonClicked } = CommentSlice.actions;

export default CommentSlice.reducer;
