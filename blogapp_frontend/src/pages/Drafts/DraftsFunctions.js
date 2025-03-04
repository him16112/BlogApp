import { setRefresh, publishDraftCall } from "../../redux/slice/DraftSlice";

// Function to fetch drafts from localStorage
export const fetchDrafts = () => {
  return (
    JSON.parse(localStorage.getItem(localStorage.getItem("username"))) || []
  );
};

// Function to publish a draft
export const publishDraft = async (draft, index, dispatch) => {
  try {
    await dispatch(publishDraftCall(draft));
    alert("Blog Created!");
    deleteDraft(index, dispatch);
  } catch (error) {
    console.log(error);
  }
};

// Function to edit a draft in localStorage
export const editDraft = (index, blog, dispatch, setIsEdited) => {
  const drafts = fetchDrafts();
  const result = drafts.map((draft, ind) => (ind === index ? blog : draft));

  localStorage.setItem(
    localStorage.getItem("username"),
    JSON.stringify(result)
  );
  dispatch(setRefresh());
  setIsEdited(false);
};

// Function to delete a draft
export const deleteDraft = (index, dispatch) => {
  let drafts = fetchDrafts();
  drafts.splice(index, 1);
  localStorage.setItem(
    localStorage.getItem("username"),
    JSON.stringify(drafts)
  );
  dispatch(setRefresh());
};
