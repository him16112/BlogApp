import React, { useEffect} from "react";
import { getMyBlogs } from "./MyBlogsApi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Navbar from "../../component/Navbar";

const MyBlogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isBlogCreated = useSelector((state) => state.Blog.isBlogCreated);
  const loading = useSelector((state) => state.Blog.loading);
  const myBlogs = useSelector((state) => state.Blog.myBlogs);

  useEffect(() => {
    const funCall = async () => {
      await getMyBlogs(dispatch);
    };
    funCall();
  }, [isBlogCreated, dispatch]);

  const blogView = (blogId) => {
    navigate("/blog", { state: { blogId } });
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loading-container">
          <p>My Blogs Loading...</p>
        </div>
      ) : (
        <div className="home-container">
          <ul className="blog-list">
            {myBlogs?.map((blog) => (
              <li
                key={blog._id}
                className="blog-item"
                onClick={() => blogView(blog._id)}
              >
                <div className="title">{blog.title}</div>
                <div className="paragraph">{blog.paragraph}</div>
                <div className="username">{blog.username}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MyBlogs;
