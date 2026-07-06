import { useState, useEffect } from "react";

function Footer() {
  // حالة التحكم في ظهور البوب أب
  const [showPopup, setShowPopup] = useState(false);

  // حالة التحكم في اللغة النشطة للاستماع الفوري والتحديث اللحظي للواجهة
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("site_lang") || "ar");

  // الاستماع لحدث تغيير اللغة الفوري المُنطلق من النافبار
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };

    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // دالة التعامل مع إرسال نموذج النشرة البريدية
  const handleSubmit = (e) => {
    e.preventDefault();
    // تصفير حقل الإدخال بعد الإرسال الوهمي الناجح
    e.target.reset();
    setShowPopup(true); // إظهار البوب أب عند النجاح
  };

  // كائن الترجمة الثابت لجميع نصوص الفوتر
  const t = {
    ar: {
      brand: "Sawa Travel",
      description: "نفتخر بكوننا شريككم الأول في اكتشاف جمال سوريا وربط مدنها بأحدث أساطيل النقل وأرقى الخدمات السياحية.",
      quickLinks: "الروابط السريعة",
      sitemap: "خريطة الموقع",
      destinations: "الوجهات السياحية",
      offers: "العروض الحالية",
      support: "الدعم والمساعدة",
      contact: "اتصلي بنا",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      newsletter: "النشرة البريدية",
      newsletterDesc: "اشتركي ليصلكِ أحدث العروض والرحلات السياحية الجديدة فوراً.",
      placeholder: "بريدكِ الإلكتروني",
      subscribe: "اشتركي",
      rights: "© 2026 شركة سوا للسياحة والسفر. جميع الحقوق محفوظة.",
      popupTitle: "تم الاشتراك بنجاح!",
      popupDesc: "شكرًا لاشتراككِ في نشرتنا البريدية. سيتم إرسال أحدث العروض والرحلات إليكِ أولاً بأول.",
      close: "إغلاق"
    },
    en: {
      brand: "Sawa Travel",
      description: "We pride ourselves on being your premier partner in discovering the beauty of Syria, connecting its cities with the latest fleets and finest tourism services.",
      quickLinks: "Quick Links",
      sitemap: "Sitemap",
      destinations: "Destinations",
      offers: "Offers",
      support: "Support",
      contact: "Contact Us",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      newsletter: "Newsletter",
      newsletterDesc: "Subscribe to receive our latest updates, tours, and exclusive offers.",
      placeholder: "Your Email Address",
      subscribe: "Subscribe",
      rights: "© 2026 Sawa Travel & Tourism. All rights reserved.",
      popupTitle: "Subscribed Successfully!",
      popupDesc: "Thank you for subscribing to our newsletter. Updates and updates on our latest tours will be sent to your email.",
      close: "Close"
    }
  };

  return (
    <>
      <footer className="bg-tertiary text-on-tertiary py-12" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-desktop max-w-container-max mx-auto">
          
          {/* العمود الأول: نبذة عن الشركة وحسابات التواصل */}
          <div className="md:col-span-4">
            <span className="font-headline-sm text-headline-sm text-on-tertiary font-bold mb-6 block">
              {t[currentLang].brand}
            </span>
            <p className="text-tertiary-fixed-dim text-label-md font-label-md max-w-xs mb-8 leading-relaxed text-justify">
              {t[currentLang].description}
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-fixed text-white transition-colors" href="#">
                <span className="material-symbols-outlined text-md">social_leaderboard</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-fixed text-white transition-colors" href="#">
                <span className="material-symbols-outlined text-md">camera_alt</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-fixed text-white transition-colors" href="#">
                <span className="material-symbols-outlined text-md">share</span>
              </a>
            </div>
          </div>

          {/* العمود الثاني: الروابط السريعة */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-6 text-sm text-secondary-fixed">
              {t[currentLang].quickLinks}
            </h4>
            <ul className="space-y-4 font-label-md text-label-md text-tertiary-fixed-dim">
              <li><a className="hover:text-secondary-fixed transition-colors text-xs" href="#">{t[currentLang].sitemap}</a></li>
              <li><a className="hover:text-secondary-fixed transition-colors text-xs" href="#destinations">{t[currentLang].destinations}</a></li>
              <li><a className="hover:text-secondary-fixed transition-colors text-xs" href="#offers">{t[currentLang].offers}</a></li>
            </ul>
          </div>

          {/* العمود الثالث: الدعم والخصوصية */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-6 text-sm text-secondary-fixed">
              {t[currentLang].support}
            </h4>
            <ul className="space-y-4 font-label-md text-label-md text-tertiary-fixed-dim">
              <li><a className="hover:text-secondary-fixed transition-colors text-xs" href="#contact">{t[currentLang].contact}</a></li>
              <li><a className="hover:text-secondary-fixed transition-colors text-xs" href="#">{t[currentLang].privacy}</a></li>
              <li><a className="hover:text-secondary-fixed transition-colors text-xs" href="#">{t[currentLang].terms}</a></li>
            </ul>
          </div>

          {/* العمود الرابع: النشرة البريدية التفاعلية */}
          <div className="md:col-span-4">
            <h4 className="font-bold mb-6 text-sm text-secondary-fixed">
              {t[currentLang].newsletter}
            </h4>
            <p className="text-tertiary-fixed-dim text-xs mb-6 leading-relaxed">
              {t[currentLang].newsletterDesc}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <input 
                  required
                  className="w-[75%] flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-secondary transition-colors" 
                  placeholder={t[currentLang].placeholder} 
                  type="email"
                />
                <button type="submit" className="bg-secondary text-on-secondary px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer hover:opacity-95 transition-opacity shrink-0">
                  {t[currentLang].subscribe}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* خط الحقوق السفلي */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-tertiary-fixed-dim font-label-md text-xs px-margin-desktop max-w-container-max mx-auto font-mono">
          {t[currentLang].rights}
        </div>
      </footer>

      {/* بوب أب نجاح الاشتراك بالنشرة البريدية مترجم بالكامل ومحمي الاتجاه */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-outline-variant/30 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t[currentLang].popupTitle}
            </h3>
            <p className="text-on-surface-variant text-xs mb-6 leading-relaxed">
              {t[currentLang].popupDesc}
            </p>
            <button 
              onClick={() => setShowPopup(false)} 
              className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              {t[currentLang].close}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;