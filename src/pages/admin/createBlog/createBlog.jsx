import React, { useState, useContext, useEffect,useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import myContext from "../../../context/data/myContext";
import { Link, useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";
import { auth } from "../../../firebase/FirebaseConfig";
import "./createBlog.css";
import { Button, Typography } from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireDb, storage } from "../../../firebase/FirebaseConfig";
import "../../../components/navbar/Navbar";
import Nav from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import Layout from "../../../components/layout/Layout";

import emailjs from '@emailjs/browser';

const categories = [
  "Child abuse",
  "Human Trafficking",
  "Sexual harassment",
  "Women sexual assault",
  "Child migration",
];

function CreateBlog() {
  const context = useContext(myContext);
  const { mode } = context;
 
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState({
    title: "",
    
    content: "",
    time: Timestamp.now(),
  });

  const [error, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorContent, setErrorContent] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);

 
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const addPost = async () => {
   
    if (blogs.content === "") {
      setErrorContent(true);
    } else {
      setErrorContent(false);
    }
    if (blogs.title === "") {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }
    if (selectedCategory === "") {
      setErrorCategory(false);
    } else {
      uploadImage();
      navigate("/");
    }
  };
  const uploadImage = () => {
    if (!thumbnail) return;
    const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
    uploadBytes(imageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const productRef = collection(fireDb, "blogPost");
        try {
          addDoc(productRef, {
            blogs,
            location,
           
            author: {
              name: auth.currentUser.displayName,
              id: auth.currentUser.uid,
            },
            thumbnail: url,
            category: selectedCategory,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          });
          navigate("/");
          toast.success("Complaint Added Successfully");
        } catch (error) {
          toast.error(error);
          console.log(error);
        }
      });
    });
  };

 
  const [thumbnail, setthumbnail] = useState();

  const [text, settext] = useState("");
  console.log("Value: ");
  console.log("text: ", text);

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  //start location
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
    console.log(location);
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  //end location

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });
  const stopRecordingg = async () => {
    const blob = await stopRecording(); // Assuming stopRecording returns the recorded blob
    const storageRef = ref(storage, "videos/" + Date.now() + ".webm"); // Change the path as needed
    await uploadBytes(storageRef, blob);
  };
  const form = useRef();
  function sendEmail(e) {
    e.preventDefault();

emailjs.sendForm('service_v1gm6rs', 'template_viu5l96', e.target, 'uYtd_6Wk0tLOhJPR8')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    e.target.reset()
}

  return (
    <Layout>
      <div className=" container mx-auto max-w-5xl py-6">
        <div
          className="p-5"
          style={{
            background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            borderBottom:
              mode === "dark"
                ? " 4px solid rgb(226, 232, 240)"
                : " 4px solid rgb(30, 41, 59)",
          }}
        >
          {/* Top Item  */}
          <div className="mb-2 flex justify-between">
            <div className="flex gap-2 items-center">
              {/* Dashboard Link  */}
              {/* <Link to={'/dashboard'}>
                            <BsFillArrowLeftCircleFill size={25} />
                        </Link> */}

              {/* Text  */}
              <Typography
                variant="h4"
                style={{
                  color: mode === "dark" ? "white" : "black",
                }}
              >
                Lodge Complaint
              </Typography>
            </div>
          </div>

          {/* main Content  */}
          <div className="mb-3">
            {/* Thumbnail  */}
            {thumbnail && (
              <img
                className=" w-full rounded-md mb-3 "
                src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                alt="thumbnail"
              />
            )}

            {/* Text  */}
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-semibold"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Upload Evidence
            </Typography>

            {/* First Thumbnail Input  */}
            <input
              type="file"
              label="Upload thumbnail"
              className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
              style={{
                background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
              }}
              onChange={(e) => setthumbnail(e.target.files[0])}
            />
          </div>

          {/* Second Title Input */}
          <div className="mb-3">
            <input
              label="Enter your Title"
              className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${
                   mode === "dark" ? "placeholder-black" : "placeholder-black"
                 }`}
              placeholder="Enter Your Title"
              style={{
                background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
              }}
              name="title"
              onChange={(e) =>
                setBlogs({
                  ...blogs,
                  title: e.target.value,
                })
              }
              value={blogs.title}
            />
            {errorTitle && <p style={{ color: "red" }}>mandatory field.</p>}
          </div>

          {/* Third Category Input  */}
          <div className="mb-3">
            <div className="inputGp">
              <label>
                {" "}
                <b>Complaint Type</b>
              </label>
              
              {/* Category Dropdown */}
            <div className="mb-3">
              <select
                className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                "
                style={{
                  background:
                    mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
                }}
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errorCategory && (
                <p style={{ color: "red" }}>Please select a category.</p>
              )}
            </div>
            </div>
          </div>
          {/* Third Title Input */}
          <div className="mb-3">
            <input
              label="Enter your Category"
              className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${
                   mode === "dark" ? "placeholder-black" : "placeholder-black"
                 }`}
              placeholder="Enter any other"
              style={{
                background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
              }}
              name="title"
              onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
              value={blogs.category}
            />
          </div>

          {/*fourth title*/}
          <div className="mb-3">
            <div className="inputGp">
              <p>Status: {status}</p>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-4"
                onClick={startRecording}
              >
                Start Recording
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded "
                onClick={stopRecording}
              >
                Stop Recording
              </button>{" "}
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded "
                onClick={stopRecordingg}
              >
                Upload Video
              </button>{" "}
              <br></br>
              <br></br>
              <video src={mediaBlobUrl} controls loop />
            </div>
          </div>

          {/* Four Editor  */}
          <Editor
            apiKey="r5xdhc208mmf6vcsxoeqj2x4bzx4x76uibzzka5bf10cmttb"
            onEditorChange={(newValue, editor) => {
              setBlogs({ ...blogs, content: newValue });
              settext(editor.getContent({ format: "text" }));
            }}
            onInit={(evt, editor) => {
              settext(editor.getContent({ format: "text" }));
            }}
            init={{
              plugins:
                "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template  tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
            }}
          />
          {errorContent && <p style={{ color: "red" }}>mandatory field.</p>}
          {/* Five Terms and Conditions */}
          <div className="mt-5 flex justify-left">
            <p>Hello world</p>
          </div>
          <div className="flex justify-left items-center">
            <input
              type="checkbox"
              id="acceptCheckbox"
              className="form-check-input"
              // checked={isChecked}
              // onChange={handleCheckboxChange}
            />
            <label htmlFor="acceptCheckbox" className="ml-2">
              I Accept
            </label>
          </div>
          {error && <p style={{ color: "red" }}>Please accept the terms.</p>}

          {/* Six Submit Button  */}
          <div className="flex justify-center items-center mt-5">
            <Button
              className="mt-5 mx-auto"
              onClick={addPost}
              style={{
                background:
                  mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                color:
                  mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
              }}
            >
              Submit
            </Button>
            <form onSubmit={sendEmail}>
                   
            <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Send Notification to Police"/>

                      
                </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateBlog;