import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Login from "./pages/login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import './App.css';

function App() {
  const isLoggedIn = !! localStorage.getItem("token");

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar/>
          <main className="main-content">
            <Routes>
              <Route path="/" element={isLoggedIn ? <Notes /> : <Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
