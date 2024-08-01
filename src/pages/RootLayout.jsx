import * as React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../components/AppBar";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <>
      <div id="main-root-section">
        <NavBar/>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
