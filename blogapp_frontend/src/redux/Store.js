import { configureStore } from "@reduxjs/toolkit";
import BlogReducer from './slice/BlogSlice';
import DraftReducer from './slice/DraftSlice';
import CommentReducer from './slice/CommentSlice'

const Store = configureStore({
    reducer: {
        Blog: BlogReducer,
        Comment: CommentReducer,
        Draft: DraftReducer
    }
});

export default Store;
