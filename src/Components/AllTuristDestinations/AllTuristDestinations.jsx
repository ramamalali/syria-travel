import { useState } from "react";
import BookingModal from "@/Components/BookingModal/BookingModal.jsx";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { toursSectionData } from "@/constants";

function AllTuristDestinations() {
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

  return (
    <>
      <Navbar />
      
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id="turistdestinations">
        <div className="mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4 leading-tight">
            {toursSectionData.title}
          </h2>
          <p className="text-on-surface-variant">{toursSectionData.description}</p>
        </div>

        {/* عرض كافة رحلات الداتا بشبكة ديناميكية متسقة ومقاومة لتداخل العناصر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {toursSectionData.items.map((tour) => (
            <div
              key={tour.id}
              onClick={() => handleCardClick(tour.bookingName)}
              className="relative rounded-3xl overflow-hidden h-[380px] group shadow-lg cursor-pointer transition-all active:scale-[0.99] flex flex-col justify-end"
            >
              <img
                alt={tour.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={tour.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-white z-10">
                <h3 className="font-headline-sm text-headline-sm font-bold mb-1">
                  {tour.title.includes(":") ? tour.title.split(":")[0] : tour.title}
                </h3>
                <p className="text-surface-variant opacity-90 text-sm mb-4 line-clamp-2">
                  {tour.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-fixed text-sm font-bold bg-secondary-container/10 px-3 py-1 rounded-full">
                    {tour.price.split(' ')[0]} {tour.price.split(' ')[1]}
                  </span>
                  <span className="text-white font-label-md text-sm flex items-center gap-1 group-hover:text-secondary transition-colors">
                    احجز الآن <span className="material-symbols-outlined text-sm">arrow_left</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <BookingModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        destination={selectedDestination}
      />
    </>
  );
}

export default AllTuristDestinations;