import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='FooterMain'>
        <hr />
        <div className="FooterFirstContainer">
            <div className="FFCLeft">
                <h1>Answerly</h1>
                <p>A collaborative platform to ask, answer, and grow together.</p>
            </div>
        </div>
        <hr />
        <div className="FooterSecondContainer">
            <div className="FSCLeft">
                <h2>📂 Explore</h2>
                <ul>
                    <li>DoubtPosts</li>
                    <li>My Doubts</li>
                    <li>Answered Doubts</li>
                    <li>Cleared Doubts</li>
                </ul>
            </div>
            <div className="FSCMiddle">
                <h2>🛠 Resources</h2>
                <ul>
                    <li>FAQ</li>
                    <li>Help Center</li>
                    <li>Community Guidelines</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="FSCRight">
                <h2>📬 Contact</h2>
                <ul>
                    <li>Email: vivekkannamreddi@gmail.com</li>
                    <li><a href="https://github.com/vivekkannamreddi">GitHub: vivekkannamreddi</a></li>
                    <li><a href="https://www.linkedin.com/in/vivekkannamreddi/">Linkedin: vivekkannamreddi</a></li>
                    <li>Feedback Form: Send Feedback</li>
                </ul>
            </div>
        </div>
        <hr />  
        <div className="FooterThirdContainer">
            <p>© 2025 Answerly. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer