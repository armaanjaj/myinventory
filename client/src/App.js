import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Inventory from "./Pages/Inventory/Inventory";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/auth/signup" element={<Signup />} />
        </Routes>
    );
}

export default App;
