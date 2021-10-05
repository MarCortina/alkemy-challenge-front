import React from "react";
import "./layout.css"
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/NavBar/Nav";
const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="children-container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
