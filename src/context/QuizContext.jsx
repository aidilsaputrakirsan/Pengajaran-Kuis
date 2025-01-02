import React, { createContext, useState } from 'react'

export const QuizContext = createContext()

const QuizProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <QuizContext.Provider value={{ user, setUser }}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider
