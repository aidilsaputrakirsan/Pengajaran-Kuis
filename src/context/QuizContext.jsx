// src/context/QuizContext.jsx
import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preTestScore, setPreTestScore] = useState(0);
  const [postTestScore, setPostTestScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [results, setResults] = useState({});

  return (
    <QuizContext.Provider value={{
      user, setUser,
      preTestScore, setPreTestScore,
      postTestScore, setPostTestScore,
      leaderboard, setLeaderboard,
      results, setResults
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
