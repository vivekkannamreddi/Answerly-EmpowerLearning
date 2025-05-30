import React from 'react'
import Hero from './Hero'
import Footer from './Footer'
import CustomCollapse from './Collapse';
import About from './About'


const Landing = () => {
  return (
    <div>
        <Hero/>
        <About/>
        <CustomCollapse/> 
        <Footer/>
    </div>
  )
}

export default Landing