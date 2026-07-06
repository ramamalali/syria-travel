import { useState, useEffect } from "react";
import syriaBg from "@/assets/images/hero.png"; // الحفاظ على خلفيتك المحلية الأصلية
import API from "@/Services/api"; // استيراد الـ Axios المشترك
import BookingModal from '@/Components/BookingModal/BookingModal.jsx';

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // 1. جعل اللغة عبارة عن State داخل المكون لضمان الاستجابة الحركية الفورية
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("site_lang") || "ar");

  // الحالات الديناميكية لبيانات الـ Hero
  const [heroData, setHeroData] = useState({
    headline_main: "سوا نسافر...",
    headline_sub: "سوريا بكل تفاصيلها",
    description: "اكتشف جمال المدن السورية، من عراقة دمشق إلى سحر الساحل.",
    btn_book: "احجز رحلتك الآن",
    btn_explore: "استكشف الوجهات"
  });

  // 2. الاستماع لتغيير اللغة الفوري من النافبار
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };

    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // 3. جلب نصوص الـ Hero من الباك إيند بناءً على اللغة المحدثة فوراً
  useEffect(() => {
    API.get(`/hero?lang=${currentLang}`)
      .then(res => {
        if (res.data) {
          setHeroData(res.data);
        }
      })
      .catch(err => console.error("خطأ في جلب بيانات الـ Hero من السيرفر:", err));
  }, [currentLang]); // ستعمل فوراً بمجرد تغير الـ State

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="relative h-[35rem] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Hero Image"
            className="w-full h-full object-cover"
            src={syriaBg}
          />
          {/* التدرج اللوني يتبع التغير اللحظي للغة */}
          <div 
            className={`absolute inset-0 bg-gradient-to-b md:bg-gradient-to-t ${
              currentLang === "ar" 
                ? "md:from-primary/90 md:via-primary/40 md:to-transparent" 
                : "md:from-transparent md:via-primary/40 md:to-primary/90"
            } from-primary/90 via-primary/60 to-transparent`}
          ></div>
        </div>

        <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto w-full text-white flex justify-start">
          <div className="max-w-2xl w-full">
            <h1 className="font-headline-lg text-headline-lg mb-6 leading-tight">
              {heroData.headline_main}
              <br />
              <span className="text-secondary-fixed">{heroData.headline_sub}</span>
            </h1>
            <p className="font-body-lg text-body-lg mb-10 text-surface-container-low opacity-90">
              {heroData.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleOpenModal}
                className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-headline-sm text-headline-sm font-bold shadow-lg flex items-center gap-3 hover:bg-secondary-fixed transition-all active:scale-95 cursor-pointer"
              >
                <span className={`material-symbols-outlined transition-transform duration-300 ${
                  currentLang === "en" ? "-scale-x-100" : ""
                }`}>
                  directions_bus
                </span>
                {heroData.btn_book}
              </button>
              <button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-headline-sm text-headline-sm font-bold hover:bg-white/10 transition-all active:scale-95 cursor-pointer">
                <a href="#turistdestinations">{heroData.btn_explore}</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal 
        isModalOpen={isModalOpen} 
        handleCloseModal={handleCloseModal} 
        destination="" 
      />
    </>
  );
}

export default Hero;