import "./App.css";
import HomePage from "./HomePage";
import AllDestinations from "@/Components/AllDestinations/AllDestinations.jsx";
import AllTuristDestinations from "@/Components/AllTuristDestinations/AllTuristDestinations.jsx";
import ProvinceDetails from "@/Components/Cities/ProvinceDetails.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import Dashboard from "./Dashboard/Dashboard";
import HeroDashboard from "./Dashboard/HeroDashboard";
import AboutDashboard from "./Dashboard/AboutDashboard";
import TreasuresDashboard from "./Dashboard/TreasuresDashboard";
import ToursDashboard from "./Dashboard/ToursDashboard";
import OffersDashboard from "./Dashboard/OffersDashboard";
import ContactDashboard from "./Dashboard/ContactDashboard";
import BookingsDashboard from "./Dashboard/BookingsDashboard";
import InboxDashboard from "./Dashboard/InboxDashboard";
import TestimonialsDashboard from "./Dashboard/TestimonialsDashboard";
import UsersDashboard from "./Dashboard/UsersDashboard";
import GeneralSettingsDashboard from "./Dashboard/GeneralSettingsDashboard";
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
            <Route
              path="/all-turistDestinations"
              element={<AllTuristDestinations />}
            />

            {/* المسار الديناميكي للمحافظات */}
            <Route path="/province/:id" element={<ProvinceDetails />} />
          </Route>
          <Route path="/admin/dashboard" element={<Dashboard />}>
            {/*   <Route index element={<OverviewDashboard />} />*/}
            <Route path="hero" element={<HeroDashboard />} />
            <Route path="about" element={<AboutDashboard />} />
            <Route path="treasures" element={<TreasuresDashboard />} />
            <Route path="tours" element={<ToursDashboard />} />
            <Route path="offers" element={<OffersDashboard />} />
            <Route path="contact-info" element={<ContactDashboard />} />
            <Route path="bookings" element={<BookingsDashboard />} />
            <Route path="messages" element={<InboxDashboard />} />
            <Route path="reviews" element={<TestimonialsDashboard />} />
            <Route path="users" element={<UsersDashboard />} />
            <Route path="settings" element={<GeneralSettingsDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
