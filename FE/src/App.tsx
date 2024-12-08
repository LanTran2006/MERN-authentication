import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Login from "./pages/login";
import Register from "./pages/register";
import Verify from "./pages/verify";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import Home from "./pages/home";
import { useStore } from "./store/Authstore.ts";

interface ProtectedRouteProps {
  children: React.ReactNode; // Children should be a ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isauthenticated, isverified} = useStore();
  if (!isauthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isverified) {
    return <Verify/>;
  }
  return children;
};
let RedirectRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isauthenticated, isverified } = useStore();
  if (isauthenticated && isverified) {
    return <Navigate to={"/"} />;
  } else if (isauthenticated && !isverified) {
    return <Navigate to={"/verify"} />;
  }
  return children;
};

function App() {
  const {ischeckAuth,checkAuth}=useStore();
  useEffect(()=>{
    checkAuth();
  },[])
  if (ischeckAuth) {
    return <h1>Loading...</h1>;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectRoute>
            <Register />
          </RedirectRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectRoute>
            <Login />
          </RedirectRoute>
        }
      />
      <Route
        path="/verify"
        element={
          <ProtectedRoute>
            <RedirectRoute>
              <Verify/>
            </RedirectRoute>
          </ProtectedRoute>
        }
      />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset/:id" element={<Reset />}/>
    </Routes>
  );
}

export default App;
