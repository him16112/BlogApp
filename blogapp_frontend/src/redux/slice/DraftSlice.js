import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const publishDraftCall = createAsyncThunk("publishDraftCall", async(draft, {rejectWithValue})=>{
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/createBlog`,
      {
        method: "POST",
        body: JSON.stringify(draft),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      }
    );
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

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
