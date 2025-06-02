import React from "react";
import {Link, useNavigate} from 'react-router-dom';
export default function Navbar(){
    const navigate = useNavigate();
    const logout = ()=>{
            localStorage.removeItem("token");
            navigate("/login");
    };
    return (
        <nav style = {{padding:10, background: "#eee"}}>
            <Link to = "/" style = {{marginRight: 10}}>Notes</Link> 
            {localStorage.getItem("token") ? (
                <button onClick = {logout}>Logout</button>
    ) : (
        <>
            <Link to = "/login" style = {{marginRight: 10}}>Login</Link> 
            <Link to = "/register">Register</Link> 
        </>
    )
}
</nav>
    );
}
