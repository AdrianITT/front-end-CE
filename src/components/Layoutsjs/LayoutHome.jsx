import React from "react";
import { Outlet } from "react-router-dom";
import HeadersHome from "../Headers/HeadersHome";
import CustomFooter from "../footerjs/Footer";


const LayoutHome = () => {
  return (
    <div id="layout-container">
      <HeadersHome />
      <main>
        <Outlet /> {/* Renderiza las rutas hijas aquí */}
      </main>
      <CustomFooter />
    </div>
  );
};

export default LayoutHome;
