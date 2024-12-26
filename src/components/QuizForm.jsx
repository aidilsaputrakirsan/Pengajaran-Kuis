// QuizForm.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const QuizForm = ({ testType, selectedMK }) => {
  const { user, setPreTestScore, setPostTestScore } = useContext(QuizContext);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeTaken, setTimeTaken] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(600); // 10 menit dalam detik
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            action: 'getQuestions',
            mk: selectedMK,
            test: testType,
            apiKey: API_KEY
          }
        });
        setQuestions(response.data);
        setStartTime(Date.now());
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Terjadi kesalahan saat mengambil pertanyaan. Silakan coba lagi nanti.');
      }
    };

    fetchQuestions();
  }, [selectedMK, testType, API_URL, API_KEY]);

  useEffect(() => {
    if (timer <= 0) {
      handleSubmit();
      return;
    }

    const countdown = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (e, questionId) => {
    setAnswers({
      ...answers,
      [questionId]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const endTime = Date.now();
    const duration = Math.floor((endTime - startTime) / 1000); // dalam detik
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    setTimeTaken(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

    // Penilaian sederhana
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    if (testType === 'pre') {
      setPreTestScore(score);
    } else {
      setPostTestScore(score);
    }

    // Kirim hasil ke backend
    const resultData = {
      participantId: user.id,
      name: user.name,
      testType: testType === 'pre' ? 'Pre-test' : 'Post-test', // 'Pre-test' atau 'Post-test'
      score: score,
      timeTaken: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`,
      apiKey: API_KEY
    };

    console.log('Sending quiz result:', resultData); // Logging data

    try {
      const response = await axios.post(API_URL, resultData);
      console.log('Hasil kuis berhasil dikirim:', response.data); // Logging respons
      navigate(`/summary?mk=${encodeURIComponent(selectedMK)}`);
    } catch (error) {
      console.error('Error mengirim hasil kuis:', error);
      alert('Terjadi kesalahan saat mengirim hasil kuis.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-end">
        <span className="text-red-500 font-bold">
          Waktu: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
        </span>
      </div>
      {questions.map(q => (
        <div key={q.id} className="border p-4 rounded">
          <p className="font-semibold">{q.question}</p>
          <div className="mt-2">
            {Object.entries(q.options).map(([key, value]) => (
              <label key={key} className="block">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={key}
                  onChange={(e) => handleChange(e, q.id)}
                  required
                  className="mr-2"
                />
                {key}. {value}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit {testType === 'pre' ? 'Pre-test' : 'Post-test'}
      </button>
    </form>
  );
};

export default QuizForm;
