import {createSlice} from '@reduxjs/toolkit';

const BlogSlice = createSlice({
    name: 'Blog',
    initialState: {
        isBlogCreated: false,
        isEditButtonClicked: false,
        refresh: false
    },
    reducers:{
        setIsBlogCreated: (state)=>{
            state.isBlogCreated = !state.isBlogCreated;
        },
        setIsEditButtonClicked: (state)=>{
            state.isEditButtonClicked = !state.isEditButtonClicked;
        },
        setRefresh: (state)=>{
            state.refresh = !state.refresh;
        }
    }
});



export const {setIsBlogCreated, setIsEditButtonClicked, setRefresh} = BlogSlice.actions;

export default BlogSlice.reducer;