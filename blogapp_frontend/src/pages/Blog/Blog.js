import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../../styles/Blog.css"; 
import Navbar from "../../component/Navbar";
import BlogList from "../../component/BlogList";
import CommentCreate from "../../component/CommentCreate";
import AllComments from "../../component/AllComments";
import { deleteBlog, editBlog } from "../MyBlogs/MyBlogsApi";
import Modal from "../../component/Modal";
import { handleChange, handleImageChange } from "../../globalfunction";
import { getAllComments, commentCreate } from "./BlogFunction"; // Import new functions

const Blog = () => {
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isClicked, setIsclicked] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname);
    setData(location.state.blog);
  }, [location.state, isEdited]);

  useEffect(() => {
    if (data) {
      getAllComments(data._id, setAllComments);
    }
  }, [isClicked, setIsclicked, data]);

  const handleDelete = async () => {
    await deleteBlog(data._id);
    setData(null); // Remove blog from UI
    navigate("/");
  };

  const draftSave = async () => {
    const loggedinName = localStorage.getItem("username");
    const existingDrafts = JSON.parse(localStorage.getItem(loggedinName)) || [];
    existingDrafts.push(data);
    localStorage.setItem(loggedinName, JSON.stringify(existingDrafts));
    alert("Draft Saved!");
    setIsEdited(!isEdited);
  };

  return (
    <>
      <Navbar />
      {data && (
        <div className="blog-container">
          {localStorage.getItem("username") === data.username ? (
            <BlogList
              blog={data}
              onDelete={handleDelete}
              onEdit={() => setIsEdited(!isEdited)}
            />
          ) : (
            <BlogList blog={data} />
          )}

          <button
            className="add-comment-btn"
            onClick={() => setIsclicked(!isClicked)}
          >
            Add Comment
          </button>

          {isClicked && (
            <CommentCreate
              comment={comment}
              setComment={setComment}
              commentCreate={() => commentCreate(comment, data, setComment, setIsclicked, isClicked)}
            />
          )}

          <AllComments allComments={allComments} />
        </div>
      )}
      {isEdited && (
        <Modal
          blog={data}
          handleChange={(e) => handleChange(e, data, setData)} // Use handleChange
          handleImageChange={(e) => handleImageChange(e, data, setData)} // Use handleImageChange
          onSubmit={() => editBlog(data, setIsEdited)}
          onSave={draftSave}
          onClose={() => setIsEdited(!isEdited)}
        />
      )}
    </>
  );
};

export default Blog;
