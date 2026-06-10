import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
      "@Components": fileURLToPath(new URL('./src/Components', import.meta.url)),
      '@Navbar': fileURLToPath(new URL('./src/Components/Navbar/Navbar.jsx', import.meta.url)),
      '@Hero': fileURLToPath(new URL('./src/Components/Hero/Hero.jsx', import.meta.url)),
      '@AboutUs': fileURLToPath(new URL('./src/Components/AboutUs/AboutUs.jsx', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    }
  }
})