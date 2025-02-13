import React, {useEffect, useState } from "react";
import { getMyBlogs} from "./MyBlogsApi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import Navbar from "../../component/Navbar";


const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const isBlogCreated = useSelector(state => state.Blog.isBlogCreated) 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const funCall = async() =>{
      await getMyBlogs(setMyBlogs, dispatch); 
    }
    funCall();
  }, [isBlogCreated, dispatch]);

  const blogView = (blogId) => {
    navigate("/blog", { state: { blogId } });
  }

  return (
    <>
     <Navbar/>
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
    </>
  );
};

export default MyBlogs;
