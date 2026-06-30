import './App.css'
import HomePage from './HomePage'
import AllDestinations from '@/Components/AllDestinations/AllDestinations.jsx'
import AllTuristDestinations from '@/Components/AllTuristDestinations/AllTuristDestinations.jsx'
import ProvinceDetails from '@/Components/Cities/ProvinceDetails.jsx'
import MainLayout from './Layouts/MainLayout.jsx';

import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>

      <BrowserRouter basename="/syria-travel">
        <Routes>
       <Route path="/" element={<MainLayout />}>
          
          {/* الصفحة الرئيسية للموقع */}
          <Route index element={<HomePage />} />

          
          {/* صفحة مشاهدة كل المحافظات */}
          <Route path="/all-destinations" element={<AllDestinations />} />
          
          {/* صفحة كل الرحلات السياحية */}
          <Route path="/all-turistDestinations" element={<AllTuristDestinations />} />
          
          {/* المسار الديناميكي للمحافظات */}
          <Route path="/province/:id" element={<ProvinceDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;