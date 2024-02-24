import { signOut } from "firebase/auth";

import { auth } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

import PoliceLayout from "../PoliceLayout/PoliceLayout";

import { Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';

import { Link } from 'react-router-dom';
import { Timestamp, addDoc, collection, doc, getDoc, setDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { fireDb } from "../../firebase/FirebaseConfig";
import { useParams } from 'react-router';
import HeroSection from "../../components/heroSection/HeroSection";



const PoliceHome = () => {
  const history = useNavigate()

    const handleClick = () =>{
        signOut(auth).then(val=>{
            console.log(val,"val")
            history('/policelogin')
        })
    }


    const context = useContext(myContext);
    const { mode, getAllBlog } = context;
  
    
    const params = useParams();
  
    const navigate = useNavigate();
  
  
  
  
  const openPopup = (url) => {
    window.open(url, "_blank", "width=600,height=400,resizable=yes,scrollbars=yes");
  };

  return (
  <PoliceLayout>
  <HeroSection/>
    <div>
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">

          {/* Main Content  */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            
  {/* Card 1  */}
  {
  getAllBlog.length > 0? (
    getAllBlog.map((item, index) => {
      const { thumbnail, id, date } = item;
      let blog_string = item.blogs.content;
      let blog_string_div = document.createElement("blog_string");
      blog_string_div.innerHTML = blog_string;
      let text = blog_string_div.textContent || blog_string_div.innerText || "";


      return (
       
        <div className="p-8 sm:w-1/1" key={index}>
        
          <div
            style={{
              background:
                mode === 'dark' ? 'rgb(30, 41, 59)' : 'white',
              borderBottom:
                mode === 'dark'
                  ? ' 4px solid rgb(226, 232, 240)'
                  : ' 4px solid rgb(30, 41, 59)',
            }}
            className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                        ${mode === 'dark'
                          ? 'shadow-gray-700'
                          : 'shadow-xl'
                        } 
                        rounded-xl overflow-hidden`}
          >
            {/* Blog Thumbnail  */}
            <div className="p-6">

              {/* Blog Title  */}
              <h1
                className="title-font text-lg font-bold text-gray-900 mb-3"
                style={{
                  color:
                    mode === 'dark'
                      ? 'rgb(226, 232, 240)'
                      : ' rgb(30, 41, 59)',
                    }}
              >
                {item.blogs.title}
              </h1>
                    {/* Blog Date  */}
                    <h2
                      className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                      style={{
                        color:
                          mode === 'dark'
                            ? 'rgb(226, 232, 240)'
                            : ' rgb(30, 41, 59)',
                      }}
                    >
                      {date}
                    </h2>

       
                  <h2
                      className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                      style={{
                        color:
                          mode === 'dark'
                            ? 'rgb(226, 232, 240)'
                            : ' rgb(30, 41, 59)',
                      }}
                    >
                        {text}
                      
                    </h2>
                    
                    
             
            </div>
            <img
              onClick={() => navigate(`/policebloginfo/${id}`)}
              className="w-full"
              src={thumbnail}
              alt="blog"
            />

            {/* Top Items  */}
            
     
     
              

          
            <button onClick={() => { window.location.href = `/bloginfo/${id}`; }} className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded mr-4 mt-2'>Comment</button>

              

          </div>
        
        </div>
    
      );
    })
  ) : (
    <h1 className='text-xl font-bold'>Not Found</h1>
  )}
</div>

{/* See More Button 
{getAllBlog.length > 6 && (
  <div className="flex justify-center my-5">
    <Link to={'/allblogs'}>
      <Button
        style={{
          background:
            mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
          color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)',
        }}
      >
        See More
      </Button>
    </Link>
  </div>
)} */}

        </div>
      </section >
    </div >
    
    </div>
    </PoliceLayout>
  )
}

export default PoliceHome