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

const BlogSlice = createSlice({
  name: "Blog",
  initialState: {
    isBlogCreated: false,
    error: null,
    loading: false,
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
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch blogs";
      })

      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.isBlogCreated = true;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create blog";
      });
  },
});

export const { setIsBlogCreated } = BlogSlice.actions;
export default BlogSlice.reducer;
