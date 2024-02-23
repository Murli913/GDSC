import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Test from "./components/Commenting/test";
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
import PoliceHome from "./Police/PoliceHome/PoliceHome";
import PoliceLogin from "./Police/PoliceLogin/PoliceLogin";
import PoliceForgot from "./Police/PoliceForgot/PoliceForgot";
import Policeallblogs from "./Police/Policeallblogs/Policeallblogs";
import Policebloginfo from "./Police/Policebloginfo/Policebloginfo";
import SucessStory from "./pages/SucessStory/SucessStory";
import SucessInfo from "./pages/SucessInfo/SucessInfo";




function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/policelogin" element={<PoliceLogin />} />
          <Route path="/policehome" element={<PoliceHome />} />
          <Route path="/policereset" element={<PoliceForgot />} />
          <Route path="/policeallblogs" element={<Policeallblogs />} />
          <Route path="/policebloginfo/:id" element={<Policebloginfo />} />
          <Route path="/sucessstory" element={<SucessStory />} />
          <Route path="/sucessinfo/:id" element={<SucessInfo />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
                 <Route path="/createblog" element={
          
              <CreateBlog />
           
          } />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/createblog" element={<CreateBlog />} />

          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
}

export default App;
export const ProtectedRouteForAdmin = ({ children }) => {
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  if (isAuth === true) {
    return children;
  } else {
    return <Navigate to={"/adminlogin"} />;
  }
};
