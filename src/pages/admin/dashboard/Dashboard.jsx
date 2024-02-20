import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import myContext from "../../../context/data/myContext";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../../firebase/FirebaseConfig";
import BlogCards from "./BlogCards";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, getAllBlog, deleteBlogs } = context;
  const navigate = useNavigate();

  console.log("Hello Duniya!!", getAllBlog);

  const logout = () => {
    localStorage.clear("admin");
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="py-10">
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="left">
            <img
              className=" w-40 h-40  object-cover rounded-full border-2 border-pink-600 p-1"
              src={auth.currentUser.photoURL}
              alt="profile"
            />
          </div>
          <div className="right">
            <h1
              className="text-center font-bold text-2xl mb-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Welcome, {auth.currentUser.displayName}
            </h1>

            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              {auth.currentUser.email}
            </h2>
          </div>
        </div>
        <hr
          className={`border-2
                 ${mode === "dark" ? "border-gray-300" : "border-gray-400"}`}
        />
      </div>
      {/* <div>
        {getAllBlog.length > 0 ? (
          <div>
            {getAllBlog.map((item, index) => {
              const { thumbnail, date, id, author } = item;
              if (author.id == auth.currentUser.uid) {
                console.log("Author", author);
                <div></div>
              }
            })}
          </div>
        ) : (
          <div>
            <h1>Not Found</h1>
          </div>
        )}
      </div> */}
      <div>
        {getAllBlog.length > 0 ? (
          <BlogCards getAllBlog={getAllBlog} auth={auth} />
        ) : (
          <div>
            <h1>Not Found</h1>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
