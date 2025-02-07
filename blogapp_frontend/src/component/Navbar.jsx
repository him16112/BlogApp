import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import "../styles/Navbar.css";
import { BlogContext } from "../context/Context";
import Modal from "./Modal";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    paragraph: "",
    image: null,
  });

  const { setIsBlogCreated } = useContext(BlogContext);
  const { refresh, setRefresh } = useContext(BlogContext);
  const [mssg, setMssg] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  // Helper function to handle image conversion to base64
  const getBase64Image = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Resolve with the base64 string
      reader.onerror = reject; // Reject on error
      reader.readAsDataURL(imageFile); // Convert image to base64
    });
  };

  // Helper function to handle validation and create the request data
  const createRequestData = async () => {
    // Validation for title and paragraph
    if (!blogData.title || !blogData.paragraph) {
      if (!blogData.title) {
        setMssg("Title is required!");
      } else if (!blogData.paragraph) {
        setMssg("Paragraph is required!");
      }
      return null; // Return null if validation fails
    }

    let requestData = {
      title: blogData.title,
      paragraph: blogData.paragraph,
      username: localStorage.getItem("username"),
      image: null, // Default to null if no image is provided
    };

    // Handle image (if present) as base64
    if (blogData.image) {
      try {
        const base64Image = await getBase64Image(blogData.image);
        requestData.image = base64Image;
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    return requestData;
  };

  const saveDraft = async () => {
    const requestData = await createRequestData();
    if (!requestData) return;

    const loggedinName = localStorage.getItem("username");

    let existingDrafts = JSON.parse(localStorage.getItem(loggedinName)) || [];

    existingDrafts.push(requestData);

    localStorage.setItem(loggedinName, JSON.stringify(existingDrafts));
    
    alert("Draft Saved!");
    setIsClicked(false);
    setRefresh(!refresh);
    setBlogData({
      title: "",
      paragraph: "",
      image: null,
    });
  };

  const submitBlog = async (e) => {

    const requestData = await createRequestData();
    if (!requestData) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createBlog`, {
        method: "POST",
        // body: formData,
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        alert("Blog Created!");
        setIsBlogCreated(true);
        setIsClicked(false);
        setBlogData({
          title: "",
          paragraph: "",
          image: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
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

      {
        isClicked &&
          <Modal
           blog = {blogData}
           handleChange = {handleChange}
           handleImageChange = {handleImageChange}
           onSubmit = {submitBlog}
           onSave = {saveDraft}
           onClose = {() => setIsClicked(false)}
          />
        
      }
    </>
  );
};

export default Navbar;
