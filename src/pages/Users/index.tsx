import { lazy } from "react";
import styled from 'styled-components';
import React, { useState, useEffect } from "react";

const Navbar = lazy(() => import("../../components/Backend/NavbarSide/navbar"));
const UserBlock = lazy(() => import("../../components/Backend/UserBlock"));

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Menggunakan space-between untuk menghindari tumpang tindih */
`;

const Users = () => {
    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        window.location.href = "/login";
      }
    }, []);

    return (
      <>
        <Navbar />
          <UserContainer>
            <UserBlock />
          </UserContainer>
      </>
    );
};

export default Users;
