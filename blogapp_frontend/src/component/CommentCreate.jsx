import React from "react";
import "../styles/CommentCreate.css"

const CommentCreate = ({ comment, setComment, commentCreate }) => {
  return (
    <div className="comment-container">
      <input
        type="text"
        placeholder="Add a comment..."
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="comment-submit" onClick={commentCreate}>
        Submit
      </button>
    </div>
  );
};

export default CommentCreate;
