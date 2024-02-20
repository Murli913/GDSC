import { Button } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router-dom";

function Comment({
  addComment,
  addReplyComment,
  commentText,
  setcommentText,
  allComment,
  fullName,
  setFullName,
}) {
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
    console.log("comment", comment);
    setReplyText(`@${comment.fullName} `); // Set default reply text
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const handleAddReply = (comment) => {
    if (!replyText.trim()) {
      alert("Please enter a reply.");
      return;
    }

    // Implement logic to add reply to the comment
    // For demonstration, let's assume addComment function supports replies
    // In real implementation, you need to update addComment function accordingly
    // addReplyComment(`Reply to ${comment.id}: ${replyText}`);
    addReplyComment(comment.id,replyText);
    console.log("replyText", replyText);

    // Clear reply text and reset replyingTo state
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2
            className="text-lg lg:text-2xl font-bold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Make Comment
          </h2>
        </div>
        {/* Comment Form  */}
        <form className="mb-6">
          {/* Full Name Input  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
            shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{
              background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            }}
          >
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Enter Full Name"
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
              style={{
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
            />
          </div>

          {/* Text Area  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
          shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 "
            style={{
              background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            }}
          >
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              value={commentText}
              onChange={(e) => setcommentText(e.target.value)}
              id="comment"
              rows={6}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
              style={{
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
              placeholder="Write a comment..."
              required
              defaultValue={""}
            />
          </div>
          {/* Button  */}
          <div className="">
            {isAuth ? (
              <Button
                onClick={addComment}
                style={{
                  background:
                    mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                  color:
                    mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
                }}
              >
                Post comment
              </Button>
            ) : (
              <Button
                onClick={gotoLogin}
                style={{
                  background:
                    mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                  color:
                    mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
                }}
              >
                Post comment
              </Button>
            )}
          </div>
        </form>

        {/* Comments Section */}
        {allComment.map((item) => {
          const { id, fullName, commentText, date } = item;
          return (
            <div key={id} className="mb-6">
              <footer className="flex justify-between items-center mb-">
                <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg">
                  <p
                    className="inline-flex items-center mr-3 text-lg"
                    style={{ color: mode === "dark" ? "black" : "black" }}
                  >
                    {fullName}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: mode === "dark" ? "black" : "black" }}
                  >
                    {date}
                  </p>
                </div>
              </footer>
              <p
                className="text-gray-500 dark:text-gray-400 text-md"
                style={{ color: mode === "dark" ? "white" : "black" }}
              >
                ↳ {commentText}
              </p>
              <div>
                <Button onClick={() => handleReply(item)}>Reply</Button>
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
                    <Button onClick={() => handleAddReply(item)}>Submit</Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Comment;
