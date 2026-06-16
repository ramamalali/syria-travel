
import './App.css'
import HomePage from './HomePage'
import AllDestinations from '@/Components/AllDestinations/AllDestinations.jsx'

import { BrowserRouter, Routes, Route } from "react-router";
function App() {


  return (
        <>
      <BrowserRouter>
    <Routes>
      <Route path="syria-travel/" element={<   HomePage />} />
      <Route path="all-destinations" element={<   AllDestinations />} />
    </Routes>
  </BrowserRouter>,


    </>
  )
}

export default App
