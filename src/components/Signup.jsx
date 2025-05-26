import React, { useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';  
import './Signup.css'


function Signup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/signup', formData);
            console.log("Signup successful!");
            navigate('/login');
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='SignUpForm'>
            <div className="signupMain">
                <div className="signupInner">
                    <h2>SignUp</h2>
                    <div className='textfieldsignup'><TextField  className='textfieldsignup' name="username"  label="Username" onChange={handleChange} required variant="standard" /></div>
                    <div className='textfieldsignup'><TextField className='textfieldsignup' name="email"  label="Email" type='email' onChange={handleChange} required variant="standard" /></div>
                    <div className='textfieldsignup'><TextField className='textfieldsignup' name="password"     label="Password" type='password' onChange={handleChange} required variant="standard" /></div>
                    <div className='textfieldsignup'><Button className='textfieldsignup' type="submit" variant="outlined" sx={{marginTop:"20px",height:"40px" ,width: "300px",}} >Sign Up</Button></div>
                </div>
            </div>
        </form>
    );
}

export default Signup;
