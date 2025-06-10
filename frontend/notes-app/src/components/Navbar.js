import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar(){
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const isLoggedIn = !!localStorage.getItem("token");

    const logout = ()=>{
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">📝</span>
                    <span className="brand-text">ENotes</span>
                </Link>

                <div className="navbar-menu">
                    {isLoggedIn ? (
                        <div className="navbar-actions">
                            <Link to="/" className="nav-link">
                                <span className="nav-icon">🏠</span>
                                My Notes
                            </Link>
                            <button 
                                onClick={toggleTheme} 
                                className="btn btn-secondary navbar-btn theme-toggle"
                                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                <span className="nav-icon" aria-hidden="true">{isDarkMode ? '☀️' : '🌙'}</span>
                                {isDarkMode ? 'Light' : 'Dark'}
                            </button>
                            <button onClick={logout} className="btn btn-secondary navbar-btn">
                                <span className="nav-icon">🚪</span>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="navbar-actions">
                            <button 
                                onClick={toggleTheme} 
                                className="nav-link theme-toggle"
                                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                <span className="nav-icon" aria-hidden="true">{isDarkMode ? '☀️' : '🌙'}</span>
                            </button>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary navbar-btn">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
