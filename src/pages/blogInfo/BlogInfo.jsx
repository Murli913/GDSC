import React, { Fragment, useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";
import Comments from "../../components/Commenting/Comments";
import toast from "react-hot-toast";
import "./bloginfo.css";
import { useNavigate } from "react-router-dom";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/FirebaseConfig";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { SlLike, SlDislike } from "react-icons/sl";

async function addComment() {
  const commentRef = collection(
    fireDb,
    "blogPost/" + `${params.id}/` + "comment"
  );
  try {
    await addDoc(commentRef, {
      body,
      username,
      userId,
      parentId,
      justParentId,
      createdAt: Timestamp.now(),
    });
    toast.success("Comment Add Successfully");
    setCommentText("");
  } catch (error) {
    console.log(error);
  }
}

function BlogInfo() {
  // console.log("Dekho uid--->" + auth.currentUser.displayName);
  const context = useContext(myContext);
  const { mode, loading, setloading } = context;
  const isAuth = localStorage.getItem("isAuth");
  let navigate = useNavigate();

  const [activeBtn, setActiveBtn] = useState("none");
  const gotoLogin = () => {
    navigate("/adminlogin");
  };

  const params = useParams();
  // console.log(params.id),

  const [getBlogs, setGetBlogs] = useState();
  const [likesCnt, setLikesCnt] = useState(0);
  const [disLikesCnt, setdisLikesCnt] = useState(0);

  const addLikes = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("User is not authenticated.");
        return;
      }
      const userId = currentUser.uid;

      const likesRef = doc(fireDb, "blogPost", params.id);
      const docSnap = await getDoc(likesRef);
      if (docSnap.exists()) {
        const blogPostData = docSnap.data();
        const likedByUserRef = doc(fireDb, "likes", `${params.id}_${userId}`);
       const likeDocSnap = await getDoc(likedByUserRef);
        if (likeDocSnap.exists()) {
          console.log("User has already liked this post.");
          toast.success("User has already liked this post.");
          return;
        }

        const updatedLikesCnt = blogPostData.likesCount + 1;
        await updateDoc(likesRef, { likesCount: updatedLikesCnt });
        setLikesCnt(updatedLikesCnt);

        //await setDoc(likedByUserRef, { liked: true });
        toast.success("Likes Updated Successfully");
      } else {
        await setDoc(likesRef, { likesCount: 1 });
        setLikesCnt(1);

        const likedByUserRef = doc(fireDb, "likes", `${params.id}_${userId}`);
        await setDoc(likedByUserRef, { liked: true });

        toast.success("Likes Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating like count: ", error);
    }
  };

  const addDislikes = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("User is not authenticated.");
        return;
      }
      const userId = currentUser.uid;

      const dislikesRef = doc(fireDb, "blogPost", params.id);
      const docSnap = await getDoc(dislikesRef);
      if (docSnap.exists()) {
        const blogPostData = docSnap.data();
        const dislikedByUserRef = doc(
          fireDb,
          "dislikes",
          `${params.id}_${userId}`
        );
       const dislikeDocSnap = await getDoc(dislikedByUserRef);
        if (dislikeDocSnap.exists()) {
          console.log("User has already disliked this post.");
          toast.success("User has already disliked this post.");
          return;
        }

        const updatedDislikesCnt = blogPostData.dislikesCount + 1;
        await updateDoc(dislikesRef, { dislikesCount: updatedDislikesCnt });
        setdisLikesCnt(updatedDislikesCnt);

        await setDoc(dislikedByUserRef, { disliked: true });
        toast.success("Dislikes Updated Successfully");
      } else {
        await setDoc(dislikesRef, { dislikesCount: 1 });
        setdisLikesCnt(1);

        const dislikedByUserRef = doc(
          fireDb,
          "dislikes",
          `${params.id}_${userId}`
        );
        await setDoc(dislikedByUserRef, { disliked: true });

        toast.success("Dislikes Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating dislike count: ", error);
    }
  };

  const getAllBlogs = async () => {
    setloading(true);
    try {
      const blogPostRef = doc(fireDb, "blogPost", params.id);
      const blogPostSnap = await getDoc(blogPostRef);
      if (blogPostSnap.exists()) {
        const blogData = blogPostSnap.data();
        setGetBlogs(blogData);

        // Check if likesCount exists, if not set it to 0
        if (!blogData.likesCount) {
          await updateDoc(blogPostRef, { likesCount: 0 });
          setLikesCnt(0);
        } else {
          setLikesCnt(blogData.likesCount);
        }

        // Check if dislikesCount exists, if not set it to 0
        if (!blogData.dislikesCount) {
          await updateDoc(blogPostRef, { dislikesCount: 0 });
          setdisLikesCnt(0);
        } else {
          setdisLikesCnt(blogData.dislikesCount);
        }
      } else {
        console.log("Document does not exist");
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  //* Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  // const [fullName, setFullName] = useState("");
  // const [commentText, setCommentText] = useState("");
  // const [replies, setReplies] = useState(null);
  const [currentUserId, setcurrentUserId] = useState("");

  // const addComment = async (body, username, userId, parentId, justParentId) ----test addComment() ----
  // const addComment = async () => {
  //   const commentRef = collection(
  //     fireDb,
  //     "blogPost/" + `${params.id}/` + "comment"
  //   );
  //   try {
  //     await addDoc(commentRef, {
  //       body,
  //       username,
  //       userId,
  //       parentId,
  //       justParentId,
  //       createdAt: Timestamp.now(),
  //     });
  //     toast.success("Comment Add Successfully");
  //     setCommentText("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const addComment = async () => {
  //   const commentRef = collection(
  //     fireDb,
  //     "blogPost/" + `${params.id}/` + "comment"
  //   );
  //   try {
  //     await addDoc(commentRef, {
  //       fullName,
  //       commentText,
  //       replies,
  //       time: Timestamp.now(),
  //       date: new Date().toLocaleString("en-US", {
  //         month: "short",
  //         day: "2-digit",
  //         year: "numeric",
  //       }),
  //     });
  //     toast.success("Comment Add Successfully");
  //     setCommentText("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const addReplyComment = async (originalCommentId, replyText) => {
  //   const commentRef = collection(
  //     fireDb,
  //     "blogPost/" + `${params.id}/` + "comment"
  //   );

  //   try {
  //     await addDoc(commentRef, {
  //       fullName,
  //       commentText: replyText,
  //       time: Timestamp.now(),
  //       date: new Date().toLocaleString("en-US", {
  //         month: "short",
  //         day: "2-digit",
  //         year: "numeric",
  //       }),
  //       originalCommentId: originalCommentId, // Include the ID of the original comment
  //     });
  //     toast.success("Reply Added Successfully");
  //     setFullName("");
  //     setCommentText("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [allComment, setAllComment] = useState([]);

  const getcomment = async () => {
    try {
      const q = query(
        collection(fireDb, "blogPost/" + `${params.id}/` + "comment/"),
        orderBy("createdAt")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(productsArray);
        console.log("Dekho allcomments" + productsArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // addComment(
    //   "testReply",
    //   "testReplyUser",
    //   2,
    //   "uh1sVm5Ghy5hwiFvn4nC",
    //   "uh1sVm5Ghy5hwiFvn4nC"
    // );
    getcomment();
    setcurrentUserId(auth.currentUser?.uid ? auth.currentUser?.uid : "");

    window.scrollTo(0, 0);
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log("result user", user);
      const userDetails = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userid: user.uid,
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        // Add any other user details you want to store
      };
  
      // Save user details to Firestore under 'users' collection
      const userRef = doc(fireDb, "users", user.uid);
      setDoc(userRef, userDetails)
        .then(() => {
          localStorage.setItem("current user uid", user.uid);
          localStorage.setItem("isAuth", true);
          toast.success('Login success');
          navigate("/");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          toast.error('Error occurred during login');
        });
    });
  };

  const [replyTo, setReplyTo] = useState(null); // State to track which comment to reply to
  const [replyText, setReplyText] = useState(""); // State to hold the reply text

  // Your existing functions here...

  const handleReply = (commentId) => {
    setReplyTo(commentId);
  };

  const addReply = async (commentId, replyText) => {
    const commentRef = doc(fireDb, "blogPost", params.id, "comment", commentId);
    try {
      await addDoc(collection(commentRef, "replies"), {
        fullName: fullName,
        replyText: replyText,
        time: Timestamp.now(),
      });
      toast.success("Reply added successfully");
    } catch (error) {
      console.error("Error adding reply: ", error);
      toast.error("Failed to add reply");
    }
  };
  
   // Fetch replies for a comment
   const getRepliesForComment = async (commentId) => {
    try {
      const repliesRef = collection(fireDb, "blogPost", params.id, "comment", commentId, "replies");
      const repliesSnapshot = await getDocs(repliesRef);
      const repliesData = repliesSnapshot.docs.map((doc) => doc.data());
      return repliesData;
    } catch (error) {
      console.error("Error getting replies: ", error);
      return [];
    }
  };


  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div>
              {/* title And date  */}
              <div className="flex justify-between items-center mb-3 mt-5">
                <h1
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className=" text-xl md:text-2xl lg:text-2xl font-semibold"
                >
                  {getBlogs?.blogs?.title}
                </h1>
                <p style={{ color: mode === "dark" ? "white" : "black" }}>
                  {getBlogs?.date}
                </p>
              </div>
              <div
                className={`border-b mb-5 ${
                  mode === "dark" ? "border-gray-600" : "border-gray-400"
                }`}
              />

              {/* Thumbnail  */}
              <img
                alt="content"
                className="mb-3 rounded-lg h-full w-full"
                src={getBlogs?.thumbnail}
              />
              {/* blog Content  */}
              <div className="content">
                <div
                  className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                    ${
                      mode === "dark"
                        ? "[&>h1]:text-[#ff4d4d]"
                        : "[&>h1]:text-black"
                    }

                    [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                    ${
                      mode === "dark"
                        ? "[&>h2]:text-white"
                        : "[&>h2]:text-black"
                    }

                    [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
                    ${
                      mode === "dark"
                        ? "[&>h3]:text-white"
                        : "[&>h3]:text-black"
                    }

                    [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                    ${
                      mode === "dark"
                        ? "[&>h4]:text-white"
                        : "[&>h4]:text-black"
                    }

                    [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                    ${
                      mode === "dark"
                        ? "[&>h5]:text-white"
                        : "[&>h5]:text-black"
                    }

                    [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                    ${
                      mode === "dark"
                        ? "[&>h6]:text-white"
                        : "[&>h6]:text-black"
                    }

                    [&>p]:text-[16px] [&>p]:mb-1.5
                    ${
                      mode === "dark"
                        ? "[&>p]:text-[#7efff5]"
                        : "[&>p]:text-black"
                    }

                    [&>ul]:list-disc [&>ul]:mb-2
                    ${
                      mode === "dark"
                        ? "[&>ul]:text-white"
                        : "[&>ul]:text-black"
                    }

                    [&>ol]:list-decimal [&>li]:mb-10
                    ${
                      mode === "dark"
                        ? "[&>ol]:text-white"
                        : "[&>ol]:text-black"
                    }

                    [&>li]:list-decimal [&>ol]:mb-2
                    ${
                      mode === "dark"
                        ? "[&>ol]:text-white"
                        : "[&>ol]:text-black"
                    }

                    [&>img]:rounded-lg
                    `}
                  dangerouslySetInnerHTML={createMarkup(
                    getBlogs?.blogs?.content
                  )}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="btn-cont">
          {isAuth ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <SlLike
                onClick={addLikes}
                style={{
                  fontSize: "24px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {likesCnt}
              </span>
            </div>
          ) : (
            // <button onClick={addLikes}>Like ({likesCnt})</button>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SlLike
                onClick={signInWithGoogle}
                style={{
                  fontSize: "24px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {likesCnt}
              </span>
            </div>
          )}
          {isAuth ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <SlDislike
                onClick={addDislikes}
                style={{
                  fontSize: "24px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {disLikesCnt}
              </span>
              {/* <button onClick={addDislikes}>Dislike ({disLikesCnt})</button> */}
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <SlDislike
                onClick={signInWithGoogle}
                style={{
                  fontSize: "24px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {disLikesCnt}
              </span>
              {/* <button onClick={addDislikes}>Dislike ({disLikesCnt})</button> */}
            </div>
          )}

          <div className="status">
            <h1>Status: {getBlogs?.status}</h1>
          </div>
        </div>
        {/* <Comment
          addComment={addComment}
          commentText={commentText}
          setcommentText={setCommentText}
          allComment={allComment}
          fullName={fullName}
          setFullName={setFullName}
          replies={replies}
          setReplies={setReplies}
        /> */}

        <Comments currentUserId={currentUserId} allComment={allComment} />
      </section>
    </Layout>
  );
}

export default BlogInfo;
export { addComment };
