import { useState, useEffect } from "react";
import API from "@/Services/api";

function HeroDashboard() {
  const [formData, setFormData] = useState({
    headline_main: "",
    headline_sub: "",
    description: "",
    btn_book: "",
    btn_explore: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // 1. جلب البيانات الحالية من الباك آيند لملء الحقول تلقائياً
  useEffect(() => {
    API.get("/hero")
      .then((res) => {
        if (res.data) {
          setFormData(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب بيانات الـ Hero:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 2. إرسال التحديثات للباك آيند عند الضغط على حفظ
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage({ type: "info", text: "جاري حفظ التعديلات..." });

    API.put("/hero", formData)
      .then((res) => {
        setStatusMessage({ type: "success", text: "🎉 تم تحديث بيانات القسم الرئيسي (Hero) بنجاح!" });
        // إخفاء الرسالة بعد 4 ثوانٍ
        setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
      })
      .catch((err) => {
        console.error("خطأ في تحديث البيانات:", err);
        setStatusMessage({ type: "error", text: "❌ حدث خطأ أثناء الحفظ، يرجى المحاولة لاحقاً." });
      });
  };

  if (loading) {
    return <div className="p-8 text-center text-primary font-bold animate-pulse">جاري تحميل إعدادات القسم الرئيسي...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/20 my-10">
      
      {/* هيدر القسم */}
      <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-6 mb-8">
        <span className="material-symbols-outlined text-3xl text-primary">view_carousel</span>
        <div>
          <h2 className="text-xl font-bold text-primary">التحكم بالقسم الرئيسي (Hero Section)</h2>
          <p className="text-xs text-on-surface-variant">تعديل النصوص، العناوين العريضة وأزرار الحجز الظاهرة في واجهة الموقع</p>
        </div>
      </div>

      {/* رسائل الحالة */}
      {statusMessage.text && (
        <div className={`p-4 rounded-xl text-xs font-bold mb-6 transition-all ${
          statusMessage.type === "success" ? "bg-green-100 text-green-800 border border-green-200" :
          statusMessage.type === "error" ? "bg-rose-100 text-rose-800 border border-rose-200" :
          "bg-blue-100 text-blue-800 border border-blue-200"
        }`}>
          {statusMessage.text}
        </div>
      )}

      {/* الـ Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* العنوان الرئيسي */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">العنوان الرئيسي العريض</label>
            <input 
              required
              type="text"
              name="headline_main"
              value={formData.headline_main}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
              placeholder="مثال: سوا نسافر..."
            />
          </div>

          {/* العنوان الفرعي الملّون */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">العنوان الفرعي (الملوّن)</label>
            <input 
              required
              type="text"
              name="headline_sub"
              value={formData.headline_sub}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
              placeholder="مثال: سوريا بكل تفاصيلها"
            />
          </div>
        </div>

        {/* الوصف المطول */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-primary">الوصف والفقرة الترحيبية</label>
          <textarea 
            required
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium resize-none"
            placeholder="اكتب نبذة قصيرة تشجع الزوار على استكشاف الموقع..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* نص زر الحجز */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">نص زر الحجز الرئيسي</label>
            <input 
              required
              type="text"
              name="btn_book"
              value={formData.btn_book}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
            />
          </div>

          {/* نص زر الاستكشاف */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">نص زر استكشاف الوجهات</label>
            <input 
              required
              type="text"
              name="btn_explore"
              value={formData.btn_explore}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
            />
          </div>
        </div>

        {/* أزرار التحكم بالـ Form */}
        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
          <button 
            type="submit"
            className="bg-primary text-on-primary px-6 py-3 rounded-xl text-xs font-bold shadow-md hover:bg-primary-dim transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            حفظ التعديلات ونشرها حية
          </button>
        </div>

      </form>
    </div>
  );
}

export default HeroDashboard;