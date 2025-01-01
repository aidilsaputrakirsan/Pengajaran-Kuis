// QuizForm.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const QuizForm = ({ testType, selectedMK }) => {
  const { user, setPreTestScore, setPostTestScore } = useContext(QuizContext);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
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
            apiKey: API_KEY,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Terjadi kesalahan saat mengambil pertanyaan.');
      }
    };

    fetchQuestions();
  }, [selectedMK, testType, API_URL, API_KEY]);

  const handleChange = (e, questionId) => {
    setAnswers({
      ...answers,
      [questionId]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) score += 1;
    });

    const resultData = {
      participantId: user.id,
      name: user.name,
      testType,
      score,
      apiKey: API_KEY,
    };

    try {
      await axios.post(API_URL, resultData);
      navigate(`/summary?mk=${encodeURIComponent(selectedMK)}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((q) => (
        <div key={q.id}>
          <p>{q.question}</p>
          {Object.entries(q.options).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={key}
                onChange={(e) => handleChange(e, q.id)}
                required
              />
              {value}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizForm;
