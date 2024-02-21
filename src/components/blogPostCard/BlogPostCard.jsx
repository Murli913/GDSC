import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router";
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

function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;

  const params = useParams();

  const navigate = useNavigate();

  const [publicBlogs, setPublicBlogs] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    const fetchPublicBlogs = async () => {
      try {
        const q = query(
          collection(fireDb, "blogPost"),
          where("isPublic", "==", true), // Filter only public blogs
          orderBy("date", "desc")
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

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          {/* Main Content  */}
          <div className="justify-center -m-4 mb-5">
            {/* Card 1  */}
            {publicBlogs.length > 0 ? (
              publicBlogs.map((item, index) => {
                const { thumbnail, id, date } = item;
                let blog_string = item.blogs.content;
                let blog_string_div = document.createElement("blog_string");
                blog_string_div.innerHTML = blog_string;
                let text =
                  blog_string_div.textContent ||
                  blog_string_div.innerText ||
                  "";

                return (
                  <div
                    className="p-8 sm:w-1/1 bg-white shadow-md rounded-md overflow-hidden"
                    key={index}
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
                            {modalData.blogs.content}
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
                          className="tracking-widest text-md title-font font-medium text-gray-400 mb-1"
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
                    </div>
                    <button
                      onClick={() => navigate(`/bloginfo/${id}`)}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded mr-4 mt-2"
                    >
                      Comment
                    </button>
                    <button
                      onClick={() => toggleModal(id)}
                      className="btn-modal"
                    >
                      Open
                    </button>
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
