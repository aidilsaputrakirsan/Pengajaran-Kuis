import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import PreTest from './pages/PreTest'
import PostTest from './pages/PostTest'
import Summary from './pages/Summary'
import Leaderboard from './components/Leaderboard'
import QuizProvider from './context/QuizContext'

function App() {
  return (
    <QuizProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pre-test" element={<PreTest />} />
            <Route path="/post-test" element={<PostTest />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  )
}

export default App
