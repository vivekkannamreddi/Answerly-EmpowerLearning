import React from 'react';
import './Profile.css';
import Button from '@mui/material/Button';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const { userDetails } = useAuth();

  if (!userDetails) {
    return <div className='profileMain'>Loading profile...</div>; // optional loading message
  }

  const handleEdit = () => {
    alert('Edit profile functionality');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      alert('Account deleted');
    }
  };

  return (
    <div className='profileMain'>
      <div className="innerContainer">
        <div className="headerSection">
          <h1>My Profile</h1>
        </div>

        <div className="bodySection">
          <div className="infoRow">
            <span className="label">Username:</span>
            <span className="value">{userDetails.username}</span>
          </div>

          <div className="infoRow">
            <span className="label">Email:</span>
            <span className="value">{userDetails.email}</span>
          </div>

          <div className="infoRow">
            <span className="label">Streak:</span>
            <span className="value">{userDetails.streak} days</span>
          </div>

          <div className="infoRow">
            <span className="label">Posts:</span>
            <span className="value">{userDetails.posts} posts</span>
          </div>

          <div className="infoRow">
            <span className="label">Created At:</span>
            <span className="value">{new Date(userDetails.createdAt).toDateString()}</span>
          </div>

          <div className="buttonGroup">
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit Account
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
