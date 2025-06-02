import React , {useState} from 'react';
import axios from 'axios';
export default function Register(){
    const [form, setForm] = useState({
        name : '',
        email: '',
        password : ''
    });
    const submit = async ()=>{
        try{
            const res = await axios.post("http://localhost:5000/api/users/register", form);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/";
        }
        catch(err){

            alert("Registration failed");
        }
    };
    return (
        <div style = {{padding : 20}}>
            <h2>Register</h2>
            <input placeholder="Name" onChange={e => setForm({ ...form, name:e.target.value})}/><br/>
            <input placeholder="Email" onChange={e => setForm({ ...form, email:e.target.value})}/><br/>
            <input type = "password" placeholder="Password" onChange={e => setForm({ ...form, password:e.target.value})}/>
            <button onClick = {submit}>Register</button>
        </div>
    )
}