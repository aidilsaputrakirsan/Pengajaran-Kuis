// Results.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const [results, setResults] = useState({ preTestScore: 0, postTestScore: 0 });
  const [name, setName] = useState('');
  const [selectedMK, setSelectedMK] = useState('');
  const location = useLocation();

  // Mendapatkan query params
  const query = new URLSearchParams(location.search);
  const participantId = query.get('id'); // Pastikan Anda menambahkan query param 'id' saat navigasi
  const mk = query.get('mk');

  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            action: 'getResults',
            participantId: participantId,
            mk: mk,
            apiKey: API_KEY
          }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
        alert('Terjadi kesalahan saat mengambil hasil.');
      }
    };

    if (participantId && mk) {
      fetchResults();
    }
  }, [participantId, mk, API_URL, API_KEY]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-2xl font-semibold mb-4">Hasil Kuis Anda</h2>
      <p className="mb-2"><strong>Nama:</strong> {name}</p>
      <p className="mb-2"><strong>MK:</strong> {mk}</p>
      <p className="mb-2"><strong>Pre-test Score:</strong> {results.preTestScore}</p>
      <p className="mb-2"><strong>Post-test Score:</strong> {results.postTestScore}</p>
    </div>
  );
};

export default Results;
