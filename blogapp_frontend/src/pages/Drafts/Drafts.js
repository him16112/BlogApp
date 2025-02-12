import React, {  useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import "../../styles/Drafts.css";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "../../component/BlogList";
import Modal from "../../component/Modal";
import { fetchDrafts, publishDraft, editDraft, deleteDraft } from "./DraftsFunctions";
import { handleChange, handleImageChange } from "../../globalfunction";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [index, setIndex] = useState(null);
  const [blog, setBlog] = useState({});
  const dispatch = useDispatch();
  const refresh = useSelector(state => state.Draft.refresh);

  useEffect(() => {
    const savedDrafts = fetchDrafts(); // Use the function to fetch drafts
    if (savedDrafts) {
      setDrafts(savedDrafts);
    }
  }, [refresh]);


  return (
    <>
      <Navbar />
      <div className="draft-container">
        {drafts.length > 0 ? (
          drafts.map((draft, index) => (
            <BlogList
              key={index}
              blog={draft}
              index={index}
              onPublish={() => publishDraft(draft, index, dispatch)} // Use publishDraft
              onDelete={() => deleteDraft(index, dispatch)} // Use deleteDraft
              onEdit={() => {
                setIsEdited(!isEdited);
                setBlog(draft);
                setIndex(index);
              }}
            />
          ))
        ) : (
          <p>No drafts available.</p>
        )}

        {isEdited && (
          <Modal
            blog={blog}
            handleChange={(e) => handleChange(e, blog, setBlog)} // Use handleChange
            handleImageChange={(e) => handleImageChange(e, blog, setBlog)} // Use handleImageChange
            onSave={() => editDraft(index, blog, dispatch, setIsEdited)} // Use editDraft
            onClose={() => setIsEdited(!isEdited)}
          />
        )}
      </div>
    </>
  );
};

export default Drafts;
