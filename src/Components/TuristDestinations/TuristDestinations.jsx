
import { useState } from 'react';
import { Link } from "react-router";
import BookingModal from '@/Components/BookingModal/BookingModal.jsx';
import { toursSectionData } from "@/constants";

function TuristDestinations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleCardClick = (destinationName) => {
    setSelectedDestination(destinationName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDestination("");
  };

  // ترشيح الرحلات المميزة للرئيسية فقط
  const featuredTours = toursSectionData.items.filter(item => item.featured);

  return (
    <>
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id="turistdestinations">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4 leading-tight">
              {toursSectionData.title}
            </h2>
            <p className="text-on-surface-variant">{toursSectionData.description}</p>
          </div>
          <Link 
            to="/all-turistDestinations" 
            className="text-secondary font-label-md text-label-md flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <span>{toursSectionData.viewAllText}</span>
            <span className="material-symbols-outlined">arrow_left</span>
          </Link>
        </div>

        {/* شبكة الكروت */}
        <div className="grid grid-cols-12 gap-6">
          {featuredTours.map((tour) => (
            <div 
              key={tour.id}
              onClick={() => handleCardClick(tour.bookingName)} 
              className={`${tour.gridClass.split(' ').slice(0,2).join(' ')} relative rounded-3xl overflow-hidden ${tour.gridClass.includes('h-[400px]') ? 'h-[400px]' : 'h-[300px]'} group shadow-lg cursor-pointer transition-all active:scale-[0.99]`}
            >
              <img alt={tour.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={tour.image}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                <h3 className={tour.titleClass}>{tour.title}</h3>
                <p className="text-surface-variant opacity-90 max-w-lg mb-4 text-sm md:text-base">{tour.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-secondary-fixed font-bold">{tour.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookingModal 
        isModalOpen={isModalOpen} 
        handleCloseModal={handleCloseModal} 
        destination={selectedDestination}
      />
    </>
  );
}

export default TuristDestinations;