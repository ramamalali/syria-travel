import { useState, useEffect } from 'react';
import BookingModal from '@/Components/BookingModal/BookingModal.jsx'; 

function SpecialOffers() {
  const [offers, setOffers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  // 1. جعل اللغة عبارة عن State لضمان التحديث اللحظي للواجهة
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("site_lang") || "ar");

  // 2. الاستماع لتغيير اللغة الفوري المُنطلق من النافبار
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };

    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // 3. جلب عروض الخصومات ديناميكياً عند تحميل المكون أو عند تغير اللغة
  useEffect(() => {
    setLoading(true);
    fetch('https://syria-travel.onrender.com/api/special-offers')
      .then(res => res.json())
      .then(data => {
        setOffers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching special offers:", err);
        setLoading(false);
      });
  }, [currentLang]); // تحديث فوري عند تبديل اللغة

  // دالة مساعدة لقراءة نصوص كائنات الـ JSONB المترجمة بأمان
  const getLocalizedText = (field) => {
    if (!field) return "";
    if (typeof field === "object") {
      return field[currentLang] || field["ar"] || "";
    }
    return field;
  };

  const handleOfferClick = (offerName) => {
    setSelectedDestination(offerName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDestination("");
  };

  if (loading) {
    return (
      <div className="text-center py-24 bg-primary text-white font-bold animate-pulse">
        {currentLang === 'en' ? "Loading exclusive offers..." : "جاري تحميل العروض الحصرية..."}
      </div>
    );
  }

  return (
    <>
      <section className="py-24 bg-primary overflow-hidden relative" id="offers" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
        {/* أيقونة الخلفية تلتف حسب اتجاه التصميم */}
        <div className={`absolute top-0 ${currentLang === 'ar' ? 'right-0' : 'left-0'} w-1/2 h-full opacity-10 flex items-center justify-center pointer-events-none`}>
          <span className="material-symbols-outlined text-[400px]">redeem</span>
        </div>
        
        <div className="px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary-fixed-dim font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              {currentLang === 'en' ? "Limited Offers" : "عروض محدودة"}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-white mb-4">
              {currentLang === 'en' ? "Exclusive Discounts on Family Trips" : "خصومات حصرية على الرحلات العائلية"}
            </h2>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full"></div>
          </div>

          {/* شبكة عروض الخصومات الكلية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-white relative group overflow-hidden flex flex-col justify-between">
                <div>
                  {/* شريحة الخصم المائل: تلتف وتتعدل زاويتها بناءً على اتجاه اللغة */}
                  <div className={`absolute top-1 ${
                    currentLang === 'ar' ? '-right-9 rotate-32' : '-left-9 -rotate-32'
                  } bg-error text-white px-10 py-2 font-bold shadow-lg text-xs`}>
                    {getLocalizedText(offer.discount)}
                  </div>
                  
                  <h3 className="font-headline-sm text-headline-sm mb-4 mt-2">{getLocalizedText(offer.title)}</h3>
                  <p className="text-primary-fixed text-sm mb-6 opacity-90 leading-relaxed text-justify">{getLocalizedText(offer.description)}</p>
                </div>
                
                <div>
                  <div className="text-3xl font-bold mb-8 flex items-baseline gap-1">
                    {Number(offer.price).toLocaleString()} 
                    <span className="text-sm font-normal opacity-80">
                      {currentLang === 'en' ? "SYP" : "ل.س"}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleOfferClick(getLocalizedText(offer.bookingName))}
                    className="w-full py-4 bg-white text-primary rounded-xl font-bold group-hover:bg-secondary-fixed transition-all cursor-pointer active:scale-[0.98]"
                  >
                    {currentLang === 'en' ? "Book Offer Now" : "احجز العرض الآن"}
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