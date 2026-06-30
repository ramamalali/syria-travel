import './App.css'

import Hero from "@/Components/Hero/Hero.jsx";
import AboutUs from "@/Components/AboutUs/AboutUs.jsx";
import Destinations from "@/Components/Destinations/Destinations.jsx";
 import TuristDestinations from "@/Components/TuristDestinations/TuristDestinations.jsx"; 
import SpecialOffers from "@/Components/SpecialOffers/SpecialOffers.jsx";
import Testimonials from "@/Components/Testimonials/Testimonials.jsx";
import ContactUs from "@/Components/ContactUs/ContactUs.jsx";



function HomePage() {
  return (
    <>


   <Hero/>
   <AboutUs/>
   <Destinations/>  
 <TuristDestinations/> 
   <SpecialOffers/>
   <Testimonials/>
   <ContactUs/>

   </>
  )
}

export default HomePage