import React, { useEffect, useState } from 'react';
import API from '../../api.js';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import './Posts.css'; 
import { useAuth } from '../../AuthContext.jsx';
import Skeleton from '@mui/material/Skeleton';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const {user,token,refreshUser} = useAuth()
  const currentUserId = user?.id


  const handleDelete = async (postId) => {
    try {
      await API.delete(`/auth/posts/${postId}`,{ headers: {Authorization: `Bearer ${token}`}});
      setPosts(posts.filter(post => post._id !== postId));
      refreshUser();
    } catch (err) {
      console.error('Failed to delete post', err);
    }
  };


  useEffect(() => {
  const fetchPosts = async (retry = false) => {
    try {
      const res = await API.get('/auth/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('API error:', err);
      if (!retry) {
        setTimeout(() => fetchPosts(true), 1000);
      } else {
        setPosts([]);
      }
    }
  };
  fetchPosts();
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
        {Array.isArray(posts)? posts.map(post => (
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
                <p><strong>💬 Answers:</strong> {post.answerCount}</p>
                <p><strong>🕒 Posted On:</strong> {new Date(post.createdAt).toLocaleString()}</p>
              </div>
              <div className="column button-column">
                <button onClick={() => navigate(`/showPost/${post._id}`)} className='viewpostbutton'>View Post</button>
                {user && post.postedBy?._id === currentUserId && (
                  <button onClick={() => handleDelete(post._id)} className='deletepostbutton'>Delete Post</button>
                )}

              </div>
            </div>
          </div>
          
        ))
        :<Skeleton variant="rectangular" width={1200} height={60} />
      }
      </div>
    </div>
  );
};

export default Posts;
