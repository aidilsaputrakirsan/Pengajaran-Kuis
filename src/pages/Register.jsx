import React, { useState, useContext } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { QuizContext } from '../context/QuizContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const { setUser } = useContext(QuizContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      alert('Nama tidak boleh kosong!')
      return
    }

    const participantId = uuidv4()
    setUser({ id: participantId, name: name.trim() })

    const API_URL = import.meta.env.VITE_API_URL
    const API_KEY = import.meta.env.VITE_API_KEY

    console.log('API_URL:', API_URL)
    console.log('API_KEY:', API_KEY)

    // Kirim data via GET param
    try {
      const resp = await axios.get(API_URL, {
        params: {
          action: 'register',
          apiKey: API_KEY,
          participantId: participantId,
          name: name.trim()
        }
      })
      console.log('Response:', resp.data)

      if (resp.data.status === 'success') {
        alert('Berhasil mendaftar!')
        navigate('/')
      } else {
        alert(resp.data.error || 'Gagal mendaftar.')
      }
    } catch (err) {
      console.error('Register Error:', err)
      alert('Terjadi kesalahan saat mendaftar.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Pendaftaran Peserta</h2>
      <div className="mb-4">
        <label>Nama:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Daftar
      </button>
    </form>
  )
}

export default Register
