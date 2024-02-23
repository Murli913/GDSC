import React, { useContext } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Avatar,
  Collapse,
} from "@material-tailwind/react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineShareAlt, AiOutlineSearch } from "react-icons/ai";
import myContext from "../../context/data/myContext";
import SearchDialog from "../searchDialog/SearchDialog";
import ShareDialogBox from "../shareDialogBox/ShareDialog";
import "./Navbar.css";

import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { auth, fireDb, provider } from "../../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function Nav() {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation();

    const context = useContext(myContext);
    const { mode, toggleMode } = context;
    const isAuth = localStorage.getItem('isAuth');
    const navigate = useNavigate();
    //* Logout Function 
    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
    const signwithoutuser = () => {
   
       navigate("/terms");
     
    };
    const signInWithpolice = () => {
   
        navigate("/policelogin");
      
     };
    

     const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log("result user", user);
        const userDetails = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          userid: user.uid,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          // Add any other user details you want to store
        };
    
        // Save user details to Firestore under 'users' collection
        const userRef = doc(fireDb, "users", user.uid);
        setDoc(userRef, userDetails)
          .then(() => {
            localStorage.setItem("current user uid", user.uid);
            localStorage.setItem("isAuth", true);
            toast.success('Login success');
            navigate("/");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            toast.error('Error occurred during login');
          });
      });
    };

  // All NavList
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        style={{ color: mode === "dark" ? "white" : "white" }}
      >
  <NavLink
  exact
  to={"/"} // Make sure this path matches the route for the home page
  activeClassName="active-link"
>
  Home
</NavLink>

      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        style={{ color: mode === "dark" ? "white" : "white" }}
      >
        <NavLink to={"/allblogs"} activeClassName="active-link">
          Complaints
        </NavLink>
      </Typography>
      {/* dropdown */}
      {!isAuth ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
          style={{ color: mode === "dark" ? "white" : "white" }}
        >
          <div class="navbar">
            <div class="dropdown">
              <Link class="dropbtn">
                New Complaint
                <i class="fa fa-caret-down"></i>
              </Link>
              <div class="dropdown-content">
                <a href="#" onClick={signwithoutuser}>
                  Anonymously{" "}
                </a>
                <a href="#" onClick={signInWithGoogle}>
                  Sign In user</a> 
      <a href="#"  onClick={signInWithpolice}>Sign In police
                </a>
              </div>
            </div>
          </div>
        </Typography>
      ) : (
        ""
      )}

      {isAuth ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
          style={{ color: mode === "dark" ? "white" : "white" }}
        >
          <NavLink to={"/createblog"} activeClassName="active-link">
            Create Complaints
          </NavLink>
        </Typography>
      ) : (
        ""
      )}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        style={{ color: mode === "dark" ? "white" : "white" }}
      >
        {!isAuth ? (
          <Link to={"/adminlogin"} className="flex items-center"></Link>
        ) : (
          <Link
            onClick={logout}
            style={{
              background:
                mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
              color: mode === "dark" ? "black" : "white",
            }}
            className="px-8 py-2"
          >
            Logout
          </Link>
        )}
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        style={{ color: mode === "dark" ? "white" : "white" }}
      >
        <NavLink to={"/sucessstory"} activeClassName="active-link">
          SucessStory
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <>
      {/* Navbar  */}
      <Navbar
        className="sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-4 lg:px-8 lg:py-2"
        style={{ background: mode === "dark" ? "rgb(30, 41, 59)" : "#30336b" }}
      >
        {/* Desktop View  */}
        <div className="flex items-center justify-between text-blue-gray-900">
          {/* Home Page Link  */}
          <Link to={"/"}>
            <Typography
              as="a"
              className="mr-4 cursor-pointer py-1.5 text-xl font-bold flex gap-2 items-center"
              style={{ color: mode === "dark" ? "white" : "white" }}
            >
              {/* Logo Image  */}
              <img
                className=" w-10 h-10 "
                src="https://cybercrime.gov.in/assets/images/emblem-dark.png"
              />
              {/* Logo Text  */}
              <span>National Cyber Crime Reporting Portal</span>
            </Typography>
          </Link>

          {/* All Items  */}
          <div className="flex items-center gap-4">
            {/* Navlist  */}
            <div className="hidden lg:block">{navList}</div>

            {/* Search Icon */}
            <div>
              {/*<AiOutlineSearch size={20} color="white" />*/}
              <SearchDialog />
            </div>

            {/* Share Icon */}
            <div className="hidden lg:block">
              {isAuth ? <ShareDialogBox /> : ""}
            </div>

            {/* Admin Profile Pic */}
            <div>
              {isAuth ? (
                <Link to={"/dashboard"}>
                  <div className="">
                    <Avatar
                      key={1}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                      }
                      alt="avatar"
                      withBorder={true}
                      className="p-0.5 text-red-500 w-10 h-10"
                      style={{
                        border:
                          mode === "dark"
                            ? "2px solid rgb(226, 232, 240)"
                            : "2px solid rgb(30, 41, 59)",
                      }}
                    />
                  </div>
                </Link>
              ) : (
                ""
              )}
            </div>

            {/* dark And Light Button */}
            <div>
              {mode === "light" ? (
                <>
                  {/* Light Button  */}
                  <IconButton
                    onClick={toggleMode}
                    className=" lg:inline-block rounded-full"
                    style={{
                      background: mode === "light" ? "#ced6e0" : "#57606f",
                      color: mode === "dark" ? "white" : "black",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  </IconButton>
                </>
              ) : (
                <>
                  {/* Dark Button  */}
                  <IconButton
                    onClick={toggleMode}
                    className=" lg:inline-block rounded-full"
                    style={{
                      background: mode === "light" ? "#ced6e0" : "#57606f",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  </IconButton>
                </>
              )}
            </div>

            {/* Mobile Toggle  */}
            <div>
              <IconButton
                className="ml-auto h-10 w-10 text-inherit rounded-lg lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
                style={{
                  background: mode === "light" ? "#ced6e0" : "#57606f",
                  color: mode === "dark" ? "white" : "black",
                }}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <Collapse open={openNav}>
          {/* NavList  */}
          {navList}
        </Collapse>
      </Navbar>
    </>
  );
}
