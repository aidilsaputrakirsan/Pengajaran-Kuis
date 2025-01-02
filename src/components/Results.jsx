import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Results = ({ selectedMK }) => {
  const [results, setResults] = useState({ preTestScore: 0, postTestScore: 0 });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const participantId = query.get('id'); // ID user dari URL

  useEffect(() => {
    if (participantId) {
      fetchResults(participantId);
    }
  }, [participantId]);

  const fetchResults = async (id) => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL, {
        params: {
          action: 'getResults',
          participantId: id,
          mk: selectedMK,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
      alert('Terjadi kesalahan saat mengambil hasil.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-2xl font-semibold mb-4">Hasil Kuis Anda</h2>
      <p className="mb-2">
        <strong>MK:</strong> {selectedMK}
      </p>
      <p className="mb-2">
        <strong>Pre-test Score:</strong> {results.preTestScore}
      </p>
      <p className="mb-2">
        <strong>Post-test Score:</strong> {results.postTestScore}
      </p>
    </div>
  );
};

export default Results;
