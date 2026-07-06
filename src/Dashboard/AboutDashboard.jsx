import { useState, useEffect } from "react";
import API from "@/Services/api";

function AboutDashboard() {
  // فصل وتجهيز حقول العناوين الرئيسية للغتين
  const [info, setInfo] = useState({ 
    badge_ar: "", 
    badge_en: "", 
    title_ar: "", 
    title_en: "" 
  });
  
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // 1. جلب البيانات الخام (raw) باللغتين معاً لملء حقول لوحة التحكم
  useEffect(() => {
    API.get("/about-info")
      .then((res) => {
        if (res.data && res.data.raw) {
          const { settings, features: rawFeatures } = res.data.raw;
          
          if (settings) {
            setInfo({
              badge_ar: settings.badge_ar || "",
              badge_en: settings.badge_en || "",
              title_ar: settings.title_ar || "",
              title_en: settings.title_en || ""
            });
          }
          
          if (rawFeatures) {
            setFeatures(rawFeatures);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب بيانات من نحن للداشبورد:", err);
        setLoading(false);
      });
  }, []);

  // معالجة تغيير العناوين الرئيسية ديناميكياً
  const handleInfoChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  // معالجة تغيير حقول الميزات المترجمة داخل المصفوفة
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };

  // 2. إرسال البيانات المحدثة باللغتين إلى الباك إيند
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage({ type: "info", text: "جاري حفظ التعديلات اللغوية الحالية..." });

    API.put("/about-info", {
      badge_ar: info.badge_ar,
      badge_en: info.badge_en,
      title_ar: info.title_ar,
      title_en: info.title_en,
      features: features
    })
      .then(() => {
        setStatusMessage({ type: "success", text: "🎉 تم تحديث نصوص وميزات 'من نحن' باللغتين بنجاح!" });
        setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
      })
      .catch((err) => {
        console.error("خطأ في تحديث بيانات لوحة التحكم:", err);
        setStatusMessage({ type: "error", text: "❌ فشل حفظ التعديلات، يرجى مراجعة الاتصال بالسيرفر." });
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-primary text-xs font-bold animate-pulse">جاري تحميل إعدادات قسم من نحن المترجمة...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-outline-variant/20 shadow-sm p-6 md:p-8" dir="rtl">
      
      {/* الهيدر */}
      <div className="mb-6 border-b border-outline-variant/20 pb-4">
        <h2 className="text-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">g_translate</span>
          إدارة ومحاذاة لغات قسم "من نحن"
        </h2>
        <p className="text-[11px] text-on-surface-variant mt-1">
          تتيح لكِ هذه الواجهة التحكم بالنصوص العربية والإنجليزية معاً لضمان تجربة تصفح متكاملة وانسيابية لزوار الموقع.
        </p>
      </div>

      {/* التنبيهات الفورية */}
      {statusMessage.text && (
        <div className={`p-4 rounded-xl text-xs font-bold mb-6 flex items-center gap-2 ${
          statusMessage.type === "success" ? "bg-green-50 text-green-800 border border-green-100" :
          statusMessage.type === "error" ? "bg-rose-50 text-rose-800 border border-rose-100" :
          "bg-blue-50 text-blue-800 border border-blue-100 animate-pulse"
        }`}>
          <span className="material-symbols-outlined text-sm">
            {statusMessage.type === "success" ? "check_circle" : statusMessage.type === "error" ? "error" : "info"}
          </span>
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* الجزء الأول: العناوين الرئيسية (عربي / إنجليزي) */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 space-y-6">
          <h3 className="text-xs font-bold text-primary flex items-center gap-1 border-b border-outline-variant/20 pb-2">
            <span className="material-symbols-outlined text-sm">subtitles</span>
            العناوين الرئيسية للقسم
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الحقول العربية */}
            <div className="p-4 bg-gray-50/50 rounded-xl space-y-4 border border-gray-100">
              <span className="text-[10px] bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded-md">المحتوى العربي 🇸🇾</span>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface">الشارة الصغيرة (Badge - AR)</label>
                <input 
                  required type="text" name="badge_ar" value={info.badge_ar} onChange={handleInfoChange}
                  className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-white outline-none focus:border-primary font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface">العنوان الرئيسي العريض (AR)</label>
                <input 
                  required type="text" name="title_ar" value={info.title_ar} onChange={handleInfoChange}
                  className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-white outline-none focus:border-primary font-medium"
                />
              </div>
            </div>

            {/* الحقول الإنجليزية */}
            <div className="p-4 bg-blue-50/20 rounded-xl space-y-4 border border-blue-50/50" dir="ltr">
              <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-md inline-block">English Content 🇬🇧</span>
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-on-surface block">Small Badge (Badge - EN)</label>
                <input 
                  required type="text" name="badge_en" value={info.badge_en} onChange={handleInfoChange}
                  className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-white outline-none focus:border-primary font-medium text-left"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-on-surface block">Main Headline (Title - EN)</label>
                <input 
                  required type="text" name="title_en" value={info.title_en} onChange={handleInfoChange}
                  className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-white outline-none focus:border-primary font-medium text-left"
                />
              </div>
            </div>
          </div>
        </div>

        {/* الجزء الثاني: كروت الميزات المترجمة */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">featured_play_list</span>
            تعديل كروت الميزات باللغتين (Features)
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {features.map((feat, index) => (
              <div key={feat.id || feat.feat_id} className="p-5 border border-outline-variant/40 rounded-xl bg-surface-container-low/40 space-y-4">
                
                {/* الهيدر الصغير لكل كرت */}
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                  <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold">الميزة رقم {index + 1}</span>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="text-[10px] font-medium text-on-surface-variant">معاينة الأيقونة الحية:</span>
                    <span className="material-symbols-outlined text-md">{feat.icon}</span>
                  </div>
                </div>

                {/* حقل الأيقونة المشترك */}
                <div className="w-full max-w-xs space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant">اسم أيقونة ميريال (Material Icon)</label>
                  <input 
                    required type="text" value={feat.icon}
                    onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                    className="w-full border border-outline-variant rounded-xl p-2.5 text-xs bg-white font-mono text-primary outline-none focus:border-primary"
                  />
                </div>

                {/* حقول النصوص للميزة بالترجمة المزدوجة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  
                  {/* نصوص الميزة بالعربي */}
                  <div className="space-y-3 p-3 bg-gray-50/40 rounded-lg border border-gray-100">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-on-surface-variant">عنوان الميزة (عربي)</label>
                      <input 
                        required type="text" value={feat.title_ar || ""}
                        onChange={(e) => handleFeatureChange(index, "title_ar", e.target.value)}
                        className="w-full border border-outline-variant rounded-xl p-2 text-xs bg-white font-medium outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-on-surface-variant">وصف وتفاصيل الميزة (عربي)</label>
                      <textarea 
                        required rows="2" value={feat.description_ar || ""}
                        onChange={(e) => handleFeatureChange(index, "description_ar", e.target.value)}
                        className="w-full border border-outline-variant rounded-xl p-2 text-xs bg-white font-medium resize-none outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* نصوص الميزة بالإنجليزي */}
                  <div className="space-y-3 p-3 bg-blue-50/10 rounded-lg border border-blue-50/30 text-left" dir="ltr">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-on-surface-variant block">Feature Title (English)</label>
                      <input 
                        required type="text" value={feat.title_en || ""}
                        onChange={(e) => handleFeatureChange(index, "title_en", e.target.value)}
                        className="w-full border border-outline-variant rounded-xl p-2 text-xs bg-white font-medium outline-none focus:border-primary text-left"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-on-surface-variant block">Feature Description (English)</label>
                      <textarea 
                        required rows="2" value={feat.description_en || ""}
                        onChange={(e) => handleFeatureChange(index, "description_en", e.target.value)}
                        className="w-full border border-outline-variant rounded-xl p-2 text-xs bg-white font-medium resize-none outline-none focus:border-primary text-left"
                      />
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

        {/* زر الحفظ النهائي */}
        <div className="flex justify-end pt-4 border-t border-outline-variant/20">
          <button 
            type="submit"
            className="bg-primary text-on-primary px-6 py-3 rounded-xl text-xs font-bold shadow-sm hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            حفظ إعدادات اللغتين معاً
          </button>
        </div>

      </form>
    </div>
  );
}

export default AboutDashboard;