import React from "react";
import "../styles/AllComments.css"

const AllComments = ({ allComments }) => {
  return (
    <>
     <p className="heading">Comments</p>
    <ul className="all-comments">
      {allComments?.map((comment) => (
        <li key={comment._id} className="comment-item">
          <p>{comment.content}</p>
          <span>{comment.username}</span>
        </li>
      ))}
    </ul>
    </>
  );
};

export default AllComments;
