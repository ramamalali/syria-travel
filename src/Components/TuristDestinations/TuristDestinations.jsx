import { useState, useEffect } from 'react';
import { Link } from "react-router";
import BookingModal from '@/Components/BookingModal/BookingModal.jsx';
import API from "@/Services/api"; // استيراد الـ API الخاص بمشروعكِ

function TuristDestinations() {
  const [toursData, setToursData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  // جلب البيانات من الباك آيند عند تحميل المكوّن
  useEffect(() => {
    API.get('/featured-tours')
      .then((res) => {
        if (res.data) setToursData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب جولات المحافظات السیاحیة:", err);
        setLoading(false);
      });
  }, []);

  // فتح مودال تفاصيل المحافظة والمعالم عند الضغط على الكرت
  const handleCardClick = (tour) => {
    setSelectedTour(tour);
    setIsDetailsOpen(true);
  };

  // عند الضغط على "اشترك في الرحلة" من داخل التفاصيل
  const handleProceedToBooking = () => {
    setIsDetailsOpen(false); 
    setIsBookingOpen(true);  
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedTour(null);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedTour(null);
  };

  if (loading) {
    return <div className="text-center py-20 text-primary animate-pulse font-body-lg">جاري تحميل الرحلات السياحية...</div>;
  }

  if (!toursData || !toursData.items) return null;

  // تصفية الجولات المميزة للرئيسية من البيانات القادمة من السيرفر
  const featuredTours = toursData.items.filter(item => item.featured);

  return (
    <>
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id="turistdestinations">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4 leading-tight">
              {toursData.title}
            </h2>
            <p className="text-on-surface-variant">{toursData.description}</p>
          </div>
          <Link 
            to="/all-turistDestinations" 
            className="text-secondary font-label-md text-label-md flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <span>{toursData.viewAllText || "عرض الكل"}</span>
            <span className="material-symbols-outlined">arrow_left</span>
          </Link>
        </div>

        {/* شبكة كروت المحافظات */}
        <div className="grid grid-cols-12 gap-6">
          {featuredTours.map((tour) => (
            <div 
              key={tour.id}
              onClick={() => handleCardClick(tour)} 
              className={`${tour.gridClass.split(' ').slice(0,2).join(' ')} relative rounded-3xl overflow-hidden ${tour.gridClass.includes('h-[400px]') ? 'h-[400px]' : 'h-[300px]'} group shadow-lg cursor-pointer transition-all active:scale-[0.99]`}
            >
              <img alt={tour.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={tour.image}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                <span className="bg-secondary-container text-on-secondary-container text-xs px-3 py-1 rounded-full w-max mb-2 font-bold backdrop-blur-sm">
                  {tour.province}
                </span>
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

      {/* --- 1. بوب اب تفاصيل جولة المحافظة والمناطق الأثرية --- */}
      {isDetailsOpen && selectedTour && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm animate-fadeIn" onClick={handleCloseDetails}></div>
          
          <div className="relative bg-surface-container-lowest w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-scaleUp max-h-[90vh]">
            <div className="relative h-52 w-full">
              <img src={selectedTour.image} alt={selectedTour.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <button onClick={handleCloseDetails} className="absolute top-4 right-4 p-2 bg-black/40 text-white hover:bg-black/60 rounded-full backdrop-blur-sm transition-colors cursor-pointer">
                <span className="material-symbols-outlined block">close</span>
              </button>
              <div className="absolute bottom-4 right-4 text-white">
                <span className="text-xs bg-secondary px-2 py-0.5 rounded-md text-primary font-bold mb-1 inline-block">جولة محافظة {selectedTour.province}</span>
                <h3 className="text-2xl font-bold">{selectedTour.title}</h3>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <h4 className="text-sm font-bold text-primary mb-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-md">explore</span>
                  مخطط مسار الجولة بالمحافظة
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{selectedTour.details?.fullDescription}</p>
              </div>

              {selectedTour.details?.landmarksToVisit && (
                <div className="border-t border-outline-variant/20 pt-4">
                  <h4 className="text-sm font-bold text-primary mb-2.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-md">account_balance</span>
                    المعالم والمناطق الأثرية المشمولة بالزيارة
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedTour.details.landmarksToVisit.map((landmark, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-surface-container-low p-2 rounded-xl border border-outline-variant/10">
                        <span className="text-secondary font-bold text-xs bg-white w-5 h-5 rounded-full flex items-center justify-center border border-outline-variant/30 shadow-sm">{idx + 1}</span>
                        <span className="text-xs text-primary font-medium">{landmark}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 border-t border-outline-variant/20 pt-4 text-xs">
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/10">
                  <span className="text-on-surface-variant block mb-1 font-medium">🗓️ مدة الإقامة والجولة</span>
                  <span className="font-bold text-primary">{selectedTour.details?.duration}</span>
                </div>
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/10">
                  <span className="text-on-surface-variant block mb-1 font-medium">🏨 الحجز الفندقي والتثبيت</span>
                  <span className={`font-bold ${selectedTour.details?.hotelStay?.includes('لا تتضمن') ? 'text-amber-800' : 'text-green-700'}`}>
                    {selectedTour.details?.hotelStay}
                  </span>
                </div>
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/10">
                  <span className="text-on-surface-variant block mb-1 font-medium">⏳ فترة فتح باب الحجز</span>
                  <span className="font-bold text-primary">{selectedTour.details?.bookingStart}</span>
                </div>
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/10">
                  <span className="text-on-surface-variant block mb-1 font-medium">🚀 موعد انطلاق الحافلة</span>
                  <span className="font-bold text-secondary">{selectedTour.details?.tourDate}</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-outline-variant/20">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">تكلفة الجولة الكاملة للمفرد</span>
                  <span className="text-lg font-bold text-secondary">{selectedTour.price}</span>
                </div>
                <button 
                  onClick={handleProceedToBooking}
                  className="bg-primary text-on-primary px-6 py-3 rounded-xl text-xs font-bold shadow-lg hover:bg-primary-dim transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <span>اشترك في الرحلة</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-[-2px] transition-transform">arrow_back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 2. بوب اب الحجز والدفع المطور --- */}
      <BookingModal 
        isModalOpen={isBookingOpen} 
        handleCloseModal={handleCloseBooking} 
        destination={selectedTour?.bookingName || ""}
      />
    </>
  );
}

export default TuristDestinations;