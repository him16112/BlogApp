import { setIsBlogCreated , createBlog} from "./redux/slice/BlogSlice";
import {setRefresh} from "./redux/slice/DraftSlice"

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


export const saveDraft = async (blogData, setBlogData, setIsClicked, dispatch) => {
  const loggedinName = localStorage.getItem("username");
  const requestData = {...blogData, username: loggedinName};
  let existingDrafts = JSON.parse(localStorage.getItem(loggedinName)) || [];
  existingDrafts.push(requestData);
  localStorage.setItem(loggedinName, JSON.stringify(existingDrafts));

  alert("Draft Saved!");
  setIsClicked(false);
  dispatch(setRefresh());
  setBlogData({
    title: "",
    paragraph: "",
    image: null,
  });
};


export const submitBlog = async (blogData, setBlogData, dispatch, setIsClicked) => {
  try {
      const requestData = {...blogData, username: localStorage.getItem('username')};
      await dispatch(createBlog(requestData));
      alert("Blog Created!");
      dispatch(setIsBlogCreated());
      setIsClicked(false);
      setBlogData({ title: "", paragraph: "", image: null });
     
  } catch (error) {
    console.log(error)
  }
  
};



export const blogView = (navigate, blog) => {
  navigate("/blog", { state: { blog } });
};


