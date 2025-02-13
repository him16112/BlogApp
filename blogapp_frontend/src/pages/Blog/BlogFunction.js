import { fetchSingleBlogCall, editBlogCall, deleteBlogCall } from "../../redux/slice/BlogSlice";
import { commentCreateCall, commentDeleteCall, commentEditCall, getAllCommentsCall, setIsCommentRefreshed, setIsEditButtonClicked } from "../../redux/slice/CommentSlice";

export const getAllComments = async (blogId, setAllComments, dispatch) => {
    try {
      const response = await dispatch(getAllCommentsCall(blogId));
      setAllComments(response.payload);
    } catch (error) {
      console.log(error);
    }
};
  
export const commentCreate = async (comment, setComment, dispatch) => {  
    try {
        await dispatch(commentCreateCall(comment)); 
        setComment({...comment, content: ''});
        dispatch(setIsCommentRefreshed());
    } catch (error) {
      console.log(error);
    }
};

export  const commentEdit = async(item, dispatch) => {
   try {
      await dispatch(commentEditCall(item));
      alert("Comment Edited");
      dispatch(setIsCommentRefreshed());
      dispatch(setIsEditButtonClicked());
   } catch (error) {
    console.log(error);
   }
};

export  const commentDelete = async(id, dispatch) => {
   try {
      await dispatch(commentDeleteCall(id));
      alert('Comment Deleted!');
      dispatch(setIsCommentRefreshed());
   } catch (error) {
    console.log(error);
   }
};

export const fetchSingleBlog = async(blogId, setData, setEditedData, dispatch) => {
 try {
    const response = await dispatch(fetchSingleBlogCall(blogId));
    setData(response.payload);
    setEditedData(response.payload);
  } 
  catch (error) {
   console.log(error);
 }
};

export const editBlog = async (blog, setIsEdited, dispatch) => {
  try {
      await dispatch(editBlogCall(blog));
      alert("Blog Edited!");
      setIsEdited((prev) => !prev);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (id, dispatch) => {
  try {
    await dispatch(deleteBlogCall(id));
    alert("Blog Deleted");
  } catch (error) {
    console.log(error);
  }
};