// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between">
      <h1 className="text-white text-xl font-bold">Aplikasi Kuis Interaktif</h1>
      <div>
        <Link to="/register">
          <button className="bg-green-500 text-white px-3 py-1 rounded">Daftar</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
