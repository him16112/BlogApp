// Function to fetch drafts from localStorage
export const fetchDrafts = () => {
  return (
    JSON.parse(localStorage.getItem(localStorage.getItem("username"))) || []
  );
};

// Function to publish a draft
export const publishDraft = async (draft, index, refresh, setRefresh) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/createBlog`,
      {
        method: "POST",
        body: JSON.stringify(draft),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      alert("Blog Created!");
      deleteDraft(index, setRefresh);
      setRefresh(!refresh);
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to edit a draft in localStorage
export const editDraft = (index, blog, refresh, setRefresh, setIsEdited) => {
  const drafts = fetchDrafts();
  const result = drafts.map((draft, ind) => (ind === index ? blog : draft));

  localStorage.setItem(
    localStorage.getItem("username"),
    JSON.stringify(result)
  );
  setRefresh(!refresh);
  setIsEdited(false);
};

// Function to delete a draft
export const deleteDraft = (index, setRefresh) => {
  let drafts = fetchDrafts();
  drafts.splice(index, 1);
  localStorage.setItem(
    localStorage.getItem("username"),
    JSON.stringify(drafts)
  );
  setRefresh((prev) => !prev);
};
