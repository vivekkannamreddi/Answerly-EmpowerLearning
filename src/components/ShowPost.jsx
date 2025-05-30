import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import API from '../api.js';
import { useAuth } from '../AuthContext.jsx'; 
import '../pages/posts/Posts.css';
import './ShowPost.css';

const ShowPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userDetails } = useAuth(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [sending, setSending] = useState(false);
  const [answers, setAnswers] = useState([]);
  const currentUserId = userDetails?.id;
  const {token} = useAuth()
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingAnswerText, setEditingAnswerText] = useState('');

  useEffect(() => {   
    fetchPost();
  }, [id]);



  const fetchPost = () => {
    setLoading(true);
    API.get(`/auth/posts/${id}`)
      .then(res => {
        setPost(res.data.post);
        setAnswers(res.data.answers);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch post:', err);
        setLoading(false);
      });
  };

 const handleDelete = async (AnsId) => {
  try {
    await API.delete(`/auth/answers/${AnsId}`, {headers: {Authorization: `Bearer ${token}`}});
    setAnswers(answers.filter(ans => ans._id !== AnsId));
  } catch (err) {
    console.error('Failed to delete answer', err);
  }
};
const handleEdit = (AnsId) => {
  const answerToEdit = answers.find(ans => ans._id === AnsId);
  setEditingAnswerId(AnsId);
  setEditingAnswerText(answerToEdit?.content || '');
};


const handleUpdateAnswer = async () => {
  if (!editingAnswerText.trim()) return;
  try {
    await API.put(`/auth/answers/${editingAnswerId}`, {
      content: editingAnswerText,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setEditingAnswerId(null);
    setEditingAnswerText('');
    fetchPost();
  } catch (err) {
    console.error('Failed to update answer', err);
  }
};




  const handleSubmitAnswer = async() => {
    if (!answerText.trim()) return;
    if (!userDetails) {
      alert('You need to be logged in to submit an answer.');
      return;
    }

    setSending(true);
    await API.post(`/auth/posts/${id}/answer`, { content: answerText, userId: userDetails.id })
      .then(() => {
        setAnswerText('');
        setShowAnswerBox(false);
        fetchPost(); 
      })
      .catch(err => {
        console.error('Error submitting answer:', err);
      })
      .finally(() => {
        setSending(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="posts-container">
      <h1>Post Details</h1>

      <div className="post-card">
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
            <p><strong>💬 Answers:</strong> {answers.length}</p>
            <p><strong>🕒 Posted On:</strong> {new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <button className="answer-btn" onClick={() => setShowAnswerBox(!showAnswerBox)}>
        {showAnswerBox ? 'Cancel' : 'Answer It'}
      </button>

      {showAnswerBox && (
        <div className="answer-form">
          <textarea
            placeholder="Write your answer here..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
          <button onClick={handleSubmitAnswer} disabled={sending}>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      )}

      <div className="answers-section">
        <h3>Answers</h3>
        {answers.length === 0 ? (
          <p>No answers yet.</p>
        ) : (
          answers.map((ans, index) => (
            <div key={index} className="answer-box">
              {editingAnswerId === ans._id ? (
                    <>
                      <textarea
                        value={editingAnswerText}
                        style={{border:'none',width:'100%',marginBottom:'10px'}}
                        onChange={(e) => setEditingAnswerText(e.target.value)}
                      />
                      <button onClick={handleUpdateAnswer}>Update</button>
                      <button onClick={() => setEditingAnswerId(null)}>Cancel</button>
                    </>
                  ) : (
                    <p>{ans.content}</p>
                  )}

              <p className="answered-by">— {ans.answeredBy?.username || 'Anonymous'}</p>
              {ans.answeredBy?._id === currentUserId && (
                <>
              <button onClick={() => handleDelete(ans._id)}className='deletepostbutton'>Delete</button>
              <button onClick={() => handleEdit(ans._id)}className='viewpostbutton' style={{marginLeft:'10px'}}>Edit</button></>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowPost;
