import  { useState } from 'react';
import BookingModal from '@/Components/BookingModal/BookingModal.jsx'; // استيراد المودال من الملف المستقلاً

function SpecialOffers() {
  // الحالات البرمجية للتحكم بالمودال والوجهة المحددة من العروض
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  // دالة التعامل مع النقر على زر "احجز العرض الآن"
  const handleOfferClick = (offerName) => {
    setSelectedDestination(offerName);
    setIsModalOpen(true);
  };

  // دالة إغلاق المودال وتنظيف الحالة
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            
            {/* العرض 1: الساحل الذهبي */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-white relative group overflow-hidden">
              <div className="absolute top-1 -right-9 bg-error text-white px-10 py-2 rotate-32 font-bold shadow-lg">خصم 25%</div>
              <h3 className="font-headline-sm text-headline-sm mb-4">رحلة "الساحل الذهبي"</h3>
              <p className="text-primary-fixed text-sm mb-6">تشمل النقل من دمشق إلى طرطوس مع إقامة ليلتين في منتجع بلو باي.</p>
              <div className="text-3xl font-bold mb-8">450,000 <span className="text-sm font-normal">ل.س</span></div>
              <button 
                onClick={() => handleOfferClick('عرض رحلة "الساحل الذهبي"')}
                className="w-full py-4 bg-white text-primary rounded-xl font-bold group-hover:bg-secondary-fixed transition-all cursor-pointer active:scale-[0.98]"
              >
                احجز العرض الآن
              </button>
            </div>

            {/* العرض 2: مدن التاريخ */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-white relative group overflow-hidden">
              <div className="absolute top-1 -right-9 bg-error text-white px-10 py-2 rotate-32 font-bold shadow-lg">خصم 15%</div>
              <h3 className="font-headline-sm text-headline-sm mb-4">باقة "مدن التاريخ"</h3>
              <p className="text-primary-fixed text-sm mb-6">جولة تشمل دمشق، حلب، وحمص على مدار 4 أيام مع مرشد سياحي مختص.</p>
              <div className="text-3xl font-bold mb-8">620,000 <span className="text-sm font-normal">ل.س</span></div>
              <button 
                onClick={() => handleOfferClick('باقة "مدن التاريخ" العائلية')}
                className="w-full py-4 bg-white text-primary rounded-xl font-bold group-hover:bg-secondary-fixed transition-all cursor-pointer active:scale-[0.98]"
              >
                احجز العرض الآن
              </button>
            </div>

            {/* العرض 3: صيدنايا ومعلولا */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-white relative group overflow-hidden">
              <div className="absolute top-1 -right-9 bg-error text-white px-10 py-2 rotate-32 font-bold shadow-lg">وفر 50 الف</div>
              <h3 className="font-headline-sm text-headline-sm mb-4">رحلة اليوم الواحد: صيدنايا ومعلولا</h3>
              <p className="text-primary-fixed text-sm mb-6">رحلة عائلية مثالية لقضاء يوم الجمعة في أحضان الجبال السورية.</p>
              <div className="text-3xl font-bold mb-8">85,000 <span className="text-sm font-normal">ل.س</span></div>
              <button 
                onClick={() => handleOfferClick("رحلة اليوم الواحد: صيدنايا ومعلولا")}
                className="w-full py-4 bg-white text-primary rounded-xl font-bold group-hover:bg-secondary-fixed transition-all cursor-pointer active:scale-[0.98]"
              >
                احجز العرض الآن
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* استدعاء المودال وتمرير بيانات العرض المختار ديناميكياً */}
      <BookingModal 
        isModalOpen={isModalOpen} 
        handleCloseModal={handleCloseModal} 
        destination={selectedDestination}
      />
    </>
  );
}

export default SpecialOffers;