import React, { useState, useContext, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import myContext from '../../../context/data/myContext';
import { Link, useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";
import {  auth } from "../../../firebase/FirebaseConfig";
import "./createBlog.css";
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fireDb, storage } from '../../../firebase/FirebaseConfig';
import "../../../components/navbar/Navbar"
import Nav from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import Layout from '../../../components/layout/Layout';
const userData = [
    { name: "Child abuse" },
    { name: "Human Traffing" },
    { name: "Sexual harassment" },
    { name: "Women sexual assault" },
    { name: "Child migration" }
  ];
  


function CreateBlog() {
    const context = useContext(myContext);
    const { mode } = context;
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState({
        title: '',
        category: '',
        content: '',
        time: Timestamp.now()
    });
    const addPost = async () => {
        // if (blogs.title === "" || blogs.category === "" || blogs.content === "" || blogs.thumbnail === "") {
        //     toast.error('Please Fill All Fields');
        // }
        // console.log(blogs.content)
        uploadImage()
        navigate("/");
}
const uploadImage = () => {
    if (!thumbnail) return;
    const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
    uploadBytes(imageRef, thumbnail).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            const productRef = collection(fireDb, "blogPost")
            try {
                 addDoc(productRef, {
                    blogs,
                    location,
                    users,
                    author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
                    thumbnail: url,
                    time: Timestamp.now(),
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    )
                })
                navigate('/')
                toast.success('Complaint Added Successfully');


            } catch (error) {
                toast.error(error)
                console.log(error)
            }
        });
    });
}

// checkbox start
useEffect(() => {
    setUsers(userData);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };
//end checkbox
    const [thumbnail, setthumbnail] = useState();

    const [text, settext] = useState('');
    console.log("Value: ",);
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







    return (
        <Layout>
      
        <div className=' container mx-auto max-w-5xl py-6'>
         
            <div className="p-5" style={{
                background: mode === 'dark'
                    ? '#353b48'
                    : 'rgb(226, 232, 240)',
                borderBottom: mode === 'dark'
                    ? ' 4px solid rgb(226, 232, 240)'
                    : ' 4px solid rgb(30, 41, 59)'
            }}>
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
                                color: mode === 'dark'
                                    ? 'white'
                                    : 'black'
                            }}
                        >
                            Lodge Complaint
                        </Typography>
                    </div>
                </div>

                {/* main Content  */}
                <div className="mb-3">
                    {/* Thumbnail  */}
                    {thumbnail && <img className=" w-full rounded-md mb-3 "
                        src={thumbnail
                            ? URL.createObjectURL(thumbnail)
                            : ""}
                        alt="thumbnail"
                    />}

                    {/* Text  */}
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-semibold"
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    >
                        Upload Evidence
                    </Typography>

                    {/* First Thumbnail Input  */}
                    <input
                        type="file"
                        label="Upload thumbnail"
                        className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        onChange={(e) => setthumbnail(e.target.files[0])}
                    />
                </div>

                {/* Second Title Input */}
                <div className="mb-3">
                    <input
                        label="Enter your Title"
                       className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                 ? 'placeholder-black'
                 : 'placeholder-black'}`}
                        placeholder="Enter Your Title"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        name="title"
                        onChange={(e) => setBlogs({ ...blogs, title: e.target.value })} 
                        value={blogs.title}
                        
                    />
                </div>

                

                {/* Third Category Input  */}
                <div className="mb-3">
                <div className="inputGp">
          <label> <b>Complaint Type</b></label>
          <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="allSelect"
            checked={!users.some((user) => user?.isChecked !== true)}
            onChange={handleChange}
          />
          <label >All Select</label>
          </div>
          {users.map((user, index) => (
          <div className="form-check" key={index}>
            <input
              type="checkbox"
              className="form-check-input"
              name={user.name}
              checked={user?.isChecked || false}
              onChange={handleChange}
            />
            <label className="form-check-label ms-2">{user.name}</label>
          </div>
        ))}
        </div>
                </div>
                {/* Third Title Input */}
                <div className="mb-3">
                    <input
                        label="Enter your Category"
                       className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                 ? 'placeholder-black'
                 : 'placeholder-black'}`}
                        placeholder="Enter any other"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
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
       <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-4' onClick={startRecording}>Start Recording</button>
       <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ' onClick={stopRecording}>Stop Recording</button> <br></br>
          <br></br><video src={mediaBlobUrl} controls  loop />
          
        </div>
        </div>


                {/* Four Editor  */}
                <Editor
                    apiKey='r5xdhc208mmf6vcsxoeqj2x4bzx4x76uibzzka5bf10cmttb'
                    onEditorChange={(newValue, editor) => {
                        setBlogs({ ...blogs, content: newValue });
                        settext(editor.getContent({ format: 'text' }));
                    }}
                    onInit={(evt, editor) => {
                        settext(editor.getContent({ format: 'text' }));
                    }}
                    init={{
                        plugins: 'a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template  tinydrive tinymcespellchecker typography visualblocks visualchars wordcount'
                    }}
                />

                {/* Five Submit Button  */}
                
                <div className='flex justify-center items-center mt-5'>
                <Button className="mt-5 mx-auto"
                onClick={addPost}
                    style={{
                        background: mode === 'dark'
                            ? 'rgb(226, 232, 240)'
                            : 'rgb(30, 41, 59)',
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}
                >
                    Submit
                </Button></div>

                {/* Six Preview Section  */}
                <div className="">
                    {/* <h1 className=" text-center mb-3 text-2xl">Preview</h1> */}
                    <div className="content">
                    <div
                        className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${mode === 'dark' ? '[&>h1]:text-[#ff4d4d]' : '[&>h1]:text-black'}

                        [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                        ${mode === 'dark' ? '[&>h2]:text-white' : '[&>h2]:text-black'}

                        [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
                        ${mode === 'dark' ? '[&>h3]:text-white' : '[&>h3]:text-black'}

                        [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                        ${mode === 'dark' ? '[&>h4]:text-white' : '[&>h4]:text-black'}

                        [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                        ${mode === 'dark' ? '[&>h5]:text-white' : '[&>h5]:text-black'}

                        [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                        ${mode === 'dark' ? '[&>h6]:text-white' : '[&>h6]:text-black'}

                        [&>p]:text-[16px] [&>p]:mb-1.5
                        ${mode === 'dark' ? '[&>p]:text-[#7efff5]' : '[&>p]:text-black'}

                        [&>ul]:list-disc [&>ul]:mb-2
                        ${mode === 'dark' ? '[&>ul]:text-white' : '[&>ul]:text-black'}

                        [&>ol]:list-decimal [&>li]:mb-10
                        ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}

                        [&>li]:list-decimal [&>ol]:mb-2
                        ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}

                        [&>img]:rounded-lg
                        `}
                         dangerouslySetInnerHTML={createMarkup(blogs.content)}>
                    </div>
            </div>
        </div >
       
            </div >
        </div >
        </Layout>
    )
}

export default CreateBlog