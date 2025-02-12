import { fetchBlogs } from "../../redux/slice/BlogSlice";

export const getAllBlogs = async(dispatch, setBlogs) => {
    try {
        const response = await dispatch(fetchBlogs());
         setBlogs(response.payload);
    } catch (error) {
        console.log(error);
    }
}

export const blogView = (blogId, navigate) => {
    navigate("/blog", { state: { blogId } });
};