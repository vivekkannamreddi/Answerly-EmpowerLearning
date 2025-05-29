import './Edit.css'
import React, { useState , useEffect } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import { useAuth } from '../AuthContext.jsx';


const Edit = () => {
  const navigate = useNavigate();
  const {token,userDetails,refreshUser} = useAuth();
  const [data , setData] = useState({
    username:'',
    email:'',
    password:''
  });

  useEffect(() => {
    if (userDetails) {
      setData({
        username: userDetails.username || '',
        email: userDetails.email || '',
        password: ''
      });
    }
  }, [userDetails]);


  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const res = await API.put('/auth/user/edit',data,{headers: { Authorization: `Bearer ${token}` }});
    await refreshUser();
    navigate('/profile');

  }

  if (!userDetails) return <div>Loading...</div>;


  return (
    <div>
    <form action="" onSubmit={handleSubmit}>
        <div className='editMain'>
            <div className="editInner">
              <h1>Edit Profile</h1>
              <div className='textfieldedit'><TextField  className='textfieldedit' name="username"  label="Username" required variant="standard" value={data.username}  onChange={handleChange}/></div>
              <div className='textfieldedit'><TextField className='textfieldedit' name="email"  label="Email" type='email'  required variant="standard" onChange={handleChange} value={data.email}/></div>
              <div className='textfieldedit'><TextField className='textfieldedit' name="password"  label="Enter password to update profile" type='password'  required variant="standard" onChange={handleChange} /></div>
              <div className='textfieldedit'><Button className='textfieldedit' type="submit" variant="outlined" sx={{marginTop:"20px",height:"40px" ,width: "300px",}} >Update</Button></div>
            </div>
        </div>
    </form>
    </div>
    
  )
}

export default Edit     