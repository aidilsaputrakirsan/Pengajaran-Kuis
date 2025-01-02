import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Leaderboard = () => {
  const [topParticipants, setTopParticipants] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedMK = query.get('mk');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL, {
        params: {
          action: 'leaderboard',
          mk: selectedMK,
        },
      });
      console.log('Leaderboard response:', response.data);
      if (Array.isArray(response.data)) {
        setTopParticipants(response.data);
      } else {
        alert(response.data.error || 'Data leaderboard tidak valid.');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      alert('Terjadi kesalahan saat mengambil leaderboard.');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Papan Peringkat {selectedMK ? `- ${selectedMK}` : ''}
      </h2>
      {topParticipants.length === 0 ? (
        <p>Belum ada data leaderboard.</p>
      ) : (
        <ul className="space-y-2">
          {topParticipants.map((participant, index) => (
            <li key={participant.id} className="flex items-center space-x-4">
              <span className="text-yellow-500 text-2xl">
                {index === 0 && '🥇'}
                {index === 1 && '🥈'}
                {index === 2 && '🥉'}
              </span>
              <span className="flex-1">{participant.name}</span>
              <span className="font-bold">{participant.score} poin</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
