import {createSlice} from '@reduxjs/toolkit';

const BlogSlice = createSlice({
    name: 'Blog',
    initialState: {
        isBlogCreated: false,
    },
    reducers:{
        setIsBlogCreated: (state)=>{
            state.isBlogCreated = !state.isBlogCreated;
        }
    }
});



export const {setIsBlogCreated} = BlogSlice.actions;

export default BlogSlice.reducer;