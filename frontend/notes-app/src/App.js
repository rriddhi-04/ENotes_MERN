import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';  
import Navbar from './components/Navbar';  
import Login from "./pages/login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";

function App() {
  const isLoggedIn = !! localStorage.getItem("token");
  return (
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={isLoggedIn ? <Notes /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </Router>
  );
}

export default App;
