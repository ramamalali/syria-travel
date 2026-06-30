import { useState, useEffect } from "react";
import sets from "@/assets/images/sets.png";
import API from "@/Services/api"; 

function AboutUs() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالات لتخزين النصوص الرئيسية القادمة من الباك إيند ديناميكياً
  const [aboutData, setAboutData] = useState({
    badge: "ميزاتنا وخدماتنا",
    title: "الريادة في النقل السياحي والرحلات"
  });

  // جلب البيانات من المسار المطور والمحدث بالسيرفر
  useEffect(() => {
    API.get("/about-info")
      .then((res) => {
        if (res.data) {
          // تخزين النصوص الرئيسية (البادج والعنوان)
          if (res.data.info) {
            setAboutData(res.data.info);
          }
          // تخزين مصفوفة الميزات
          if (res.data.features) {
            setFeatures(res.data.features);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ أثناء جلب ميزات قسم من نحن:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id="AboutUs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* الجانب البصري الثابت (تصميمك الأصلي) */}
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
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
              <div className="text-primary font-body-md animate-pulse">جاري تحميل ميزات سوا...</div>
            ) : (
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.id || feature.feat_id} className="flex gap-4">
                    {/* وعاء الأيقونة المجلوبة حياً */}
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-3xl">
                        {feature.icon}
                      </span>
                    </div>
                    {/* النصوص التفصيلية */}
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