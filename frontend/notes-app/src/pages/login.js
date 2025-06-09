import React , {useState} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
export default function Login(){
    const [form, setForm] = useState({
        email: '',
        password : ''
    });
    const submit = async ()=>{
        try{
            const res = await axios.post($`{API_BASE_URL}/api/users/login`, form);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/";
        }
        catch{
            alert("Invalid credentials");
        }
    };
    return (
        <div style = {{padding : 20}}>
            <h2>Login</h2>
            <input placeholder="email" onChange={e => setForm({ ...form, email:e.target.value})}/><br/>
            <input type = "password" placeholder="Password" onChange={e => setForm({ ...form, password:e.target.value})}/>
            <button onClick = {submit}>Login</button>
        </div>
    )
}