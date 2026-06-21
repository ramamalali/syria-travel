import React from 'react';
// استيراد مكونات Swiper الخاصة بـ React
import { Swiper, SwiperSlide } from 'swiper/react';
// استيراد الموديلات المطلوبة (التنقل التلقائي، النقاط التوضيحية)
import { Autoplay, Pagination } from 'swiper/modules';

// استيراد ملفات الستاين الأساسية الخاصة بـ Swiper
import 'swiper/css';
import 'swiper/css/pagination';

function Testimonials() {
  return (
    <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id="testimonials">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">ماذا يقول مسافرونا</h2>
        <div className="h-1 w-16 bg-secondary mx-auto rounded-full"></div>
      </div>

      {/* حاوية الكاروسيل */}
      <div className="relative pb-12 testimonials-slider">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={32} // المسافة بين الكروت
          slidesPerView={1}  // الافتراضي لشاشات الموبايل
          dir="rtl"         // دعم التصفح من اليمين لليسار
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            // الشاشات المتوسطة (التابلت) يظهر كرتين
            768: {
              slidesPerView: 2,
            },
            // الشاشات الكبيرة (الكمبيوتر) يظهر 3 كروت
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper !p-2"
        >
          
          {/* الكرت 1: أحمد العلي */}
          <SwiperSlide>
            <div className="bg-surface p-8 rounded-2xl border border-outline-variant relative h-full flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-md transition-shadow bg-white">
              <span className="material-symbols-outlined text-secondary-fixed-dim absolute top-4 left-4 text-5xl opacity-20 pointer-events-none">format_quote</span>
              
              <div>
                {/* عرض 5 نجوم ممتلئة */}
                <div className="flex gap-1 text-secondary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant mb-8 italic text-sm leading-relaxed">
                  "تجربة السفر مع سوا كانت استثنائية. الحافلات نظيفة جداً والمواعيد دقيقة تماماً. سأعتمد عليهم دائماً في رحلاتي بين حلب ودمشق."
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden border border-outline-variant/50">
                  <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA-qXRmaQpQtB4k-4_Ad5CZWMjO0NAPipSKOQBcYjK9aMEDR_tx_XHt3819eEb2Okz19hSnAatCmbIheAjy1zOSEfSViADn3tmb0_tUIFicFiqw5NxVm4fYTKtbGn_eo4Ij2NBOm97GiPUT3kaQoNW_YnDwhTY234KsOIHTZOyqFFSRy-rtQg_Uh_Z4V221vT4cM8IWMtIv_YUTtoBXgqM4wSxVLDnH2NQcyUABYdxL8w_VKAxA-vgwCWTJLkAz5Bxyz4DxLc0kRA"/>
                </div>
                <div>
                  <h5 className="font-bold text-primary text-sm">أحمد العلي</h5>
                  <p className="text-xs text-on-surface-variant">مسافر دائم</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* الكرت 2: لينا خوري */}
          <SwiperSlide>
            <div className="bg-surface p-8 rounded-2xl border border-outline-variant relative h-full flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-md transition-shadow bg-white">
              <span className="material-symbols-outlined text-secondary-fixed-dim absolute top-4 left-4 text-5xl opacity-20 pointer-events-none">format_quote</span>
              
              <div>
                <div className="flex gap-1 text-secondary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant mb-8 italic text-sm leading-relaxed">
                  "الرحلة السياحية إلى تدمر كانت منظمة بشكل رائع. الفندق كان ممتازاً والدليل السياحي متمكن جداً من معلوماته. شكراً سوا ترافيل."
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden border border-outline-variant/50">
                  <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXu4HGjuRVt22Xbim3MHN_gu_E-YCTluImUZ33_Oz22ZnXMs1oZ4d89pj49MpTkWmSKQhgxWnsDmNtnSVvnLJQCKhct0HsAF9sJ01xfZe6lJ0QJaGpJAzgxzZgc4FOkZpqRIXdAO7AHK87htWs7luCXSv7uiNwLibtWvpBWTcC8iQs5Cp_fYx8KD1sgXrJ_Ek-k9XeikEihMz7duBbxsyG5r9tFeaIJp6F0MhPysMBXzm1RFNpu3Ks2-ZVGZbpYXnvRbaG25bL-dUFc"/>
                </div>
                <div>
                  <h5 className="font-bold text-primary text-sm">لينا خوري</h5>
                  <p className="text-xs text-on-surface-variant">سياحة داخلية</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* الكرت 3: عمر المصطفى */}
          <SwiperSlide>
            <div className="bg-surface p-8 rounded-2xl border border-outline-variant relative h-full flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-md transition-shadow bg-white">
              <span className="material-symbols-outlined text-secondary-fixed-dim absolute top-4 left-4 text-5xl opacity-20 pointer-events-none">format_quote</span>
              
              <div>
                {/* عرض 4 نجوم ممتلئة ونجمة فارغة */}
                <div className="flex gap-1 text-secondary mb-4">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                  <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
                </div>
                <p className="text-on-surface-variant mb-8 italic text-sm leading-relaxed">
                  "الخدمة داخل الحافلة ممتازة، الويفي سريع والمقاعد مريحة جداً. أتمنى فقط زيادة عدد الرحلات المسائية بين دمشق واللاذقية."
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden border border-outline-variant/50">
                  <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7gKf3V6sVclBg6SZ5_n85z9lx1Ph2iIbteGtsFPyyzS8pGgZIG1oqz2Xlv69WNi6biD8n8jXOiI2_oZ8_BVwRVREYkYpJWazgwKvCFWn-byxCFQW_y0aDJmdKJNVBzfkkBuUeWh0lhbz9wn5-ul6PpWj4yzUxC3gvlWmQkagO-28nBX3MikEAqMxtD_lh-TEvvi25HQnMF_8TFDkG_hBTQCilo9nJxtxkIettDq56P5Z-BJL9KRBBN37LaL4HruUGoVYSBZEV_00"/>
                </div>
                <div>
                  <h5 className="font-bold text-primary text-sm">عمر المصطفى</h5>
                  <p className="text-xs text-on-surface-variant">طالب جامعي</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </section>
  );
}

export default Testimonials;