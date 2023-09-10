import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Articles',
  //   path: '/dashboard/articles',
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Products',
  //   path: '/dashboard/products',
  //   icon: <FaIcons.FaCartPlus />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Customers',
    path: '/customers',
    icon: <FaIcons.FaUser />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Users',
  //   path: '/users',
  //   icon: <FaIcons.FaUser />,
  //   cName: 'nav-text'
  // },
];