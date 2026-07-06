import { useState, useEffect } from 'react';
// استيراد مكونات Swiper الخاصة بـ React
import { Swiper, SwiperSlide } from 'swiper/react';
// استيراد الموديلات المطلوبة (التنقل التلقائي، النقاط التوضيحية)
import { Autoplay, Pagination } from 'swiper/modules';
import axios from 'axios';

// استيراد ملفات الستاين الأساسية الخاصة بـ Swiper
import 'swiper/css';
import 'swiper/css/pagination';

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. جعل اللغة عبارة عن State لضمان التحديث اللحظي للواجهة والسلايدر
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("site_lang") || "ar");

  // 2. الاستماع لتغيير اللغة الفوري المُنطلق من النافبار
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };

    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // 3. جلب الآراء من قاعدة البيانات
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://syria-travel.onrender.com/api/testimonials');
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // دالة مساعدة لقراءة نصوص كائنات الـ JSONB المترجمة بأمان
  const getLocalizedText = (field) => {
    if (!field) return "";
    if (typeof field === "object") {
      return field[currentLang] || field["ar"] || "";
    }
    return field;
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-primary font-bold animate-pulse">
        {currentLang === 'en' ? "Loading customer reviews..." : "جاري تحميل آراء عملائنا..."}
      </div>
    );
  }

  return (
    <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id="testimonials" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
          {currentLang === 'en' ? "Customers Testimonials" : "آراء عملائنا"}
        </h2>
        <div className="h-1 w-16 bg-secondary mx-auto rounded-full"></div>
      </div>

      <div className="relative pb-16 testimonials-slider bg-white rounded-3xl">
        {reviews.length > 0 && (
          <Swiper
            // تمرير كائن الـ key يجبر Swiper على إعادة البناء بالكامل وتطبيق الاتجاه الجديد فوراً عند تغيير اللغة
            key={currentLang} 
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
            loop={reviews.length >= 3} // تشغيل الـ loop فقط إذا كانت العناصر كافية تجنباً للتحذيرات
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              el: '.custom-swiper-pagination',
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper !p-2 !pb-4 text-on-surface-variant"
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-surface p-8 rounded-2xl border border-outline-variant relative h-full flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-md transition-shadow bg-white selection:bg-transparent">
                  {/* علامة الاقتباس تلتف حسب لغة وعناصر الواجهة */}
                  <span className={`material-symbols-outlined text-secondary-fixed-dim absolute top-4 ${currentLang === 'ar' ? 'left-4' : 'right-4'} text-5xl opacity-20 pointer-events-none`}>
                    format_quote
                  </span>
                  
                  <div>
                    {/* رندرة النجوم ديناميكياً بناءً على التقييم */}
                    <div className="flex gap-1 text-amber-500 mb-4">
                      {[...Array(5)].map((_, index) => {
                        const isFilled = index < item.rating;
                        return (
                          <span 
                            key={index} 
                            className="material-symbols-outlined" 
                            style={{ fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}` }}
                          >
                            star
                          </span>
                        );
                      })}
                    </div>
                    
                    <p className="text-on-surface-variant mb-8 italic text-sm leading-relaxed text-justify">
                      "{getLocalizedText(item.comment)}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden border border-outline-variant/50">
                      <img alt={getLocalizedText(item.name)} className="w-full h-full object-cover" src={item.avatar} />
                    </div>
                    <div>
                      <h5 className="font-bold text-primary text-sm">{getLocalizedText(item.name)}</h5>
                      <p className="text-xs text-on-surface-variant">{getLocalizedText(item.role)}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        
        {/* حاوية النقاط المخصصة خارج عنصر Swiper */}
        <div className="custom-swiper-pagination !absolute !bottom-2 !left-0 !right-0 !z-10 !flex !justify-center !gap-1 !h-5 !w-full"></div>
      </div>
    </section>
  );
}

export default Testimonials;