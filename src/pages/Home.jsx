import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const availableMK = ['Matematika Diskrit', 'Pemrograman Web', 'Komputasi Awan']

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Selamat Datang di Aplikasi Kuis Interaktif</h2>
      <p className="mb-6">Silakan pilih Mata Kuliah (MK) dan jenis kuis yang ingin Anda ikuti:</p>
      <div className="space-y-4">
        {availableMK.map((mk, index) => (
          <div key={index} className="flex justify-center space-x-4">
            <Link to={`/pre-test?mk=${encodeURIComponent(mk)}`}>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Pre-test {mk}
              </button>
            </Link>
            <Link to={`/post-test?mk=${encodeURIComponent(mk)}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Post-test {mk}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
