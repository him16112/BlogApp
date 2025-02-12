import { setIsBlogCreated } from "../../redux/BlogSlice";

// Function to fetch blogs from the backend
export const fetchBlogs = async (setBlogs, dispatch) => {
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

    if (response.ok) {
      const data = await response.json();
      setBlogs(data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsBlogCreated());
  }
};

// Function to navigate to the specific blog view
export const blogView = (navigate, blogId) => {
  navigate("/blog", { state: { blogId } });
};
