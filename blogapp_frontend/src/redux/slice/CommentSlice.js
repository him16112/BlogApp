import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAllCommentsCall = createAsyncThunk("getAllCommentsCall", async(blogId, {rejectWithValue})=> {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getAllComments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(blogId),
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


export const commentCreateCall = createAsyncThunk("commentCreateCall", async(comment, {rejectWithValue}) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/createComment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(comment),
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


export const commentEditCall = createAsyncThunk("commentEditCall", async(item, {rejectWithValue})=>{
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createComment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(item),
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


export const commentDeleteCall = createAsyncThunk("commentDeleteCall", async(id, {rejectWithValue})=>{
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteComment`,
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(id),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
    
  } catch (error) {
    return rejectWithValue(error.message);
  }
})





const CommentSlice = createSlice({
  name: "Comment",
  initialState: {
    isEditButtonClicked: false,
    isCommentRefreshed: false,
    loading: false,
    error: null,
    allComments: []
  },

  reducers: {
    setIsEditButtonClicked: (state) => {
      state.isEditButtonClicked = !state.isEditButtonClicked;
    },
    setIsCommentRefreshed: (state) => {
      state.isCommentRefreshed = !state.isCommentRefreshed;
    }
  },
  extraReducers: (builder) => {
    builder
     .addCase(getAllCommentsCall.pending, (state) => {
      state.loading = true;
      state.error = null;
     })
     .addCase(getAllCommentsCall.fulfilled, (state, action) => {
      state.loading = false;
      state.allComments = action.payload
     })
     .addCase(getAllCommentsCall.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload || "Failed to fetch comments";
     })
  }
});

export const { setIsEditButtonClicked, setIsCommentRefreshed } = CommentSlice.actions;

export default CommentSlice.reducer;
