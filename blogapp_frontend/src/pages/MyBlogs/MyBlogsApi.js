import { fetchMyBlogs } from "../../redux/slice/BlogSlice";

export const getMyBlogs = async (setMyBlogs, dispatch) => {
    try {
        const response = await dispatch(fetchMyBlogs(setMyBlogs));
        setMyBlogs(response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  