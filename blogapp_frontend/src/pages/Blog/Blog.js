import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../../styles/Blog.css";
import Navbar from "../../component/Navbar";
import BlogList from "../../component/BlogList";
import CommentCreate from "../../component/CommentCreate";
import AllComments from "../../component/AllComments";
import Modal from "../../component/Modal";
import { handleChange, handleImageChange } from "../../globalfunction";
import { getAllComments, commentCreate, fetchSingleBlog, deleteBlog, editBlog } from "./BlogFunction"; // Import new functions
import { useDispatch, useSelector } from "react-redux";


const Blog = () => {
  const [editedData, setEditedData] = useState(null);
  const [comment, setComment] = useState({content:'', username:'', blogId: ''});
  const [isEdited, setIsEdited] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = location.state || {};
  const isCommentRefreshed = useSelector(state => state.Comment.isCommentRefreshed);
  const blog = useSelector(state => state.Blog.blog);
  const allComments = useSelector(state => state.Comment.allComments);

  useEffect(() => {
    if (blogId) {
     const funCall = async() => {
        await fetchSingleBlog(blogId, setEditedData, dispatch);
       } 
       funCall();
    }
  }, [isEdited, blogId, dispatch]);

  useEffect(() => {
    if (blogId) {
      const funCall = async() => {
        await getAllComments(blogId, dispatch);
      }
      funCall();
    }
  }, [isCommentRefreshed, blogId, dispatch]);

  const handleDelete = async () => {
    await deleteBlog(blogId, dispatch);
    setEditedData(null);
    navigate("/");
  };

  const draftSave = async () => {
    const loggedinName = localStorage.getItem("username");
    const existingDrafts = JSON.parse(localStorage.getItem(loggedinName)) || [];
    existingDrafts.push(editedData);
    localStorage.setItem(loggedinName, JSON.stringify(existingDrafts));
    alert("Draft Saved!");
    setIsEdited(!isEdited);
  };


  return (
    <>
      <Navbar />
      {blog &&(
        <div className="blog-container">
          {localStorage.getItem("username") === blog.username ? (
            <BlogList
              blog={blog}
              onDelete={handleDelete}
              onEdit={() => setIsEdited(!isEdited)}
            />
          ) : (
            <BlogList blog={blog} />
          )}

          <CommentCreate
            comment={comment}
            setComment={setComment}
            commentCreate={() =>
              commentCreate(comment, setComment, dispatch)
            }
            BlogId={blogId}
          />

          <AllComments allComments={allComments} blog={blog} /> 
        </div>
      )}
      
      {isEdited && (
        <Modal
          blog={editedData}
          handleChange={(e) => handleChange(e, editedData, setEditedData)} // Use handleChange
          handleImageChange={(e) => handleImageChange(e, editedData, setEditedData)} // Use handleImageChange
          onSubmit={() => editBlog(editedData, setIsEdited, dispatch)}
          onSave={draftSave}
          onClose={() => setIsEdited(!isEdited)}
        />
      )}
    </>
  );
};

export default Blog;
