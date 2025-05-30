import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Signup from './components/Signup'
import Login from './components/Login'
import { AuthProvider } from './AuthContext'
import Posts from './pages/posts/Posts.jsx'
import CreatePost from './components/CreatePost'
import ShowPost from './components/ShowPost.jsx'
import MyDoubts from './pages/my-doubts/MyDoubts.jsx'
import Answered from './pages/answered/Answered.jsx'
import Profile from './components/Profile.jsx'
import Edit from './components/Edit.jsx'
import Landing from './components/Landing.jsx'

function App() {

  return (
    <AuthProvider>
    <div className='app'>
        <Navbar/>
        <Routes>  
          <Route path="/" element={<Landing />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/posts" element={<Posts />} />
          <Route path="/mydoubts" element={<MyDoubts />} />
          <Route path="/answered" element={<Answered />} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/showPost/:id" element={<ShowPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<Hero />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
    </div>
    </AuthProvider>
  )
}

export default App
