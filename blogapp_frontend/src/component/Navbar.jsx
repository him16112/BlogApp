import React, { useState} from "react";
import { useNavigate } from "react-router";
import "../styles/Navbar.css";
import {useDispatch } from 'react-redux';
import Modal from "./Modal";
import { handleChange, handleImageChange, submitBlog, saveDraft } from "../globalfunction";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    paragraph: "",
    image: null
  }); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="navbar-box">
        <div className="navbar-main">
          <span className="logo" onClick={() => navigate("/home")}>
            Blog Site
          </span>
          <div className="nav-buttons">
            <button
              onClick={() => navigate("/my-blogs")}
              className="nav-button"
            >
              My Blogs
            </button>
            <button
              onClick={() => navigate("/my-drafts")}
              className="nav-button"
            >
              My Drafts
            </button>
            <button onClick={handleClick} className="nav-button">
              Create Blog
            </button>
            <button onClick={logout} className="nav-button">
              Logout
            </button>
          </div>
        </div>
      </div>

      {isClicked && (
        <Modal
          blog={blogData}
          handleChange={(e) => handleChange(e, blogData, setBlogData)}
          handleImageChange={(e) => handleImageChange(e, blogData, setBlogData)}
          onSubmit={() => submitBlog(blogData, setBlogData, dispatch, setIsClicked)}
          onSave={() => saveDraft(blogData, setBlogData, setIsClicked, dispatch)}
          onClose={() => setIsClicked(false)}
        />
      )}
    </>
  );
};

export default Navbar;
