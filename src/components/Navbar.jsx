import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const tokenAnswerly = localStorage.getItem('tokenAnswerly');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('tokenAnswerly');
    localStorage.removeItem('userAnswerly');
    navigate('/');
  };

  return (
    <>
      <div className='navbar-main-container'>
        <div className="nav-sections left-right left">
          <h1 onClick={() => navigate('/')}>Answerly</h1>
        </div>

        <div className="nav-sections middle desktop-menu">
          <p className='nav-elements' onClick={() => navigate('/posts')}>Posts</p>
          <p className='nav-elements'>My-doubts</p>
          <p className='nav-elements'>Answered</p>
        </div>

        <div className="nav-sections left-right right desktop-menu">
          {tokenAnswerly ? (
            <a className='nav-elements' onClick={handleLogout}>Log Out</a>
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
          <p className='nav-elements'>Posts</p>
          <p className='nav-elements'>My-doubts</p>
          <p className='nav-elements'>Answered</p>
          {tokenAnswerly ? (
            <a className='nav-elements' onClick={handleLogout}>Log Out</a>
          ) : (
            <>
              <Link className='nav-elements color' to="/signup">Sign Up</Link>
              <Link className='nav-elements color'  to="/login">Log In</Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
