import React, { useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import { useAuth } from '../AuthContext.jsx';

function Login() {
    const { setToken } = useAuth();
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
            setToken(res.data.token); 
            console.log("Login successful!");
            navigate('/posts');
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='LoginForm'>
            <h2>Log In</h2>
            <TextField className='textfield' name="email"  label="Email" onChange={handleChange} required variant="standard" />
            <TextField className='textfield' name="password" type="password" label="Password" variant="standard"  onChange={handleChange} required />
            <Button variant="outlined" sx={{marginTop:"20px",height:"40px" ,width: "300px",}} type="submit">Log In</Button>
        </form>
    );
}

export default Login;
