import React, { useState } from "react";
import "../styles/AllComments.css";
import CommentCreate from "./CommentCreate";
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditButtonClicked } from "../redux/slice/CommentSlice";
import { commentEdit, commentDelete } from "../pages/Blog/BlogFunction";


const AllComments = ({ allComments, blog }) => {
  const [index, setIndex] = useState(null);
  const dispatch = useDispatch();
  const isEditButtonClicked = useSelector(state => state.Comment.isEditButtonClicked);
  const [editedComment, setEditedComment] = useState(null);

  return (
    <>
      <div className="comment-content-container">
        <p className="heading">{allComments.length} Comments </p>
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
                    onClick={() => {dispatch(setIsEditButtonClicked()); setIndex(ind); setEditedComment(data)}}
                  >
                    Edit
                  </button>
                )}

                {(localStorage.getItem("username") === data.username ||
                  localStorage.getItem("username") === blog.username) && (
                  <button
                    className="button-design"
                    onClick={() => commentDelete(data._id, dispatch)}
                  >
                    Delete
                  </button>
                )}
              </div>

              {isEditButtonClicked && ind === index && <CommentCreate comment={editedComment} setComment={setEditedComment} commentCreate={()=>commentEdit(editedComment, dispatch) }/>}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllComments;
