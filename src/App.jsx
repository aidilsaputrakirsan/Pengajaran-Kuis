// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import PreTest from './pages/PreTest';
import PostTest from './pages/PostTest';
import Summary from './pages/Summary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pre-test" element={<PreTest />} />
          <Route path="/post-test" element={<PostTest />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
