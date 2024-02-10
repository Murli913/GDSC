import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import NoPage from "./pages/nopage/Nopage";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import MyState from "./context/data/myState";
import { Toaster } from "react-hot-toast";
import CreateBlog from "./pages/admin/createBlog/createBlog";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/FirebaseConfig";
import TermsAndConditions from "./pages/terms/Terms";
function App() {
 

  return (
   <MyState>
      <Router>
     
 
    
        <Routes>
          <Route path="/" element={<Home   />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/adminlogin" element={<AdminLogin   />} />
          <Route path="/terms" element={<TermsAndConditions   />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
                 <Route path="/createblog" element={
          
              <CreateBlog />
           
          } />

          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Toaster/>
      </Router>
      </MyState>
    
  )
}

export default App
export const ProtectedRouteForAdmin = ({ children }) => {
  const isAuth = JSON.parse(localStorage.getItem('isAuth'))
  if (isAuth === true) {
    return children
  }
  else {
    return <Navigate to={'/adminlogin'}/>
  }
}