// src/components/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = ({ selectedMK }) => {
  const [topParticipants, setTopParticipants] = useState([]);
  const API_URL = 'https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_API_URL/exec';
  const API_KEY = 'YOUR_SECURE_API_KEY';

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            action: 'leaderboard',
            mk: selectedMK,
            apiKey: API_KEY
          }
        });
        setTopParticipants(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        alert('Terjadi kesalahan saat mengambil leaderboard.');
      }
    };

    fetchLeaderboard();
  }, [selectedMK]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Papan Peringkat</h2>
      <ul className="space-y-2">
        {topParticipants.map((participant, index) => (
          <li key={participant.id} className="flex items-center space-x-4">
            <span className="text-yellow-500 text-2xl">
              {index === 0 && '🥇'}
              {index === 1 && '🥈'}
              {index === 2 && '🥉'}
            </span>
            <span className="flex-1">{participant.name}</span>
            <span className="font-bold">{participant.score} Benar</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
