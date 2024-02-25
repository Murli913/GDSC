import React, { useState, useContext, useEffect, useRef } from "react";
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

import emailjs from "@emailjs/browser";

const categories = [
  "Child abuse",
  "Human Trafficking",
  "Sexual harassment",
  "Women sexual assault",
  "Child migration",
  " Child Pornography / Child Sexual Abuse Matter",
  "Rape/Gang Rape",
  "Publishing or Transmitting of Sexually Obcene material in electronic form",
  "Financial Fraud",
  "Hacking and Unauthorized Access",
  "Physical Assault and Violence",
  "Kidnapping and Missing Persons",
  "Domestic Violence",
  "Human Trafficking",
  "Public Nuisance and Disorderly Conduct",
  "Drug Trafficking and Substance Abuse",
  "Environmental Crimes",
  "Workplace Harassment",
  "Discrimination and Hate Crimes",
  "Public Health Violations",
  "Animal Cruelty",
  "Public Corruption and Bribery",
  "Traffic Violations and Road Safety",
  "Other",
];

function CreateBlog() {
  const context = useContext(myContext);
  const { mode } = context;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [otherSelected, setotherSelected] = useState(false);

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState({
    title: "",
    content: "",
    time: Timestamp.now(),
  });

  const [isChecked, setIsChecked] = useState(false);
  const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);
  const [disclaimerError, setIsDisclaimerError] = useState(false);
  const [error, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorContent, setErrorContent] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [addPostSuccess, setAddPostSuccess] = useState(false);

  const handleTermsAndCondCheckbox = () => {
    setIsChecked(!isChecked);
    setError(false); // Reset error message when user interacts with checkbox
  };
  const handleDisclaimerCheckbox = () => {
    setIsDisclaimerChecked(!isDisclaimerChecked);
    setIsDisclaimerError(false); // Reset error message when user interacts with checkbox
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log("handleCategoryChange--->", e.target.value);
    if (e.target.value === "Other") {
      setotherSelected(true);
    } else {
      setotherSelected(false);
    }
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
      setErrorCategory(true);
    }
    if (!isChecked) {
      setError(true);
    } else {
      setError(false);
    }
    if (!isDisclaimerChecked) {
      setIsDisclaimerError(true);
    } else {
      uploadImage();
      // navigate("/");
    }
  };
  const uploadImage = async () => {
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
          // navigate("/");
          setAddPostSuccess(true);
          console.log("addPostSuccess----> addPost " + addPostSuccess);
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
    addPost();
    setAddPostSuccess(true);
    console.log("addPostSuccess------->", addPostSuccess);
    {
      addPostSuccess
        ? emailjs
            .sendForm(
              "service_v1gm6rs",
              "template_viu5l96",
              e.target,
              "uYtd_6Wk0tLOhJPR8"
            )
            .then(
              (result) => {
                console.log("notif send----------> " + result.text);
                toast.success("Complaint sent successfully");
                setAddPostSuccess(false);
              },
              (error) => {
                console.log(error.text);
              }
            )
        : toast.error("Notification not sent");
    }
    navigate("/");
    e.target.reset();
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
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-semibold"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Enter Title
            </Typography>
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
            {errorTitle && <p style={{ color: "red" }}>*required.</p>}
          </div>

          {/* Third Category Input  */}
          <div className="mb-3">
            <div className="inputGp">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
                style={{ color: mode === "dark" ? "white" : "black" }}
              >
                Complaint Type
              </Typography>

              {/* Category Dropdown */}
              <div className="mb-3">
                <select
                  className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5"
                  style={{
                    background:
                      mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
                  }}
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
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
          {otherSelected && (
            <div className="mb-3">
              <input
                label="Enter your Category"
                className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${
                   mode === "dark" ? "placeholder-black" : "placeholder-black"
                 }`}
                placeholder="Enter other Category"
                style={{
                  background:
                    mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
                }}
                name="title"
                onChange={(e) =>
                  setBlogs({ ...blogs, category: e.target.value })
                }
                value={blogs.category}
              />
            </div>
          )}
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
              <br></br>
              <br></br>
              <video src={mediaBlobUrl} controls loop />
              <br></br>
              <button
                className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded "
                onClick={stopRecordingg}
              >
                Upload Video
              </button>
            </div>
          </div>

          {/* Four Editor  */}
          {/* <textarea
            className="comment-form-textarea"
            value={text}
            placeholder="Add a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <textarea

            onChange={(e) => settext(e.target.value)}
          /> */}
          <div className="mb-3">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-semibold"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Enter Description
            </Typography>
            <textarea
              label="Enter Description "
              className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
               outline-none ${
                 mode === "dark" ? "placeholder-black" : "placeholder-black"
               }`}
              placeholder="Enter Description"
              style={{
                background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
                height: "150px", // Adjust the height as needed
              }}
              name="description"
              onChange={(e) =>
                setBlogs({
                  ...blogs,
                  content: e.target.value,
                })
              }
              value={blogs.content}
            />
            {errorContent && <p style={{ color: "red" }}>*required.</p>}
          </div>

          {/* <Editor
            apiKey="vyg44vlnhit4cui1seeytfin0u2lth6kw9j452lw0os9ljm3"
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
          /> */}
          {/* {errorContent && <p style={{ color: "red" }}>*required.</p>} */}
          {/* Five Terms and Conditions */}
          <div className="mt-5 flex justify-left"></div>
          <div className="flex justify-left items-center">
            <input
              type="checkbox"
              id="acceptCheckbox"
              className="form-check-input"
              checked={isChecked}
              onChange={handleTermsAndCondCheckbox}
            />
            <label htmlFor="acceptCheckbox" className="ml-2 mt-3">
              <b>Terms and Conditions:</b> Information must be true, accurate,
              and complete. Providing false details may lead to legal action.
            </label>
          </div>
          {error && (
            <p style={{ color: "red" }}>
              Please accept the Terms and Conditions.
            </p>
          )}
          <div className="mt-5 flex justify-left"></div>
          <div className="flex justify-left items-center">
            <input
              type="checkbox"
              id="acceptCheckbox"
              className="form-check-input"
              checked={isDisclaimerChecked}
              onChange={handleDisclaimerCheckbox}
            />
            <label htmlFor="acceptCheckbox" className="ml-2 mb-1">
              <b>Disclaimer:</b> Once submitted, the information provided cannot
              be edited. Please review your submission carefully.
            </label>
          </div>
          {disclaimerError && (
            <p style={{ color: "red" }}>Please accept the Disclaimer.</p>
          )}

          {/* Six Submit Button  */}
          <div className="flex justify-center items-center mt-5">
            <form onSubmit={sendEmail}>
              <input
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                value="Submit and Send Notification to Authority"
              />
            </form>
            {/* <Button
              className="mt-5 ml-auto"
              onClick={addPost}
              style={{
                background:
                  mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                color:
                  mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
              }}
            >
              Submit
            </Button> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateBlog;
