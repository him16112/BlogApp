import { fetchMyBlogs } from "../../redux/slice/BlogSlice";

export const getMyBlogs = async (dispatch) => {
    try {
        await dispatch(fetchMyBlogs());
    } catch (error) {
      console.log(error);
    }
  };

  