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
  const userBlogs = getAllBlog.filter(blog => blog.author.id === auth.currentUser.uid);
 
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
              src={auth.currentUser?.photoURL}
              alt="profile"
            />
          </div>
          <div className="right">
            <h1
              className="text-center font-bold text-2xl mb-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Welcome, {auth.currentUser?.displayName}
            </h1>

            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              {auth.currentUser?.email}
            </h2>
          </div>
        </div>
        <hr
          className={`border-2
                 ${mode === "dark" ? "border-gray-300" : "border-gray-400"}`}
        />
      </div>
      {
      console.log("current user details",auth.currentUser)
      }

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
      {/* <div>
        {getAllBlog.length > 0 ? (
          <BlogCards getAllBlog={getAllBlog} auth={auth} />
        ) : (
          <div>
            <h1>Not Found</h1>
          </div>
        )}
      </div> */}



<div className="flex flex-wrap justify-center -m-4 mb-5">
                        {/* Card 1  */}
                        {getAllBlog.length > 0
                            ?
                            <>
                                {getAllBlog.map((item, index) => {
                                    const { thumbnail, id, date,author } = item;
                                    console.log(item)
                                    if(author.id == auth.currentUser.uid){
                                    return (
                                        <div className="p-4 md:w-1/3" key={index}>
                                            <div
                                                style={{
                                                    background: mode === 'dark'
                                                        ? 'rgb(30, 41, 59)'
                                                        : 'white',
                                                    borderBottom: mode === 'dark'
                                                        ?
                                                        ' 4px solid rgb(226, 232, 240)'
                                                        : ' 4px solid rgb(30, 41, 59)'
                                                }}
                                                className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                                                ${mode === 'dark'
                                                    ? 'shadow-gray-700'
                                                    : 'shadow-xl'
                                                    } 
                                                rounded-xl overflow-hidden`} 
                                            >
                                                {/* Blog Thumbnail  */}
                                                <img onClick={() => navigate(`/bloginfo/${id}`)} className=" w-full" src={thumbnail} alt="blog" />

                                                {/* Top Items  */}
                                                <div className="p-6">
                                                    {/* Blog Date  */}
                                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{
                                                        color: mode === 'dark'
                                                            ? 'rgb(226, 232, 240)'
                                                            : ' rgb(30, 41, 59)'
                                                    }}>
                                                        {date}
                                                    </h2>

                                                    {/* Blog Title  */}
                                                    <h1 className="title-font text-lg font-bold text-gray-900 mb-3" style={{
                                                        color: mode === 'dark'
                                                            ? 'rgb(226, 232, 240)'
                                                            : ' rgb(30, 41, 59)'
                                                    }}>
                                                        {item.blogs.title}
                                                    </h1>

                                                    {/* Blog Description  */}
                                                    <p className="leading-relaxed mb-3" style={{
                                                        color: mode === 'dark'
                                                            ? 'rgb(226, 232, 240)'
                                                            : ' rgb(30, 41, 59)'
                                                    }}>
                                            
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                                  }
                                                 
                                })}
                            </>
                            :
                            <>
                                <h1 className='text-xl font-bold'>Not Found</h1>
                            </>
                        }
                    </div>
































































    </Layout>
  );
}

export default Dashboard;
