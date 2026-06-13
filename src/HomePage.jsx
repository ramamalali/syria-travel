import './App.css'
import Navbar from "@/Components/Navbar/Navbar.jsx";
import Hero from "@/Components/Hero/Hero.jsx";
import AboutUs from "@/Components/AboutUs/AboutUs.jsx";
import Destinations from "@/Components/Destinations/Destinations.jsx";


function HomePage() {
  return (
    <>
   <Navbar/>
   <Hero/>
   <AboutUs/>
   <Destinations/>
   </>
  )
}

export default HomePage