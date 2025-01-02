import React, { useContext, useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { QuizContext } from '../context/QuizContext'
import QuizForm from '../components/QuizForm'

const PreTest = () => {
  const { user } = useContext(QuizContext)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const mk = queryParams.get('mk') || ''

  useEffect(() => {
    if (!user) {
      navigate('/register')
    }
  }, [user, navigate])

  if (!mk) {
    return (
      <p className="text-center">
        MK tidak dipilih. Kembali ke <Link to="/">Home</Link>.
      </p>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pre-test {mk}</h2>
      <QuizForm testType="Pre-test" selectedMK={mk} />
    </div>
  )
}

export default PreTest
