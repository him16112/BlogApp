// Helper function to handle form field changes
export const handleChange = (e, blog, setBlog) => {
  const { name, value } = e.target;
  setBlog({ ...blog, [name]: value });
};

// Helper function to handle image changes and convert to base64
export const handleImageChange = async (e, blog, setBlog) => {
  const file = e.target.files[0];
  const base64Image = await getBase64Image(file);
  setBlog({ ...blog, image: base64Image });
};

// Helper function to handle image conversion to base64
const getBase64Image = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Resolve with the base64 string
    reader.onerror = reject; // Reject on error
    reader.readAsDataURL(imageFile); // Convert image to base64
  });
};

// export const validateData = (data, setMssg) => {
//   // Validation for title and paragraph
//   if (!data.title || !data.paragraph) {
//     if (!data.title) {
//       setMssg("Title is required!");
//     } else if (!data.paragraph) {
//       setMssg("Paragraph is required!");
//     }
//     return null; // Return null if validation fails
//   }
// };


export const saveDraft = async (blogData, setBlogData, setIsClicked, setRefresh, refresh) => {
  const loggedinName = localStorage.getItem("username");
  const requestData = {...blogData, username: loggedinName};
  let existingDrafts = JSON.parse(localStorage.getItem(loggedinName)) || [];
  existingDrafts.push(requestData);
  localStorage.setItem(loggedinName, JSON.stringify(existingDrafts));

  alert("Draft Saved!");
  setIsClicked(false);
  setRefresh(!refresh);
  setBlogData({
    title: "",
    paragraph: "",
    image: null,
  });
};

export const submitBlog = async (blogData, setBlogData, setIsBlogCreated, setIsClicked) => {
  const requestData = {...blogData, username: localStorage.getItem('username')};

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/createBlog`,
      {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      alert("Blog Created!");
      setIsBlogCreated(true);
      setIsClicked(false);
      setBlogData({
        title: "",
        paragraph: "",
        image: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};



export const blogView = (navigate, blog) => {
  navigate("/blog", { state: { blog } });
};


