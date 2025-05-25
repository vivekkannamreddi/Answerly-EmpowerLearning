import React from 'react'
import './Hero.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='hero-root'>
      <div className="hero-content">
        <h1>Empower Learning Through Questions and Answers</h1>
        <p>
          Answerly is a collaborative platform where students ask doubts,<br />
          share knowledge, and earn points for helping each other. Whether it's a tricky<br />
          math problem or a tough concept, get answers, build streaks, and grow together as a <br />
          <b>learning community</b>.
        </p>
        <div className="button">
            <button className='getstartedbtn' onClick={() => navigate('/signup')}>
                <b>Get Started..</b>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
