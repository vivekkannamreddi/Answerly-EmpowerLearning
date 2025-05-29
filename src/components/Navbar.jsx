import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { assets } from '../assets/assets.js';

const Navbar = () => {
  const navigate = useNavigate();
  const tokenAnswerly = localStorage.getItem('tokenAnswerly');
  const [isOpen, setIsOpen] = useState(false);
  const { logout ,refreshUser } = useAuth();
  const [click , setClick] = useState(false)

  const profileClickHandler=()=>{
    setClick(!click)
  }
  const handleLogout = () => {
    logout();
    setIsOpen(false); 
    setClick(false)// Close menu on logout
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // Close menu on nav click
  };

  return (
    <>
      <div className='navbar-main-container'>
        <div className="nav-sections left-right left">
          <h1 onClick={() => handleNavigate('/')}>Answerly</h1>
        </div>

        <div className="nav-sections middle desktop-menu">
          <p className='nav-elements' onClick={() => handleNavigate('/posts')}>Posts</p>
          <p className='nav-elements' onClick={() => handleNavigate('/mydoubts')}>My-doubts</p>
          <p className='nav-elements' onClick={() => handleNavigate('/answered')}>Answered</p>
        </div>

        <div className="nav-sections left-right right desktop-menu">
          {tokenAnswerly ? (
            <div className='profileButton'>
              <img src={assets.profile_image} onClick={profileClickHandler} alt="Profile" className="profileImage" />
              {click && (
                <div className="profileDropdown">
                  <ul>
                    
                    <li onClick={()=>{navigate('/profile');refreshUser();setClick(false)}}>Profile</li>
                    <li onClick={()=>{navigate('/about');setClick(false)}}>About</li>
                    <li onClick={handleLogout}>Log Out</li>
                    
                  </ul>
                </div>
              )}
            </div>

          ) : (
            <>
              <Link className='nav-elements' to="/signup">Sign Up</Link>
              <Link className='nav-elements' to="/login">Log In</Link>
            </>
          )}
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <p className='nav-elements' onClick={() => handleNavigate('/posts')}>Posts</p>
          <p className='nav-elements' onClick={() => handleNavigate('/mydoubts')}>My-doubts</p>
          <p className='nav-elements' onClick={() => handleNavigate('/answered')}>Answered</p>
          {tokenAnswerly ? (
            <div className='profileButton'>
              
              <a className='nav-elements' onClick={handleLogout}>Log Out</a>
            </div>
          ) : (
            <>
              <Link className='nav-elements color' to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
              <Link className='nav-elements color' to="/login" onClick={() => setIsOpen(false)}>Log In</Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
