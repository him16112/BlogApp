import React, { useContext, useState } from "react";
import "../styles/AllComments.css";
import CommentCreate from "./CommentCreate";
import { BlogContext } from "../context/Context";

const AllComments = ({ allComments, blog, commentDelete, commentEdit }) => {
  const [index, setIndex] = useState(null);
  const {isEditButtonClicked, setIsEditButtonClicked} = useContext(BlogContext);
  const [editedComment, setEditedComment] = useState(null);

  return (
    <>
      <div className="comment-content-container">
        <p className="heading">Comments {allComments.length}</p>
        <ul className="all-comments">
          {allComments?.map((data, ind) => (
            <div className="main-comment-container" key={data._id}>
              <li className="comment-item">
                <p>{data.content}</p>
                <span>{data.username}</span>
              </li>

              <div className="button-class">
                {localStorage.getItem("username") === data.username &&  (
                  <button
                    className="button-design"
                    onClick={() => {setIsEditButtonClicked(!isEditButtonClicked); setIndex(ind); setEditedComment(data)}}
                  >
                    Edit
                  </button>
                )}

                {(localStorage.getItem("username") === data.username ||
                  localStorage.getItem("username") === blog.username) && (
                  <button
                    className="button-design"
                    onClick={() => commentDelete(data._id)}
                  >
                    Delete
                  </button>
                )}
              </div>

              {isEditButtonClicked && ind === index && <CommentCreate comment={editedComment} setComment={setEditedComment} commentCreate={()=>commentEdit(editedComment) }/>}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllComments;
