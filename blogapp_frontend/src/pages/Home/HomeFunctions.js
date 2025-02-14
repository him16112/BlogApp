import { fetchBlogs } from "../../redux/slice/BlogSlice";

export const getAllBlogs = async(dispatch) => {
    try {
        await dispatch(fetchBlogs());
    } catch (error) {
        console.log(error);
    }
}

export const blogView = (blogId, navigate) => {
    navigate("/blog", { state: { blogId } });
};