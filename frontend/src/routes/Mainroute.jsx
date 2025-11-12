import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home.jsx";
import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/Signup.jsx";
import Jobs from "../components/Jobs.jsx";
import Browse from "../components/Browse.jsx";

const Mainroute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </div>
  );
};

export default Mainroute;
