import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebardata';
import './navbarstyles.css';
import { IconContext } from 'react-icons';
import Cookies from 'js-cookie';
import axios from "axios";
import { HashLink } from 'react-router-hash-link';
import jwt_decode from "jwt-decode";
import { SvgIcon } from "../../../common/SvgIcon";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [linksActive, setLinksActive] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarActive(prevSidebarActive => !prevSidebarActive);
  };

  const handleLogout = async () => {
    
    try {
      await axios.delete('https://api.whnmandiri.co.id/logout');
    } catch (error) {
      console.error('Error saat melakukan logout:', error);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    window.location.href = "/login";
    
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSvgIconClick = () => {
    setLinksActive(!linksActive);
  };

  const accessToken = localStorage.getItem('accessToken');
  let role = '';

  if (accessToken) {
    const decodedToken = jwt_decode(accessToken) as { role?: string };
    if (decodedToken && decodedToken.role) {
      role = decodedToken.role;
    }
  } else {
    console.log('Token tidak ada');
  }

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
        {windowWidth <= 1024 ? (
          <div className='navbartop'>
          <button className="icon-button" onClick={handleSvgIconClick}>
            <SvgIcon src="burger.png" width="35px" height="35px" />
          </button>
          <SvgIcon src="logo.png" width="" height="45px" />
          <div className={`nav-menu active ${linksActive ? '' : 'inactive'}`}>
            <ul className='nav-menu-items'>
              <button className="icon-button" onClick={handleSvgIconClick}>
                <SvgIcon src="back.png" width="38px" height="38px" />
              </button>
              <br/>
              
              {SidebarData.map((item, index) => {
                if (item.title === 'Users' && role !== 'admin') {
                  return null; // Jika peran bukan admin, tidak tampilkan "Articles"
                }

                return (
                  
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      <span style={{ marginLeft: '8px' }}>{item.icon}</span>
                      <span style={{ marginLeft: '8px' }}>{item.title}</span>
                    </Link>
                  </li>
                );
              })}

              <li className="nav-text">
                <Link to="#" className="nav-link" onClick={handleLogout}>
                  <span style={{ marginLeft: '8px' }}><FaIcons.FaDoorOpen /></span>
                  <span style={{ marginLeft: '8px' }}>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        ) : (
          <>
          <div className='nav-menu active'>
            <ul className='nav-menu-items'>
              <li className='navbar-toggle'>
                <SvgIcon src="logo.png" width="" height="55px" />
              </li>
              <br />
              {SidebarData.map((item, index) => {
                if (item.title === 'Users' && role !== 'admin') {
                  return null; // Jika peran bukan admin, tidak tampilkan "Articles"
                }

                return (
                  
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      <span style={{ marginLeft: '8px' }}>{item.icon}</span>
                      <span style={{ marginLeft: '8px' }}>{item.title}</span>
                    </Link>
                  </li>
                );
              })}

              <li className="nav-text">
                <Link to="#" className="nav-link" onClick={handleLogout}>
                  <span style={{ marginLeft: '8px' }}><FaIcons.FaDoorOpen /></span>
                  <span style={{ marginLeft: '8px' }}>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          </>
        )}
    </IconContext.Provider>
  );
};

export default Navbar;
