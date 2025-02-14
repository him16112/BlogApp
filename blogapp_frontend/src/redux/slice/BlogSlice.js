import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBlogs = createAsyncThunk("fetchBlogs", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getAllBlogs`,
      {
        headers: {
          "Content-Type": "application/json",
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
});


export const createBlog = createAsyncThunk("createBlog", async (blogData, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/createBlog`,
      {
        method: "POST",
        body: JSON.stringify(blogData),
        headers: {
          "Content-Type": "application/json",
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
});


export const fetchMyBlogs = createAsyncThunk("fetchMyBlogs", async(_, {rejectWithValue}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/myBlogs`, {
      method: "POST",
      body: JSON.stringify(localStorage.getItem("username")),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    });
     
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


export const deleteBlogCall = createAsyncThunk("deleteBlogCall", async(id, {rejectWithValue}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteBlog`, {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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


export const editBlogCall = createAsyncThunk("editBlogCall", async(blogData, {rejectWithValue}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createBlog`, {
      method: "POST",
      body: JSON.stringify(blogData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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


export const fetchSingleBlogCall = createAsyncThunk("fetchSingleBlogCall", async(id, {rejectWithValue}) => {
 try {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/getSingleBlog`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(id),
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


const BlogSlice = createSlice({
  name: "Blog",
  initialState: {
    isBlogCreated: false,
    error: null,
    loading: false,
    allBlogs: [],
    myBlogs: [],
    blog: {}
  },

  reducers: {
    setIsBlogCreated: (state) => {
      state.isBlogCreated = !state.isBlogCreated;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.allBlogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch blogs";
      })

      .addCase(fetchMyBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.myBlogs = action.payload;
      })
      .addCase(fetchMyBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create blog";
      })
        
      .addCase(fetchSingleBlogCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBlogCall.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchSingleBlogCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch blog";
      })
  },
});

export const { setIsBlogCreated } = BlogSlice.actions;
export default BlogSlice.reducer;
