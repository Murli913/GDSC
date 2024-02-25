import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router";
import { SlLike, SlDislike } from "react-icons/sl";
import { Link } from "react-router-dom";
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
  where, // Import where clause from firebase
} from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDb } from "../../firebase/FirebaseConfig";
import { useParams } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/FirebaseConfig";

import "./BlogPostCard.css";
import Loader from "../loader/Loader";

function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;

  const params = useParams();

  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    const fetchPublicBlogs = async () => {
      try {
        const q = query(
          collection(fireDb, "blogPost"),
          where("isPublic", "==", true), // Filter only public blogs
          orderBy("date", "desc"),
          orderBy("time", "asc")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const blogs = [];
          querySnapshot.forEach((doc) => {
            blogs.push({ id: doc.id, ...doc.data() });
          });
          setPublicBlogs(blogs);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching public blogs: ", error);
      }
    };

    fetchPublicBlogs();
  }, []); // Empty dependency array ensures the effect runs only once

  const [loading, setLoading] = useState(true); // State to manage loading status

  const publicBlogs = getAllBlog.filter((blog) => blog.isPublic);

  console.log("Public blogs:", publicBlogs);

  const toggleModal = (id) => {
    const selectedBlog = publicBlogs.find((blog) => blog.id === id);
    console.log("modalData:", selectedBlog);
    setModalData(selectedBlog);
    setModal(true);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  function createMarkup(c) {
    return { __html: c };
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          {/* Main Content  */}
          <div className="justify-center -m-4 mb-5">
            {/* Show loading indicator */}
            {publicBlogs.length > 0 ? (
              publicBlogs.map((item, index) => {
                const {
                  thumbnail,
                  id,
                  date,
                  dislikesCount,
                  likesCount,
                  status,
                  category,
                } = item;
                let blog_string = item.blogs.content;
                let blog_string_div = document.createElement("blog_string");
                blog_string_div.innerHTML = blog_string;
                let text =
                  blog_string_div.textContent ||
                  blog_string_div.innerText ||
                  "";
                // console.log("testing items", item);
                return (
                  <div
                    className="p-8 sm:w-1/1 bg-white  rounded-md overflow-hidden"
                    key={index}
                    onClick={() => {
                      window.location.href = `/bloginfo/${id}`;
                    }}
                  >
                    {modal && (
                      <div className="modal">
                        <div
                          onClick={() => setModal(false)}
                          className="overlay"
                        ></div>
                        <div className="modal-content">
                          <h2>Hello Modal</h2>
                          <p>
                            <img
                              onClick={() => navigate(`/bloginfo/${id}`)}
                              className="w-full"
                              src={modalData.thumbnail}
                              alt="blog"
                            />
                            {/* <div className="content">
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
                                  modalData.blogs.content
                                )}
                              ></div>
                            </div> */}
                            {/* {modalData.blogs.content} */}
                            <br></br>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                          <button
                            className="close-modal"
                            onClick={() => setModal(false)}
                          >
                            CLOSE
                          </button>
                        </div>
                      </div>
                    )}
                    <div
                      style={{
                        background:
                          mode === "dark" ? "rgb(30, 41, 59)" : "white",
                        borderBottom:
                          mode === "dark"
                            ? " 4px solid rgb(226, 232, 240)"
                            : " 4px solid rgb(30, 41, 59)",
                      }}
                      className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                          ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
                          rounded-xl overflow-hidden`}
                    >
                      {/* Blog Thumbnail  */}
                      <div className="p-6">
                        {/* Blog Title  */}
                        <h1
                          className="title-font text-2xl font-bold text-gray-900 mb-3"
                          style={{
                            color:
                              mode === "dark"
                                ? "rgb(226, 232, 240)"
                                : " rgb(30, 41, 59)",
                          }}
                        >
                          {item.blogs.title}
                        </h1>
                        {/* Blog Date  */}
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{
                            color:
                              mode === "dark"
                                ? "rgb(226, 232, 240)"
                                : " rgb(30, 41, 59)",
                          }}
                        >
                          {date}
                        </h2>
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{
                            color:
                              mode === "dark"
                                ? "rgb(226, 232, 240)"
                                : " rgb(30, 41, 59)",
                          }}
                        >
                          Category: {category}
                        </h2>

                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{
                            color:
                              mode === "dark"
                                ? "rgb(226, 232, 240)"
                                : " rgb(30, 41, 59)",
                          }}
                        >
                          {text}
                        </h2>
                      </div>
                      <img
                        onClick={() => navigate(`/bloginfo/${id}`)}
                        className="w-full"
                        src={thumbnail}
                        alt="blog"
                      />
                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                        style={{
                          color:
                            mode === "dark"
                              ? "rgb(226, 232, 240)"
                              : " rgb(30, 41, 59)",
                        }}
                      >
                        <div className="flex text-xl justify mb-2">
                          Status : {status ? status : "Registered"}
                        </div>
                        <div className="flex text-xl justify">
                          <SlLike className="text-2xl mr-2 mb-2" />
                          {likesCount > 0 ? likesCount : 0}
                          <SlDislike className="text-2xl ml-4 mr-2 mb-2" />
                          {dislikesCount > 0 ? dislikesCount : 0}
                          <button
                            onClick={() => {
                              window.location.href = `/bloginfo/${id}`;
                            }}
                            className=" hover:bg-gray-600 text-black py-1 px-2 rounded mb-2"
                          >
                            Comment
                          </button>
                        </div>
                      </h2>

                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                        style={{
                          color:
                            mode === "dark"
                              ? "rgb(226, 232, 240)"
                              : " rgb(30, 41, 59)",
                        }}
                      ></h2>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-xl font-bold">Not Found</h1>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostCard;
