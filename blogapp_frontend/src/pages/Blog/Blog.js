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
  const [data, setData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [comment, setComment] = useState({content:'', username:'', blogId: ''});
  const [allComments, setAllComments] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { blogId } = location.state || {};
  const dispatch = useDispatch();
  const isCommentRefreshed = useSelector(state => state.Comment.isCommentRefreshed);

  useEffect(() => {
    if (blogId) {
     const funCall = async() => {
        await fetchSingleBlog(blogId, setData, setEditedData, dispatch);
       } 
       funCall();
    }
  }, [isEdited, blogId, dispatch]);

  useEffect(() => {
    if (data) {
      const funCall = async() => {
        await getAllComments(data._id, setAllComments, dispatch);
      }
      funCall();
    }
  }, [isCommentRefreshed, data, dispatch]);

  const handleDelete = async () => {
    await deleteBlog(data._id, dispatch);
    setData(null); // Remove blog from UI
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
      {data &&(
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

          <CommentCreate
            comment={comment}
            setComment={setComment}
            commentCreate={() =>
              commentCreate(comment, setComment, dispatch)
            }
            BlogId={blogId}
          />

          <AllComments allComments={allComments} blog={data} /> 
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
