import React, { useState } from 'react';
import './CreatePost.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import API from '../api.js'
import { useAuth } from '../AuthContext.jsx';

const CreatePost = () => {
    const navigate = useNavigate();
    const { token , refreshUser } = useAuth();
    const [postCount,setPostCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: '',
    subject: '',
    topic: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error on change
  };
  const increasePostCount = () =>{
    setPostCount(1);
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!['Easy', 'Medium', 'Hard'].includes(formData.difficulty)) newErrors.difficulty = 'Difficulty must be Easy, Medium, or Hard';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.topic.trim()) newErrors.topic = 'Topic is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form Submitted:', formData);
      try {
            const res = await API.post('/auth/posts', formData, {headers: { Authorization: `Bearer ${token}` }})
            console.log('Post created:', res.data);
            refreshUser();
            navigate('/posts'); 
        } catch (err) {
            console.error('Error creating post:', err.response?.data || err.message);
        }
    }   
    
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="createpostMain">
          <div className="createpostInner">
            <h1>Create Post</h1>
            <div className='textfieldcreate'>
                <TextField
                name="title"
                label="Title"
                variant="filled"
                className='textfieldcreate'
                value={formData.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
              />
            </div>
            <div className='textfieldcreate'>
              <TextField
                name="description"
                label="Description"
                variant="filled"
                className='textfieldcreate'
                value={formData.description}
                onChange={handleChange}
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
            </div>
            <div className='textfieldcreate'>
              <TextField
                name="difficulty"
                label="Difficulty (Easy/Medium/Hard)"
                variant="filled"
                className='textfieldcreate'
                value={formData.difficulty}
                onChange={handleChange}
                error={Boolean(errors.difficulty)}
                helperText={errors.difficulty}
              />
            </div>
            <div className='textfieldcreate'>
              <TextField
                name="subject"
                label="Subject"
                variant="filled"
                className='textfieldcreate'
                value={formData.subject}
                onChange={handleChange}
                error={Boolean(errors.subject)}
                helperText={errors.subject}
              />
            </div>
            <div className='textfieldcreate'>
              <TextField
                name="topic"
                label="Topic"
                variant="filled"
                className='textfieldcreate'
                value={formData.topic}
                onChange={handleChange}
                error={Boolean(errors.topic)}
                helperText={errors.topic}
              />
            </div>
            <div className='textfieldcreate'>
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={increasePostCount}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
