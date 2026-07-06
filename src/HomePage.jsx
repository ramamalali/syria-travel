import './App.css'
import { useState, useEffect } from "react";
import Hero from "@/Components/Hero/Hero.jsx";
import AboutUs from "@/Components/AboutUs/AboutUs.jsx";
import Destinations from "@/Components/Destinations/Destinations.jsx";
 import TuristDestinations from "@/Components/TuristDestinations/TuristDestinations.jsx"; 
import SpecialOffers from "@/Components/SpecialOffers/SpecialOffers.jsx";
import Testimonials from "@/Components/Testimonials/Testimonials.jsx";
import ContactUs from "@/Components/ContactUs/ContactUs.jsx";



function HomePage() {
const [lang, setLang] = useState(() => localStorage.getItem("site_lang") || "ar");

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem("site_lang") || "ar");
    };

    // الاستماع للحدث المخصص الجديد بدلاً من storage
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);
  return (
    <>

<div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-background transition-all duration-300">
   <Hero/>
   <AboutUs/>
   <Destinations/>  
 <TuristDestinations/> 
   <SpecialOffers/>
   <Testimonials/>
   <ContactUs/>
</div>
   </>
  )
}

export default HomePage