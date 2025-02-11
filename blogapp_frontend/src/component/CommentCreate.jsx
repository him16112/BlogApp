import React from "react";
import "../styles/CommentCreate.css"

const CommentCreate = ({ comment, setComment, commentCreate, BlogId }) => {
  return (
    <div className="comment-container">
      <input
        type="text"
        placeholder="Add a comment..."
        className="comment-input"
        value={comment.content}
        onChange={(e) => setComment({...comment, content: e.target.value, username: localStorage.getItem('username'), BlogId: BlogId })}
      />
      <button className="comment-submit" onClick={commentCreate}>
        Submit
      </button>
    </div>
  );
};

export default CommentCreate;
