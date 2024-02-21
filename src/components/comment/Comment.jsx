import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/FirebaseConfig";
import { Button } from "@material-tailwind/react";
import "./Comment.css";
function Comment({
  addComment,
  addReplyComment,
  commentText,
  setcommentText,
  allComment,
  fullName,
  setFullName,
}) {
  useEffect(() => {
    setFullName(
      auth.currentUser?.displayName ? auth.currentUser?.displayName : ""
    );
  }, [auth.currentUser]);

  const context = useContext(myContext);
  const { mode } = context;
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/adminlogin");
  };

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (comment) => {
    setReplyingTo(comment);
    setReplyText(`@${comment.fullName} `); // Set default reply text
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const handleAddReply = (originalCommentId) => {
    if (!replyText.trim()) {
      alert("Please enter a reply.");
      return;
    }

    // Add the reply with the original comment ID
    addReplyComment(originalCommentId, replyText);

    // Clear reply text and reset replyingTo state
    setReplyText("");
    setReplyingTo(null);
  };

  const renderComments = (comments, level = 0) => {
    return comments.map((item) => {
      const { id, fullName, commentText, date, replies } = item;
      console.log("Rendering comment with id:", id, "at level:", level); // Added console log
      return (
        <div key={id} className={`ml-${level * 4}`}>
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center px-2 py-1 rounded-lg">
              <p className="inline-flex items-center mr-3 text-lg">
                {/* <img
                  className="w-10 h-10 object-cover rounded-full border-2 border-pink-600 p-1"
                  src={
                    auth.currentUser?.photoURL ? auth.currentUser.photoURL : ""
                  }
                  alt="profile"
                /> */}
                {fullName}
              </p>
              <p className="text-sm">{date}</p>
            </div>
          </footer>
          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-lg">
            <p
              className="text-gray-500 text-md"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              {commentText}
            </p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <NavLink
                style={{ marginLeft: "auto" }}
                onClick={() => handleReply(item)}
              >
                Reply
              </NavLink>
            </div>
            {replyingTo === item && (
              <div className="mt-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder={`Reply to ${fullName}`}
                />
                <Button onClick={handleCancelReply}>Cancel</Button>
                <Button onClick={() => handleAddReply(id)}>Submit</Button>
              </div>
            )}
          </div>
          {replies && (
            <div className={`ml-${(level + 1) * 4}`}>
              {renderComments(replies, level + 1)} {/* Incrementing level */}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <section>
      <div className="flex">
        <img
          className="w-10 h-10 object-cover rounded-full border-2 border-pink-600 p-1"
          src={auth.currentUser?.photoURL ? auth.currentUser.photoURL : ""}
          alt="profile"
        />
        <div className="mt-2">{fullName}</div>
      </div>
      <form>
        <textarea
          value={commentText}
          onChange={(e) => setcommentText(e.target.value)}
          id="comment"
          rows={6}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Write a comment..."
          required
        />
        {isAuth ? (
          <Button className="mt-2" onClick={addComment}>
            Post
          </Button>
        ) : (
          <Button onClick={gotoLogin}>Post</Button>
        )}
      </form>
      {renderComments(allComment)}
    </section>
  );
}

export default Comment;
