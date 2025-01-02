import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Pengajaran-Kuis/', // Sesuai nama repo GitHub
  plugins: [react()],
})
