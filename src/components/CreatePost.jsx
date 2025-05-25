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
    const { token } = useAuth();
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
      // send formData to server
      try {
            
            // const res = await API.post('/auth/posts', { ...formData, postedBy: userId });
            const res = await API.post('/auth/posts', formData, {headers: { Authorization: `Bearer ${token}` }})
           

            console.log('Post created:', res.data);

            // Redirect to posts page or clear form
            navigate('/posts'); // or window.location.reload() if not using router
        } catch (err) {
            console.error('Error creating post:', err.response?.data || err.message);
        }
    }   
    
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <TextField
          name="title"
          label="Title"
          variant="filled"
          value={formData.title}
          onChange={handleChange}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />
        <TextField
          name="description"
          label="Description"
          variant="filled"
          value={formData.description}
          onChange={handleChange}
          error={Boolean(errors.description)}
          helperText={errors.description}
        />
        <TextField
          name="difficulty"
          label="Difficulty (Easy/Medium/Hard)"
          variant="filled"
          value={formData.difficulty}
          onChange={handleChange}
          error={Boolean(errors.difficulty)}
          helperText={errors.difficulty}
        />
        <TextField
          name="subject"
          label="Subject"
          variant="filled"
          value={formData.subject}
          onChange={handleChange}
          error={Boolean(errors.subject)}
          helperText={errors.subject}
        />
        <TextField
          name="topic"
          label="Topic"
          variant="filled"
          value={formData.topic}
          onChange={handleChange}
          error={Boolean(errors.topic)}
          helperText={errors.topic}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
