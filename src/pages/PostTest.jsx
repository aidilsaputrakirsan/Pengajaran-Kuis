// src/pages/PostTest.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QuizForm from '../components/QuizForm';
import { QuizContext } from '../context/QuizContext';

const PostTest = () => {
  const { user } = useContext(QuizContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mk = queryParams.get('mk');

  useEffect(() => {
    if (!user) {
      navigate('/register');
    }
  }, [user, navigate]);

  if (!mk) {
    return <p className="text-center">MK tidak dipilih. Kembali ke <Link to="/">Home</Link>.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Post-test {mk}</h2>
      <QuizForm testType="post" selectedMK={mk} />
    </div>
  );
};

export default PostTest;
