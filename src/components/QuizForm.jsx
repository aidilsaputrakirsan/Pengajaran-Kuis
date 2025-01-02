import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { QuizContext } from '../context/QuizContext';

const QuizForm = ({ testType, selectedMK }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(15);
  const [completed, setCompleted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const { user } = useContext(QuizContext); // user.id

  // Ambil soal
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!completed && !isTimeUp) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      if (timer <= 0) {
        clearInterval(intervalId);
        setIsTimeUp(true);
      }

      return () => clearInterval(intervalId);
    }
  }, [timer, completed, isTimeUp]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL, {
        params: {
          action: 'getQuestions',
          mk: selectedMK,
        },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Terjadi kesalahan saat mengambil pertanyaan.');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    if (!answer && !isTimeUp) {
      alert('Silakan pilih jawaban atau tunggu waktu habis!');
      return;
    }
    // simpan jawaban
    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        answer: answer || 'Tidak dijawab',
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer('');
      setTimer(15);
      setIsTimeUp(false);
    } else {
      setCompleted(true);
    }
  };

  const handleSubmit = async () => {
    // Kirim jawaban ke Apps Script
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL, {
        params: {
          action: 'submitAnswers',
          participantId: user.id,
          testType,
          mk: selectedMK,
          answers: JSON.stringify(answers),
          apiKey: import.meta.env.VITE_API_KEY,
        },
      });
      if (response.data.status === 'success') {
        alert(`Kuis selesai! Skor: ${response.data.score}`);
        // IMPORTANT: Tambahkan '/Pengajaran-Kuis' agar valid di GH Pages
        window.location.href = `/Pengajaran-Kuis/leaderboard?mk=${encodeURIComponent(selectedMK)}`;
      } else {
        alert('Gagal menyimpan jawaban. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban.');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        {testType} - {selectedMK}
      </h3>
      {completed ? (
        <div>
          <p>Anda telah menyelesaikan kuis!</p>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Lihat Leaderboard
          </button>
        </div>
      ) : currentQuestion ? (
        <div>
          <p>{currentQuestion.question}</p>
          <ul className="space-y-1 mt-2">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <li key={key}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={key}
                    checked={answer === key}
                    onChange={handleAnswerChange}
                    disabled={isTimeUp}
                  />
                  {` ${key}. ${value}`}
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-2">Waktu: {timer}s</p>
          <button
            onClick={handleNextQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4"
            disabled={!answer && !isTimeUp}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Selesai' : 'Next'}
          </button>
        </div>
      ) : (
        <p>Memuat soal...</p>
      )}
    </div>
  );
};

export default QuizForm;
