import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLaboratorio from "../Headers/HeaderLaboratorio";
import CustomFooter from "../footerjs/Footer";


const LayoutHome = () => {
  return (
    <div id="layout-container">
      <HeaderLaboratorio />
      <main>
        <Outlet /> {/* Renderiza las rutas hijas aquí */}
      </main>
      <CustomFooter />
    </div>
  );
};

export default LayoutHome;
