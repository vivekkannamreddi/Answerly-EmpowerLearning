import './Edit.css'
import React, { useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import { useAuth } from '../AuthContext.jsx';


const Edit = () => {
  const {token} = useAuth();
  const [data , setData] = useState({
    username:'',
    email:'',
    password:''
  });
  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const handleSubmit = ()=>{
    const res = API.put('/auth/user/edit',data,{headers: { Authorization: `Bearer ${token}` }})
  }
  return (
    <div className='editMain'>
        <form action="" onSubmit={handleSubmit}>
            <div className="editInnerMain">
              <h1>Edit Profile</h1>
              <div className='textfieldsignup'><TextField  className='textfieldsignup' name="username"  label="Username" required variant="standard"  onChange={handleChange} value={data.username}/></div>
              <div className='textfieldsignup'><TextField className='textfieldsignup' name="email"  label="Email" type='email'  required variant="standard" onChange={handleChange} value={data.email}/></div>
              <div className='textfieldsignup'><TextField className='textfieldsignup' name="password"  label="Enter password to update profile" type='password'  required variant="standard" onChange={handleChange} value={data.password}/></div>
              <div className='textfieldsignup'><Button className='textfieldsignup' type="submit" variant="outlined" sx={{marginTop:"20px",height:"40px" ,width: "300px",}} >Update</Button></div>
            </div>
        </form>
    </div>
  )
}

export default Edit     