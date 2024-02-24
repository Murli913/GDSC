import React, { useState } from "react";
import "./Comment.css";
import { auth } from "../../firebase/FirebaseConfig";

function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}) {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="comment-form">
          <div className="comment-image-container-textarea">
            <img src={auth.currentUser?.photoURL}></img>
          </div>
          <textarea
            className="comment-form-textarea"
            value={text}
            placeholder="Add a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <button className="comment-form-button" disabled={isTextareaDisabled}>
            {submitLabel}
          </button>
        </div>
        {hasCancelButton && (
          <button
            type="button"
            className="comment-form-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default CommentForm;
