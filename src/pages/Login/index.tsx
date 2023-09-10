import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const LoginBlock = lazy(() => import("../../components/Backend/LoginBlock"));

const Login = () => {
  return (
    <>
      <LoginBlock />
   </> 
  );
};

export default Login;
