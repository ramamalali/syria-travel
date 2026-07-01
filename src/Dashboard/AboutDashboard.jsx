import { useState, useEffect } from "react";
import API from "@/Services/api";

function AboutDashboard() {
  const [info, setInfo] = useState({ badge: "", title: "" });
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // 1. جلب البيانات المشتركة لملء الحقول تلقائياً
  useEffect(() => {
    API.get("/about-info")
      .then((res) => {
        if (res.data) {
          setInfo(res.data.info);
          setFeatures(res.data.features);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب بيانات من نحن:", err);
        setLoading(false);
      });
  }, []);

  // معالجة تغيير العناوين الرئيسية
  const handleInfoChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  // معالجة تغيير حقول الميزات داخل المصفوفة ديناميكياً
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };

  // 2. إرسال التحديثات للباك إيند
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage({ type: "info", text: "جاري حفظ التعديلات الحالية..." });

    API.put("/about-info", {
      badge: info.badge,
      title: info.title,
      features: features
    })
      .then(() => {
        setStatusMessage({ type: "success", text: "🎉 تم تحديث نصوص وميزات 'من نحن' بنجاح!" });
        setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
      })
      .catch((err) => {
        console.error("خطأ في التحديث:", err);
        setStatusMessage({ type: "error", text: "❌ فشل حفظ التعديلات، يرجى مراجعة الاتصال." });
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-primary text-xs font-bold animate-pulse">جاري تحميل إعدادات قسم من نحن...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-outline-variant/20 shadow-sm p-6 md:p-8">
      
      {/* الهيدر */}
      <div className="mb-6 border-b border-outline-variant/20 pb-4">
        <h2 className="text-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">info</span>
          تعديل محتوى وميزات قسم "من نحن"
        </h2>
        <p className="text-[11px] text-on-surface-variant mt-1">
          تعديل العناوين الرئيسية متبوعة بالميزات الثلاث التي تبرز جودة خدمات أسطول "سوا ترافيل".
        </p>
      </div>

      {/* التنبيهات */}
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
        
        {/* الجزء الأول: العناوين الرئيسية */}
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface">الشارة الصغيرة (Badge)</label>
            <input 
              required
              type="text"
              name="badge"
              value={info.badge}
              onChange={handleInfoChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-white outline-none font-medium focus:border-primary"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface">العنوان الرئيسي العريض</label>
            <input 
              required
              type="text"
              name="title"
              value={info.title}
              onChange={handleInfoChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-white outline-none font-medium focus:border-primary"
            />
          </div>
        </div>

        {/* الجزء الثاني: الميزات الديناميكية الثلاث */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">featured_play_list</span>
            إعدادات كروت الميزات (Features)
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {features.map((feat, index) => (
              <div key={feat.id || feat.feat_id} className="p-5 border border-outline-variant/40 rounded-xl bg-surface-container-low/40 space-y-4 relative">
                
                {/* ترقيم الكرت مع الأيقونة الحية المعاينة */}
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                  <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold">الميزة رقم {index + 1}</span>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="text-[10px] font-medium text-on-surface-variant">معاينة الأيقونة:</span>
                    <span className="material-symbols-outlined text-md">{feat.icon}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* كود الماتيريال أيكون */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant">اسم أيقونة ميريال (Material Icon)</label>
                    <input 
                      required
                      type="text"
                      value={feat.icon}
                      onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                      className="w-full border border-outline-variant rounded-xl p-2.5 text-xs bg-white font-mono text-primary outline-none focus:border-primary"
                    />
                  </div>
                  
                  {/* عنوان الميزة */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-on-surface-variant">عنوان الميزة</label>
                    <input 
                      required
                      type="text"
                      value={feat.title}
                      onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                      className="w-full border border-outline-variant rounded-xl p-2.5 text-xs bg-white font-medium outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* وصف الميزة */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant">وصف وتفاصيل الميزة</label>
                  <textarea 
                    required
                    rows="2"
                    value={feat.description}
                    onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                    className="w-full border border-outline-variant rounded-xl p-2.5 text-xs bg-white font-medium resize-none outline-none focus:border-primary"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-end pt-4 border-t border-outline-variant/20">
          <button 
            type="submit"
            className="bg-primary text-on-primary px-6 py-3 rounded-xl text-xs font-bold shadow-sm hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            حفظ إعدادات من نحن
          </button>
        </div>

      </form>
    </div>
  );
}

export default AboutDashboard;