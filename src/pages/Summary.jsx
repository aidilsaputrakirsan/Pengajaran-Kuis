// src/pages/Summary.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Results from '../components/Results';
import Leaderboard from '../components/Leaderboard';

const Summary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mk = queryParams.get('mk');

  if (!mk) {
    return <p className="text-center">MK tidak dipilih. Kembali ke <Link to="/">Home</Link>.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Summary Kuis {mk}</h2>
      <Results selectedMK={mk} />
      <Leaderboard selectedMK={mk} />
    </div>
  );
};

export default Summary;
