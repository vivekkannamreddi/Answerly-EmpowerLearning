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

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
    <div className='app'>
        <Navbar/>
        <Routes>  
          <Route path="/" element={<Hero />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/posts" element={<Posts />} />
          <Route path="/create" element={<CreatePost/>} />
        </Routes>
    </div>
    </AuthProvider>
  )
}

export default App
