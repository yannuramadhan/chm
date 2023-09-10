import { lazy } from "react";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const Navbar = lazy(() => import("../../components/Backend/NavbarSide/navbar"));
const DashboardBlock = lazy(() => import("../../components/Backend/DashboardBlock"));

const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Menggunakan space-between untuk menghindari tumpang tindih */
`;

const Dashboard = () => {
  useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        window.location.href = "/login";
      }
    }, []);
    return (
      <>
        <Navbar />
        <DashboardContainer>
          <DashboardBlock />
        </DashboardContainer>
      </>
    );
};

export default Dashboard;
