export const getAllComments = async (blogId, setAllComments) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getAllComments`,
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
        const data = await response.json();
        console.log(data);
        setAllComments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const commentCreate = async (comment, data, setComment, setIsclicked, isClicked) => {
    let bodyData = {
      content: comment,
      username: localStorage.getItem("username"),
      BlogId: data._id,
    };
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/createComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(bodyData),
          credentials: "include",
        }
      );
  
      if (response.ok) {
        const ans = await response.json();
        console.log(ans);
        setComment("");
        setIsclicked(!isClicked);
      }
    } catch (error) {
      console.log(error);
    }
  };
  