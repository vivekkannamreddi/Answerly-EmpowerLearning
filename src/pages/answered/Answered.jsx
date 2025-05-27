import React, { useState, useEffect } from 'react';
import API from '../../api.js';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './Answered.css'; // CSS file

const Answered = () => {
  const [allAnswered, setAllAnswered] = useState([]);
  const [answeredPosts, setAnsweredPosts] = useState([]);
  const { user } = useAuth();
  const currentUserId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await API.get('/auth/answers');
        const answered = res.data.allAnswers.filter(
          (answer) => answer.answeredBy === currentUserId
        );
        setAllAnswered(answered);
        const postIds = [...new Set(answered.map((a) => a.post))];
        const postsRes = await API.post('/auth/posts/byIds', { postIds });
        setAnsweredPosts(postsRes.data.posts);
      } catch (err) {
        console.error('Failed to fetch posts or answers', err);
      }
    };

    if (currentUserId) {
      fetchMyPosts();
    }
  }, [currentUserId]);

  if (!currentUserId) {
    return <div className="not-logged-in">Please log in to view your Answered Posts.</div>;
  }

  return (
    <div className="answered-container">
  <h1>My Answered Posts</h1>

  <div className="post-list">
    {answeredPosts.length === 0 ? (
      <p>No answered posts yet.</p>
    ) : (
      answeredPosts.map(post => (
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
              <p><strong>✍️ Posted By:</strong> {post.postedBy?.name || "Anonymous"}</p>
              <p><strong>💬 Answers:</strong> {post.answerCount || 0}</p>
              <p><strong>🕒 Posted On:</strong> {new Date(post.createdAt).toLocaleString()}</p>
            </div>
            <div className="column button-column">
              <button className="viewpostbutton" onClick={() => navigate(`/showPost/${post._id}`)}>View Post</button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>

  );
};

export default Answered;
