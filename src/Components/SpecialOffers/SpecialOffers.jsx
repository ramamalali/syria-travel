import { useState } from 'react';
import BookingModal from '@/Components/BookingModal/BookingModal.jsx'; 
import { initialOffers } from '@/constants'; // 1. استيراد البيانات المركزية

function SpecialOffers() {
  const [offers, setOffers] = useState(initialOffers); // جعل العروض في الحالة (State)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleOfferClick = (offerName) => {
    setSelectedDestination(offerName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDestination("");
  };

  return (
    <>
      <section className="py-24 bg-primary overflow-hidden relative" id="offers">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 flex items-center justify-center pointer-events-none">
          <span className="material-symbols-outlined text-[400px]">redeem</span>
        </div>
        
        <div className="px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary-fixed-dim font-bold tracking-[0.2em] uppercase text-xs mb-4 block">عروض محدودة</span>
            <h2 className="font-headline-lg text-headline-lg text-white mb-4">خصومات حصرية على الرحلات العائلية</h2>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full"></div>
          </div>

          {/* 2. رندرة الكروت ديناميكياً باستخدام الخريطة map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-white relative group overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="absolute top-1 -right-9 bg-error text-white px-10 py-2 rotate-32 font-bold shadow-lg text-xs">
                    {offer.discount}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-4 mt-2">{offer.title}</h3>
                  <p className="text-primary-fixed text-sm mb-6 opacity-90">{offer.description}</p>
                </div>
                
                <div>
                  <div className="text-3xl font-bold mb-8">
                    {offer.price.toLocaleString()} <span className="text-sm font-normal">ل.س</span>
                  </div>
                  <button 
                    onClick={() => handleOfferClick(offer.bookingName)}
                    className="w-full py-4 bg-white text-primary rounded-xl font-bold group-hover:bg-secondary-fixed transition-all cursor-pointer active:scale-[0.98]"
                  >
                    احجز العرض الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
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

export default SpecialOffers;