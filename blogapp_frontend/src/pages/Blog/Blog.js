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
import { useDispatch } from "react-redux";
import { setIsEditButtonClicked } from "../../redux/BlogSlice";


const Blog = () => {
  const [data, setData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [comment, setComment] = useState({content:'', username:'', blogId: ''});
  const [allComments, setAllComments] = useState([]);
  const [isClicked, setIsclicked] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { blogId } = location.state || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogId) {
      const fetchSingleBlog = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/getSingleBlog`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(blogId),
              credentials: "include",
            }
          );

          if (response.ok) {
            const blog = await response.json();
            setData(blog);
            setEditedData(blog)
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchSingleBlog(blogId);
    }
  }, [isEdited, blogId]);

  useEffect(() => {
    if (data) {
      getAllComments(data._id, setAllComments);
    }
  }, [isClicked, setIsclicked, data]);

  const handleDelete = async () => {
    await deleteBlog(data._id);
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

  const commentDelete = async(id) => {
   try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteComment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(id),
        credentials: "include",
      });

      if(response.ok){
          alert('Comment Deleted!');
          setIsclicked(!isClicked);
      }

   } catch (error) {
    console.log(error);
   }
  }

  const commentEdit = async(item) => {
   try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(item),
          credentials: "include",
        }
      );

      if(response.ok){
        alert("Comment Edited");
        setIsclicked(!isClicked);
        dispatch(setIsEditButtonClicked())
      }

   } catch (error) {
    console.log(error);
   }
  }

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

          <CommentCreate
            comment={comment}
            setComment={setComment}
            commentCreate={() =>
              commentCreate(comment,  setComment, setIsclicked, isClicked)
            }
            BlogId={blogId}
          />

          <AllComments allComments={allComments} blog={data} commentDelete={commentDelete} commentEdit={commentEdit}/> 
        </div>
      )}
      
      {isEdited && (
        <Modal
          blog={editedData}
          handleChange={(e) => handleChange(e, editedData, setEditedData)} // Use handleChange
          handleImageChange={(e) => handleImageChange(e, editedData, setEditedData)} // Use handleImageChange
          onSubmit={() => editBlog(editedData, setIsEdited)}
          onSave={draftSave}
          onClose={() => setIsEdited(!isEdited)}
        />
      )}
    </>
  );
};

export default Blog;
