import React from "react";

import Footer from "../../components/footer/Footer";
import PoliceNavbar from "../PoliceNavbar.jsx/PoliceNavbar";

const PoliceLayout = ({ children }) => {
  return (
    <div>
      {/* Navbar  */}
      <PoliceNavbar />

      {/* main Content  */}
      <div className="content min-h-screen">{children}</div>

      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default PoliceLayout;
