// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PreTest from './pages/PreTest';
import PostTest from './pages/PostTest';
import Summary from './pages/Summary';
import Register from './pages/Register';
import QuizProvider from './context/QuizContext';

function App() {
  return (
    <QuizProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pre-test" element={<PreTest />} />
            <Route path="/post-test" element={<PostTest />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}

export default App;
