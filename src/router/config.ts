const routes = [
  {
    path: ["/", "/dashboard"],
    exact: true,
    component: "Dashboard",
  },
  {
    path: ["/login"],
    exact: true,
    component: "Login",
  },
  // {
  //   path: ["/dashboard/articles"],
  //   exact: true,
  //   component: "Articles",
  // },
  // {
  //   path: ["/dashboard/products"],
  //   exact: true,
  //   component: "Products",
  // },
  {
    path: ["/customers"],
    exact: true,
    component: "Customers",
  },
  // {
  //   path: ["/users"],
  //   exact: true,
  //   component: "Users",
  // },

];

export default routes;
