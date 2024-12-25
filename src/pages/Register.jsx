// src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { v4 as uuidv4 } from 'uuid'; // Menggunakan UUID untuk ID unik

const Register = () => {
  const [name, setName] = useState('');
  const { setUser } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const participantId = uuidv4();
    setUser({ id: participantId, name });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Pendaftaran Peserta</h2>
      <div className="mb-4">
        <label className="block mb-2">Nama:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Daftar
      </button>
    </form>
  );
};

export default Register;
