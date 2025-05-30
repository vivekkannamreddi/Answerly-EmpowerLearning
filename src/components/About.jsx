import React from 'react'
import { assets } from '../assets/assets'
import './About.css'

const About = () => {
  return (
    <div className='aboutMain'>
        <div className="upperImage">
            <div className="image">
                <h1>📚 Explore All Posts – Learn, Share, and Grow</h1>
                <img src={assets.posts} alt="" />
            </div>
            <div className="content">
                
                <p>Welcome to the All Posts section! Here, you'll find a growing collection of questions and answers across various subjects like Programming, Web Development, Databases, Algorithms, and more. Each post is tagged with difficulty, subject, and topic to help you quickly find relevant content. Whether you're here to get help, contribute solutions, or just learn something new—this is your knowledge hub. Dive in, filter by your interests, and become a part of the learning community!</p>
            </div>
        </div>
        <div className="belowImage">
            <div className="image2">
                <h1>📝 Post Details & Community Answers</h1>
                <img src={assets.showpost} alt="" />
            </div>
            <div className="content">
                <p>This section displays the full details of the selected question along with all the answers shared by the community. You can read through different perspectives, vote for helpful responses, and contribute your own insights. If you're the author of an answer, you can edit or delete it anytime to keep your contribution up-to-date and accurate. Learning is collaborative—feel free to engage, refine, and share knowledge!</p>
            </div>
        </div>
    </div>
  )
}

export default About