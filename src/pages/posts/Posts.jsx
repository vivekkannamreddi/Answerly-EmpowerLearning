import React, { useEffect, useState } from 'react';
import API from '../../api.js';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import './Posts.css'; 


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/auth/posts')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.error('API error:', err);
        setPosts([]);
      });
  }, []);

  return (
    <div className="posts-container">
      <h1>All Posts</h1>

      <div className="fab-button">
        <Fab sx={{ backgroundColor: '#6d28d2',color:'white', '&:hover': { backgroundColor: '#5b21b6' } }} aria-label="add" onClick={() => navigate('/create')}>
          <AddIcon />
        </Fab>
      </div>

      <div className="post-list">
        {Array.isArray(posts) && posts.map(post => (
          <div className="post-card" key={post._id}>
            <h2>{post.title}</h2>
            <p className="description">{post.description}</p>

            <div className="details">
              <div className="column">
                <p><strong>📚 Subject:</strong> {post.subject}</p>
                <p><strong>🧠 Topic:</strong> {post.topic}</p>
                <p><strong>🔥 Difficulty:</strong> {post.difficulty}</p>
              </div>
              <div className="column">
                <p><strong>✍️ Posted By:</strong> {post.postedBy?.username || 'Anonymous'}</p>
                <p><strong>💬 Answers:</strong> {post.answers.length}</p>
                <p><strong>🕒 Posted On:</strong> {new Date(post.createdAt).toLocaleString()}</p>
              </div>
              <div className="column button-column">
                <button onClick={() => navigate(`/showPost/${post._id}`)}>View Post</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
