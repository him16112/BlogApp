
export const fetchMyBlogs = async (setMyBlogs) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/myBlogs`, {
        method: "POST",
        body: JSON.stringify(localStorage.getItem("username")),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
  
      if (response.ok) {
        const data = await response.json();
        setMyBlogs(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  
  export const editBlog = async (blog, setIsEdited) => {
    try {
       console.log("Clicked edit")
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createBlog`, {
        method: "POST",
        body: JSON.stringify(blog),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
  
      if (response.ok) {
        alert("Blog Edited!");
        setIsEdited((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteBlog = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteBlog`, {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
  
      if (response.ok) {
        alert("Blog Deleted");
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  