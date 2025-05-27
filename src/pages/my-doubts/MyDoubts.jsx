import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import './MyDoubts.css';

const MyDoubts = () => {
  const { user, token } = useAuth();
  const currentUserId = user?.id;
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await API.get('/auth/posts');
        const userPosts = res.data.filter(post => post.postedBy?._id === currentUserId);
        setMyPosts(userPosts);
      } catch (err) {
        console.error('Failed to fetch posts', err);
      }
    };

    if (currentUserId) {
      fetchMyPosts();
    }
  }, [currentUserId]);

  const handleDelete = async (postId) => {
    try {
      await API.delete(`/auth/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyPosts(myPosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Failed to delete post', err);
    }
  };

  if (!currentUserId) {
    return <div>Please log in to view your doubts.</div>;
  }

  return (
    <div className="mydoubts-container">
      <h1>My Doubts</h1>

      <div className="post-list">
        {myPosts.length === 0 ? (
          <p>No doubts posted yet.</p>
        ) : (
          myPosts.map(post => (
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
                  <p><strong>✍️ Posted By:</strong> You</p>
                  <p><strong>💬 Answers:</strong> {post.answerCount}</p>
                  <p><strong>🕒 Posted On:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <div className="column button-column">
                  <button className="viewpostbutton" onClick={() => navigate(`/showPost/${post._id}`)}>View Post</button>
                  <button className="deletepostbutton" onClick={() => handleDelete(post._id)}>Delete Post</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDoubts;
