import React, { Fragment, useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext'
import { useParams } from 'react-router';
import { Timestamp, addDoc, collection, doc, getDoc, setDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { fireDb } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';
import Layout from '../../components/layout/Layout';
import Comment from '../../components/comment/Comment';
import toast from 'react-hot-toast';
import "./bloginfo.css";
import { useNavigate } from 'react-router-dom';
import { FaRegThumbsDown } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../../firebase/FirebaseConfig';



function BlogInfo() {

  const context = useContext(myContext);
  const { mode, loading, setloading } = context;
  const isAuth = localStorage.getItem('isAuth');
  let navigate = useNavigate();

const [activeBtn, setActiveBtn] = useState("none");
const gotoLogin = () => {
   
  navigate('/adminlogin')
}

  const params = useParams();
  // console.log(params.id),

  const [getBlogs, setGetBlogs] = useState();
  const [likesCnt, setLikesCnt] = useState(0);
  const [disLikesCnt, setdisLikesCnt] = useState(0);

  const addLikes = async () => {
    try {
        // Ensure user is authenticated, retrieve current user's ID
        const currentUser = auth.currentUser;
        if (!currentUser) {
            // Handle case where user is not authenticated
            console.error('User is not authenticated.');
            return;
        }
        const userId = currentUser.uid;

        // Get a reference to the document containing like count
        const likesRef = doc(fireDb, "blogPost", params.id);

        // Fetch current like count
        const docSnap = await getDoc(likesRef);
        if (docSnap.exists()) {
            // If the document exists, check if likesCount field exists
            const blogPostData = docSnap.data();
            if (blogPostData.likesCount === undefined) {
                // If likesCount field doesn't exist, initialize it with 1
                await updateDoc(likesRef, { likesCount: 1 });
                setLikesCnt(1); // Update state or show success message
            } else {
                // Check if the user has already liked the post
                const likedByUserRef = doc(fireDb, "likes", `${params.id}_${userId}`);
                const likeDocSnap = await getDoc(likedByUserRef);
                // if (likeDocSnap.exists()) {
                //     // User has already liked the post
                //     console.log('User has already liked this post.');
                //     toast.success('User has already liked this post.');

                //     // Optionally, you can show a message to the user indicating they've already liked the post
                //     return;
                // }

                // Increment like count
                const updatedLikesCnt = blogPostData.likesCount + 1;
                // Update like count in Firestore
                await updateDoc(likesRef, { likesCount: updatedLikesCnt });
                setLikesCnt(updatedLikesCnt); // Update state or show success message

                // Record that the user has liked the post
                await setDoc(likedByUserRef, { liked: true });
            }
            toast.success('Likes Updated Successfully');
        } else {
            // If the document doesn't exist, create it with likesCount field initialized to 1
            await setDoc(likesRef, { likesCount: 1 });
            setLikesCnt(1); // Update state or show success message

            // Record that the user has liked the post
            const likedByUserRef = doc(fireDb, "likes", `${params.id}_${userId}`);
            await setDoc(likedByUserRef, { liked: true });

            toast.success('Likes Updated Successfully');
        }
    } catch (error) {
        console.error('Error updating like count: ', error);
        // Handle error, show error message, etc.
    }
}



  const addDislikes = async () => {
    try {
        // Ensure user is authenticated, retrieve current user's ID
        const currentUser = auth.currentUser;
        if (!currentUser) {
            // Handle case where user is not authenticated
            console.error('User is not authenticated.');
            return;
        }
        const userId = currentUser.uid;

        // Get a reference to the document containing like count
        const dislikesRef = doc(fireDb, "blogPost", params.id);

        // Fetch current dislike count
        const docSnap = await getDoc(dislikesRef);
        if (docSnap.exists()) {
            // If the document exists, check if dislikesCount field exists
            const blogPostData = docSnap.data();
            if (blogPostData.dislikesCount === undefined) {
                // If dislikesCount field doesn't exist, initialize it with 1
                await updateDoc(dislikesRef, { dislikesCount: 1 });
                setdisLikesCnt(1); // Update state or show success message
            } else {
                // Check if the user has already disliked the post
                const dislikedByUserRef = doc(fireDb, "dislikes", `${params.id}_${userId}`);
                const dislikeDocSnap = await getDoc(dislikedByUserRef);
                // if (dislikeDocSnap.exists()) {
                //     // User has already disliked the post
                //     console.log('User has already disliked this post.');
                //     toast.success('User has already disliked this post.');

                //     // Optionally, you can show a message to the user indicating they've already disliked the post
                //     return;
                // }

                // Increment dislike count
                const updatedDislikesCnt = blogPostData.dislikesCount + 1;
                // Update dislike count in Firestore
                await updateDoc(dislikesRef, { dislikesCount: updatedDislikesCnt });
                setdisLikesCnt(updatedDislikesCnt); // Update state or show success message

                // Record that the user has disliked the post
                await setDoc(dislikedByUserRef, { disliked: true });
            }
            toast.success('Dislikes Updated Successfully');
        } else {
            // If the document doesn't exist, create it with dislikesCount field initialized to 1
            await setDoc(dislikesRef, { dislikesCount: 1 });
            setdisLikesCnt(1); // Update state or show success message

            // Record that the user has disliked the post
            const dislikedByUserRef = doc(fireDb, "dislikes", `${params.id}_${userId}`);
            await setDoc(dislikedByUserRef, { disliked: true });

            toast.success('Dislikes Updated Successfully');
        }
    } catch (error) {
        console.error('Error updating dislike count: ', error);
        // Handle error, show error message, etc.
    }
}


  const getAllBlogs = async () => {
    setloading(true);
    try {
      const productTemp = await getDoc(doc(fireDb, "blogPost", params.id))
      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
      } else {
        console.log("Document does not exist")
      }
      setloading(false)
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);


  //* Create markup function 
  function createMarkup(c) {
    return { __html: c };
  }


  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');

  const addComment = async () => {
    const commentRef = collection(fireDb, "blogPost/" + `${params.id}/` + "comment")
    try {
      await addDoc(
        commentRef, {
        fullName,
        commentText,
       
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
      toast.success('Comment Add Successfully');
      setFullName("")
      setCommentText("")
    } catch (error) {
      console.log(error)
    }
  }

  const [allComment, setAllComment] = useState([]);

  const getcomment = async () => {
    try {
      const q = query(
        collection(fireDb, "blogPost/" + `${params.id}/` + "comment/"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(productsArray)
        console.log(productsArray)
      });
      return () => data;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getcomment();
    window.scrollTo(0, 0)
  }, []);

 

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("current user uid", auth.currentUser.uid);
      localStorage.setItem("isAuth", true);
      toast.success('Login sucess');
     // setIsAuth(true);
     navigate('/bloginfo/:id')
    });
  };

 

  return (

    
    <Layout>
      

        <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
          <div className=" py-4 lg:py-8">
            {loading
              ?
              <Loader />
              :
              <div >
                {/* Thumbnail  */}
                <img alt="content" className="mb-3 rounded-lg h-full w-full"
                  src={getBlogs?.thumbnail}
                />
                {/* title And date  */}
                <div className="flex justify-between items-center mb-3">
                  <h1 style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    className=' text-xl md:text-2xl lg:text-2xl font-semibold'>
                    {getBlogs?.blogs?.title}
                  </h1>
                  <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                    {getBlogs?.date}
                  </p>
                </div>
                <div
                  className={`border-b mb-5 ${mode === 'dark' ?
                    'border-gray-600' : 'border-gray-400'}`}
                />

                {/* blog Content  */}
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
                    dangerouslySetInnerHTML={createMarkup(getBlogs?.blogs?.content)}>
                  </div>
                </div>

              </div>}
          </div>
<div className="status">
 <h1>Status: {getBlogs?.status}</h1>
</div>
        
            <div className="btn-cont">
          {isAuth ? 
          <button onClick={addLikes}>Like ({likesCnt})</button> : <button onClick={signInWithGoogle}>Like ({likesCnt})</button> }
          {isAuth ? 
      <button onClick={addDislikes}>Dislike ({disLikesCnt})</button> :   <button onClick={signInWithGoogle}>Dislike ({disLikesCnt})</button>}
              

            </div>
         
          

          <Comment
            addComment={addComment}
            commentText={commentText}
            setcommentText={setCommentText}
            allComment={allComment}
            fullName={fullName}
            setFullName={setFullName}
          />
        </section>
       
        
    </Layout>

    
  )
}

export default BlogInfo