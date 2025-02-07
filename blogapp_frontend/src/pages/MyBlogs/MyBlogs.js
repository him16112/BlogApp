// import React, { useContext, useEffect, useState } from "react";
// import Navbar from "../../component/Navbar";
// import "../../styles/MyBlogs.css";
// import { BlogContext } from "../../context/Context";
// import BlogList from "../../component/BlogList";
// import Modal from "../../component/Modal";
// import { fetchMyBlogs, editBlog, deleteBlog } from "./MyBlogsApi";
// import { handleChange, handleImageChange } from "../../globalfunction";

// const MyBlogs = () => {
//   const [myBlogs, setMyBlogs] = useState([]);
//   const [isDeleted, setIsDeleted] = useState(false);
//   const [isEdited, setIsEdited] = useState(false);
//   const [blog, setBlog] = useState();
//   const [showComments, setShowComments] = useState(false);
//   const {isBlogCreated} = useContext(BlogContext);

//   useEffect(() => {
//     fetchMyBlogs(setMyBlogs); // Use the API function to fetch blogs
//   }, [isDeleted, isEdited, isBlogCreated]);

//   const draftSave = async() => {
//     const loggedinName = localStorage.getItem('username');
//     const existingDrafts = JSON.parse(localStorage.getItem(loggedinName)) || [];
//     existingDrafts.push(blog)
//     localStorage.setItem(loggedinName, JSON.stringify(existingDrafts));
//     alert("Draft Saved!");
//     setIsEdited(!isEdited);
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="myblogs-container">

//         {myBlogs.length > 0 ? (
//           myBlogs.map((myBlog, index) => (
//             <div>
//             <BlogList
//               key={myBlog._id}
//               blog={myBlog}
//               index={index}
//               onDelete={() => deleteBlog(myBlog._id, setIsDeleted)}
//               onEdit={() => {
//                 setBlog(myBlog);
//                 setIsEdited(!isEdited);
//               }}
//               onComments={()=>setShowComments(!showComments)}
//             />

//             {
//               showComments
//             }
//             </div>

//           ))
//         ) : (
//           <p>No blogs available.</p>
//         )}

//         {
//           isEdited &&
//           <Modal
//             blog = {blog}
//             handleChange={(e) => handleChange(e, blog, setBlog)} // Use handleChange
//             handleImageChange={(e) => handleImageChange(e, blog, setBlog)} // Use handleImageChange
//             onSubmit={()=>editBlog(blog, setIsEdited)}
//             onSave={draftSave}
//             onClose={()=> setIsEdited(!isEdited)}
//           />
//         }
//       </div>
//     </>
//   );
// };

// export default MyBlogs;



import React, { useContext, useEffect, useState } from "react";
import { fetchMyBlogs} from "./MyBlogsApi";
import { BlogContext } from "../../context/Context";
import { useNavigate } from 'react-router';
import Navbar from "../../component/Navbar";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const { isBlogCreated } = useContext(BlogContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBlogs(setMyBlogs); // Use the API function to fetch blogs
  }, [isBlogCreated]);

  const blogView = (blog) => {
    navigate("/blog", { state: { blog } });
  }

  return (
    <>
     <Navbar/>
      <div className="home-container">
        <ul className="blog-list">
          {myBlogs.map((blog) => (
            <li
              key={blog._id}
              className="blog-item"
              onClick={() => blogView(blog)}
            >
              <div className="title">{blog.title}</div>
              <div className="paragraph">{blog.paragraph}</div>
              <div className="username">{blog.username}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyBlogs;
