import React from "react";
import "./Comment.css";
import Comment from "./Comment";
import CommentForm from "./Comment";
import { addComment } from "../../pages/blogInfo/BlogInfo";

function Comments({ currentUserId, allComment }) {
  const rootComments = allComment.filter(
    (allComment) => allComment.parentId === null
  );

  const getReplies = (commentId) => {
    return allComment.filter((allComment) => allComment.parentId === commentId);
  };

  // .sort(
  //   (a, b) =>
  //     new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  // );

  // console.log("Dekho createdAt=====>" + rootComments.id);
  allComment.map((item) => {
    const { id, body, username, userId, parentId, justParentId, createdAt } =
      item;
    console.log(item.id);
  });

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      {/* <CommentForm submitLabel="Write" handleSubmit={addComment} /> */}

      <div className="comment-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;
