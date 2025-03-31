import React from "react";
import { Outlet } from "react-router-dom";
import HeaderCustodiaExterna from "../Headers/HeaderCustodiaExterna";
import CustomFooter from "../footerjs/Footer";


const LayoutHome = () => {
  return (
    <div id="layout-container">
      <HeaderCustodiaExterna />
      <main>
        <Outlet /> {/* Renderiza las rutas hijas aquí */}
      </main>
      <CustomFooter />
    </div>
  );
};

export default LayoutHome;
