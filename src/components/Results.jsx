// src/components/Results.jsx
import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import axios from 'axios';

const Results = ({ selectedMK }) => {
  const { user } = useContext(QuizContext);
  const [results, setResults] = useState({ preTestScore: 0, postTestScore: 0 });
  const API_URL = 'https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_API_URL/exec';
  const API_KEY = 'YOUR_SECURE_API_KEY';

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            action: 'getResults',
            participantId: user.id,
            mk: selectedMK,
            apiKey: API_KEY
          }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
        alert('Terjadi kesalahan saat mengambil hasil kuis.');
      }
    };

    fetchResults();
  }, [selectedMK, user.id]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Hasil Kuis</h2>
      <p><strong>Nama:</strong> {user.name}</p>
      <p><strong>Pre-test Skor:</strong> {results.preTestScore}</p>
      <p><strong>Post-test Skor:</strong> {results.postTestScore}</p>
      <p><strong>Total Benar:</strong> {results.preTestScore + results.postTestScore}</p>
    </div>
  );
};

export default Results;
