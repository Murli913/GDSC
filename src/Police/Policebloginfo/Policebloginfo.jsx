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
  deleteDoc,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import "./Policebloginfo.css";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import PoliceLayout from "../PoliceLayout/PoliceLayout";
import PoliceComment from "../PoliceComment/PoliceComment";

const Policebloginfo = () => {
  const context = useContext(myContext);
  const { mode, loading, setloading } = context;
  const isAuth = localStorage.getItem("isAuth");
  let navigate = useNavigate();

  const params = useParams();
  // console.log(params.id),

  const [getBlogs, setGetBlogs] = useState();
  const [isPublic, setIsPublic] = useState(true); // -------------------check her once ---------------Defaulting to public
  // Function to toggle the status between public and private
  const toggleStatus = async () => {
    try {
      setIsPublic(!isPublic); // Toggle the status
      const postRef = doc(fireDb, "blogPost", params.id);
      await updateDoc(postRef, { isPublic: !isPublic }); // Update Firestore document with new status
      toast.success(`Blog post is now ${!isPublic ? "public" : "private"}`);
    } catch (error) {
      console.error("Error toggling status: ", error);
      toast.error("Failed to toggle status");
    }
  };

  const getAllBlogs = async () => {
    setloading(true);
    try {
      const productTempp = await getDoc(doc(fireDb, "blogPost", params.id));
      if (productTempp.exists()) {
        setGetBlogs(productTempp.data());
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

  const [fullName, setFullName] = useState("");
  const [commentText, setCommentText] = useState("");

  // const addComment = async () => {
  //   const commentReff = collection(
  //     fireDb,
  //     "blogPost/" + `${params.id}/` + "comment"
  //   );
  //   try {
  //     await addDoc(commentReff, {
  //       fullName,
  //       commentText,

  //       time: Timestamp.now(),
  //       date: new Date().toLocaleString("en-US", {
  //         month: "short",
  //         day: "2-digit",
  //         year: "numeric",
  //       }),
  //     });
  //     toast.success("Comment Add Successfully");
  //     setFullName("");
  //     setCommentText("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const addComment =   (text, parentIding) => {
    console.log("-------------------------------?"+text);
    const commentRef = collection(
      fireDb,
      "blogPost/" + `${params.id}/` + "comment"
    );
    try {
       addDoc(commentRef, {
        body: text,
        username: "Police",
        photoURL:  "https://img.freepik.com/free-vector/police-badge-isolated_1284-42802.jpg",
        userId: "100",
        parentId: parentIding ? parentIding : null,
        justParentId: null,
        createdAt: new Date().toISOString(),
      }).then((comment) => {
        setActiveComment(null);
        console.log("Let's see what it returns-->", comment);
      });
      // toast.success("Comment Add Successfully");
      // setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  const [allComment, setAllComment] = useState([]);

  // const getcomment = async () => {
  //   try {
  //     const qq = query(
  //       collection(fireDb, "blogPost/" + `${params.id}/` + "comment/"),
  //       orderBy("time")
  //     );
  //     const data = onSnapshot(qq, (QuerySnapshot) => {
  //       let productsArray = [];
  //       QuerySnapshot.forEach((doc) => {
  //         productsArray.push({ ...doc.data(), id: doc.id });
  //       });
  //       setAllComment(productsArray);
  //       console.log(productsArray);
  //     });
  //     return () => data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getcomment = async () => {
    try {
      const q = query(
        collection(fireDb, "blogPost/" + `${params.id}/` + "comment/"),
        orderBy("createdAt")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ id: doc.id, ...doc.data() });
          console.log("Query snapshot", doc.data());
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
    getcomment();
    window.scrollTo(0, 0);
  }, []);

  const updateStatus = async (status) => {
    try {
      const postRef = doc(fireDb, "blogPost", params.id);
      await updateDoc(postRef, { status });
      toast.success("Status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const statusOptions = ["Pending", "Done", "Request Recieved", "In Progress"]; // Add more options as needed

  // Blog Delete Function
  const deleteBlog = async () => {
    try {
      await deleteDoc(doc(fireDb, "blogPost", params.id));
      toast.success("Blog deleted successfully");
      navigate("/policehome"); // Redirect to the home page
    } catch (error) {
      console.error("Error removing document: ", error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <PoliceLayout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
        <div className=" py-4 lg:py-8">
          {loading ? (
            <Loader />
          ) : (
            <div>
              {/* Thumbnail  */}
              <img
                alt="content"
                className="mb-3 rounded-lg h-full w-full"
                src={getBlogs?.thumbnail}
              />
              {/* title And date  */}
              <div className="flex justify-between items-center mb-3">
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

              {/* Status selection */}
             {/* Status selection */}
<div className="flex items-center space-x-4">
  <p className="text-lg text-blue-500">Status:</p>
  <select
    onChange={(e) => updateStatus(e.target.value)}
    className="border rounded-md px-2 py-1"
  >
    {statusOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>


              {/* delete the post */}
              <div class="button-container">
  <button
    onClick={deleteBlog}
    class="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
  >
    Delete Blog
  </button>

  <div class="flex items-center space-x-4 mt-4">
    <button
      onClick={toggleStatus}
      class={`bg-${isPublic ? "green" : "red"}-500 hover:bg-${
        isPublic ? "green" : "red"
      }-600 text-white py-2 px-4 rounded`}
    >
      {isPublic ? "Make Private" : "Make Public"}
    </button>
  </div>
</div>

            </div>
          )}
        </div>

        <PoliceComment
          addComment={addComment}
          commentText={commentText}
          setcommentText={setCommentText}
          allComment={allComment}
          fullName={fullName}
          setFullName={setFullName}
        />
      </section>
    </PoliceLayout>
  );
};

export default Policebloginfo;
