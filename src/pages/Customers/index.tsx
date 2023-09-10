import { lazy } from "react";
import styled from 'styled-components';
import React, { useState, useEffect } from "react";

const Navbar = lazy(() => import("../../components/Backend/NavbarSide/navbar"));
const CustomerBlock = lazy(() => import("../../components/Backend/CustomerBlock"));

const CustomerContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Menggunakan space-between untuk menghindari tumpang tindih */
`;

const Customers = () => {
    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        window.location.href = "/login";
      }
    }, []);

    return (
      <>
        <Navbar />
          <CustomerContainer>
            <CustomerBlock />
          </CustomerContainer>
      </>
    );
};

export default Customers;
