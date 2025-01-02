import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Pengajaran-Kuis/' : '/', // Gunakan base hanya di produksi
  plugins: [react()],
});
