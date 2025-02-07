import React from "react";


const Modal = ({blog, handleChange, handleImageChange, onSubmit, onSave, onClose}) => {
    return (
        <>
           <div className="modal">
            <div className="modal-content">
              <h2>Edit Blog</h2>
              <div className="form-group">
                <textarea
                  placeholder="Title"
                  name="title"
                  value={blog.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Content"
                  name="paragraph"
                  value={blog.paragraph}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input type="file" name="image" onChange={handleImageChange} />
              </div>
              <div className="buttons">
                {onSubmit && <button onClick={()=> onSubmit()} className="btn">  Submit</button>}
                {onSave && <button onClick={()=> onSave()} className="btn">Save Draft</button>}
                {onClose && <button onClick={onClose} className="btn">Close</button>}
              </div>
            </div>
          </div>
        </>
    )
}

export default Modal;









