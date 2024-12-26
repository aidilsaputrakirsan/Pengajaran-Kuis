// Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { v4 as uuidv4 } from 'uuid'; // Menggunakan UUID untuk ID unik

const Register = () => {
  const [name, setName] = useState('');
  const { setUser } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const participantId = uuidv4();
    const userData = { id: participantId, name };
    setUser(userData);

    // Kirim data ke API
    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const dataToSend = {
      participantId: participantId,
      name: name,
      testType: 'register', // Jenis test 'register'
      score: 0,
      timeTaken: '0:00',
      apiKey: API_KEY
    };

    console.log('Sending data:', dataToSend); // Logging data

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();
      console.log('Response:', result); // Logging respons

      if (result.status === 'success') {
        navigate('/'); // Navigasi ke halaman Home setelah berhasil
      } else {
        alert('Gagal mendaftar. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mendaftar.');
    }
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
