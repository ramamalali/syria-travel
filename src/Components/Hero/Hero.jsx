import { useState } from "react";
import syriaBg from "@/assets/images/hero.png";
import { heroData } from "@/constants";
import BookingModal from '@/Components/BookingModal/BookingModal.jsx';

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* قسم الـ Hero الرئيسي */}
      <section className="relative h-[35rem] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Hero Image"
            className="w-full h-full object-cover"
            src={syriaBg}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/80 via-primary/40 to-transparent"></div>
        </div>
        <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto w-full text-white">
          <div className="max-w-2xl">
            <h1 className="font-headline-lg text-headline-lg mb-6 leading-tight">
              {heroData.headline.main}
              <br />
              <span className="text-secondary-fixed">{heroData.headline.sub}</span>
            </h1>
            <p className="font-body-lg text-body-lg mb-10 text-surface-container-low opacity-90">
              {heroData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleOpenModal}
                className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-headline-sm text-headline-sm font-bold shadow-lg flex items-center gap-3 hover:bg-secondary-fixed transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined">directions_bus</span>
                {heroData.ctaButtons.book}
              </button>
              <button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-headline-sm text-headline-sm font-bold hover:bg-white/10 transition-all active:scale-95 cursor-pointer">
                <a href="#turistdestinations">{heroData.ctaButtons.explore}</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* مودال الحجز المطور والمستقل */}
      <BookingModal 
        isModalOpen={isModalOpen} 
        handleCloseModal={handleCloseModal} 
        destination="" // يمكنك تمرير وجهة افتراضية هنا إذا رغبت، أو تركها فارغة ليملأها العميل
      />
    </>
  );
}

export default Hero;