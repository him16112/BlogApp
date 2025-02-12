import { configureStore } from "@reduxjs/toolkit";
import BlogReducer from './BlogSlice';

const Store = configureStore({
    reducer: {
        Blog: BlogReducer
    }
});

export default Store;
