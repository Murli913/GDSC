import React, { useContext } from "react";
import PoliceLayout from "../PoliceLayout/PoliceLayout";
import { auth } from "../../firebase/FirebaseConfig";

import myContext from "../../context/data/myContext";
function PoliceDashboard() {
  const context = useContext(myContext);
  const { mode, getAllBlog, deleteBlogs } = context;
  return (
    <PoliceLayout>
      <div className="py-10">
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="left">
            <img
              className=" w-40 h-40  object-cover rounded-full border-2 border-pink-600 p-1"
              src="https://img.freepik.com/free-vector/police-badge-isolated_1284-42802.jpg"
              alt="profile"
            />
          </div>
          <div className="right">
            <h1
              className="text-center font-bold text-2xl mb-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Welcome Sheetal Agarwal,
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
    </PoliceLayout>
  );
}

export default PoliceDashboard;
