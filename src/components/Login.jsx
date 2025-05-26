import React, { useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import { useAuth } from '../AuthContext.jsx';

function Login() {
    const { setUser,setToken } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', formData);
            localStorage.setItem('tokenAnswerly', res.data.token);
            localStorage.setItem('userAnswerly', JSON.stringify(res.data.user));
            setToken(res.data.token);
            setUser(res.data.user);  
            console.log("Login successful!");
            navigate('/posts');
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='LoginForm'>
            <div className="loginMain">
                <div className="loginInner">
                    <h2>Log In</h2>
                    <div className='textfieldlogin'><TextField className='textfieldlogin' name="email"  label="Email" onChange={handleChange} required variant="standard" /></div>
                    <div className='textfieldlogin'><TextField className='textfieldlogin' name="password" type="password" label="Password" variant="standard"  onChange={handleChange} required /></div>
                    <div className='textfieldlogin'><Button className='textfieldlogin' variant="outlined" sx={{marginTop:"20px",height:"40px" ,width: "300px",}} type="submit">Log In</Button></div>
                </div>
            </div>
        </form>
    );
}

export default Login;
