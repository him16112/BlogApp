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
        setAllComments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const commentCreate = async (comment, setComment, setIsclicked, isClicked) => {  
    //console.log(comment);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/createComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(comment),
          credentials: "include",
        }
      );
  
      if (response.ok) {
        await response.json();
        setComment({...comment, content: ''});
        setIsclicked(!isClicked);
      }
    } catch (error) {
      console.log(error);
    }
  };
  