// src/Layout.jsx
import React from 'react';
import Navigation from '../components/Navigation'; // Corrected path to Navigation component
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom

const Layout = () => {
  return (
    <>
      <Navigation /> {/* Render the Navigation component */}
      <Outlet /> {/* Render the child components (pages) */}
    </>
  );
};

export default Layout;
