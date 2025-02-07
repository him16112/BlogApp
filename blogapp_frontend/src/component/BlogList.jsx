import React from "react";
import "../styles/MyBlogs.css";

const BlogList = ({ blog, index, onEdit, onDelete, onPublish, onComments }) => {
  return (
    <div className="blog-box">
      <h3 className="title-blog">{blog.title}</h3>
      <p>{blog.paragraph}</p>
      {blog.username && (
        <p>
          <strong>Written by:</strong> {blog.username}
        </p>
      )}
      {blog.image && (
        <div className="image-container">
          <img src={blog.image} alt="Blog" />
        </div>
      )}

      <div className="button-container">
        {onPublish && (
          <button onClick={() => onPublish(blog, index)}>Publish</button>
        )}
        {onEdit && (
          <button onClick={() => onEdit(blog, index)}>Edit</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(index)}>Delete</button>
        )}
  
        
      </div>
    </div>
  );
};

export default BlogList;
