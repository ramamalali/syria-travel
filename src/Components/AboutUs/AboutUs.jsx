import { useState, useEffect } from "react";
import sets from "@/assets/images/sets.png";
import API from "@/Services/api"; 

function AboutUs() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. جعل اللغة عبارة عن State داخل المكون لضمان الاستجابة الفورية لتبديل اللغة
  const [lang, setLang] = useState(() => localStorage.getItem("site_lang") || "ar");

  // حالات لتخزين النصوص الرئيسية القادمة من الباك إيند ديناميكياً
  const [aboutData, setAboutData] = useState({
    badge: "ميزاتنا وخدماتنا",
    title: "الريادة في النقل السياحي والرحلات"
  });

  // 2. الاستماع لتغيير اللغة الفوري الصادر من الـ Navbar
  useEffect(() => {
    const handleLangUpdate = () => {
      setLang(localStorage.getItem("site_lang") || "ar");
    };

    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // 3. جلب البيانات من السيرفر مضافاً إليها معامل اللغة المحدّث ديناميكياً [lang]
  useEffect(() => {
    setLoading(true); // تشغيل لودر خفيف عند التبديل
    API.get(`https://syria-travel.onrender.com/api/about-info?lang=${lang}`)
      .then((res) => {
        if (res.data) {
          // تخزين النصوص الرئيسية (البادج والعنوان) المفلترة من السيرفر
          if (res.data.info) {
            setAboutData(res.data.info);
          }
          // تخزين مصفوفة الميزات المترجمة
          if (res.data.features) {
            setFeatures(res.data.features);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ أثناء جلب ميزات قسم من نحن اللغوية:", err);
        setLoading(false);
      });
  }, [lang]); // السحر هنا: عند تغير الحالة lang، يعاد طلب البيانات باللغة الجديدة فوراَ

  return (
    <>
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id="AboutUs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* الجانب البصري (تصميمك الأصلي - سينقلب مكانه تلقائياً مع لغة المتصفح والـ dir الأب) */}
          <div className="relative">
            <div className={`absolute -top-8 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl ${
              lang === "ar" ? "-right-8" : "-left-8"
            }`}></div>
            <img
              alt="About Sawa"
              className="relative z-10 w-full rounded-2xl shadow-xl border-4 border-white"
              src={sets}
            />
          </div>

          {/* الجانب النصي والميزات من السيرفر */}
          <div>
            <span className="text-secondary font-label-md text-label-md tracking-widest block mb-4">
              {aboutData.badge}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-8 leading-tight">
              {aboutData.title}
            </h2>
            
            {loading ? (
              <div className="text-primary font-body-md animate-pulse">
                {lang === "ar" ? "جاري تحميل ميزات سوا..." : "Loading Sawa features..."}
              </div>
            ) : (
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.id || feature.feat_id} className="flex gap-4">
                    {/* وعاء الأيقونة - الـ flex يعكس تموضعه يمين/يسار تلقائياً بناءً على الـ dir الأب */}
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-3xl">
                        {feature.icon}
                      </span>
                    </div>
                    {/* النصوص التفصيلية للميزات */}
                    <div>
                      <h4 className="font-headline-sm text-headline-sm font-bold text-primary mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-on-surface-variant font-body-md text-body-md">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

export default AboutUs;