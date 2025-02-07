
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/editBlog`, {
        method: "PUT",
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
  
  // export const deleteBlog = async (id, setIsDeleted) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteBlog`, {
  //       method: "POST",
  //       body: JSON.stringify(id),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       credentials: "include",
  //     });
  
  //     if (response.ok) {
  //       alert("Blog Deleted");
  //       setIsDeleted((prev) => !prev);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  

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
  