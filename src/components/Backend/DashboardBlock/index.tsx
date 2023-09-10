import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Slide } from "react-awesome-reveal";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import {
  DashboardSection,
  ContentWrapper,
} from "./styles";


const Dashboard: React.FC = () => {
  const storedLoggedInStatus = localStorage.getItem('isLoggedIn');  
  const accessToken = localStorage.getItem('accessToken');
  let name = '';

  useEffect(() => {
    if (!storedLoggedInStatus && !accessToken) {
      window.location.href = "/login";
    }
  }, []);


  if (accessToken) {
    const decodedToken = jwt_decode(accessToken) as { name?: string };
    if (decodedToken && decodedToken.name) {
      name = decodedToken.name;
    }
    console.log(decodedToken);
  } else {
    console.log('Token tidak ada');
  }

  return (
    <> 
      <DashboardSection>
          <Row justify="center">
            <ContentWrapper>
              <Col lg={24} md={24} sm={24} xs={24}>
                <br/>
                <br/>
                <br/>
                {/* <p style={{textAlign: 'center', marginBottom: '16px' }}>Hallo!! {name}</p> */}
                <p style={{textAlign: 'center', marginBottom: '16px' }}>Welcome To</p>
                <p style={{textAlign: 'center', marginBottom: '16px' }}>Customer Handling Management</p>
              </Col>
            </ContentWrapper>
          </Row>
      </DashboardSection>
    </>
  );
};

export default Dashboard;
