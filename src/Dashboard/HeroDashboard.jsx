import { useState, useEffect } from "react";
import API from "@/Services/api";

function HeroDashboard() {
  const [formData, setFormData] = useState({
    headline_main_ar: "",
    headline_main_en: "",
    headline_sub_ar: "",
    headline_sub_en: "",
    description_ar: "",
    description_en: "",
    btn_book_ar: "",
    btn_book_en: "",
    btn_explore_ar: "",
    btn_explore_en: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // 1. جلب البيانات الحالية بالكامل (الحقول العربية والإنجليزية) لملء الفورم
  useEffect(() => {
    API.get("/hero")
      .then((res) => {
        if (res.data) {
          setFormData({
            headline_main_ar: res.data.headline_main_ar || "",
            headline_main_en: res.data.headline_main_en || "",
            headline_sub_ar: res.data.headline_sub_ar || "",
            headline_sub_en: res.data.headline_sub_en || "",
            description_ar: res.data.description_ar || "",
            description_en: res.data.description_en || "",
            btn_book_ar: res.data.btn_book_ar || "",
            btn_book_en: res.data.btn_book_en || "",
            btn_explore_ar: res.data.btn_explore_ar || "",
            btn_explore_en: res.data.btn_explore_en || ""
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب بيانات الـ Hero للداشبورد:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 2. إرسال التحديثات المزدوجة للباك آيند عند الحفظ
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage({ type: "info", text: "جاري حفظ التعديلات للغتين..." });

    API.put("/hero", formData)
      .then((res) => {
        setStatusMessage({ type: "success", text: "🎉 تم تحديث بيانات القسم الرئيسي (Hero) باللغتين بنجاح!" });
        setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
      })
      .catch((err) => {
        console.error("خطأ في تحديث البيانات السحابية:", err);
        setStatusMessage({ type: "error", text: "❌ حدث خطأ أثناء الحفظ، يرجى المحاولة لاحقاً." });
      });
  };

  if (loading) {
    return <div className="p-8 text-center text-primary font-bold animate-pulse">جاري تحميل إعدادات القسم الرئيسي...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/20 my-10" dir="rtl">
      
      {/* هيدر القسم */}
      <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-6 mb-8">
        <span className="material-symbols-outlined text-3xl text-primary">view_carousel</span>
        <div>
          <h2 className="text-xl font-bold text-primary">التحكم بالقسم الرئيسي (Hero Section)</h2>
          <p className="text-xs text-on-surface-variant">تعديل النصوص، العناوين العريضة وأزرار الحجز باللغتين العربية والإنجليزية</p>
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
        
        {/* صف العنوان الرئيسي المزدوج */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">العنوان الرئيسي العريض (عربي)</label>
            <input 
              required
              type="text"
              name="headline_main_ar"
              value={formData.headline_main_ar}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
              placeholder="مثال: سوا نسافر..."
            />
          </div>
          <div className="space-y-1.5" dir="ltr">
            <label className="text-xs font-bold text-primary block text-right" dir="rtl">العنوان الرئيسي العريض (English)</label>
            <input 
              required
              type="text"
              name="headline_main_en"
              value={formData.headline_main_en}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium text-left"
              placeholder="Example: Let's travel together..."
            />
          </div>
        </div>

        {/* صف العنوان الفرعي المزدوج */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">العنوان الفرعي الملوّن (عربي)</label>
            <input 
              required
              type="text"
              name="headline_sub_ar"
              value={formData.headline_sub_ar}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
              placeholder="مثال: سوريا بكل تفاصيلها"
            />
          </div>
          <div className="space-y-1.5" dir="ltr">
            <label className="text-xs font-bold text-primary block text-right" dir="rtl">العنوان الفرعي الملوّن (English)</label>
            <input 
              required
              type="text"
              name="headline_sub_en"
              value={formData.headline_sub_en}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium text-left"
              placeholder="Example: Syria in all its details"
            />
          </div>
        </div>

        {/* الوصف المطول - عربي */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-primary">الوصف والفقرة الترحيبية (عربي)</label>
          <textarea 
            required
            rows="3"
            name="description_ar"
            value={formData.description_ar}
            onChange={handleChange}
            className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium resize-none"
            placeholder="اكتب نبذة قصيرة تشجع الزوار باللغة العربية..."
          />
        </div>

        {/* الوصف المطول - إنجليزي */}
        <div className="space-y-1.5" dir="ltr">
          <label className="text-xs font-bold text-primary block text-right" dir="rtl">الوصف والفقرة الترحيبية (English)</label>
          <textarea 
            required
            rows="3"
            name="description_en"
            value={formData.description_en}
            onChange={handleChange}
            className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium resize-none text-left"
            placeholder="Write a short description to encourage visitors in English..."
          />
        </div>

        {/* أزرار الحجز والاستكشاف - عربي */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">نص زر الحجز الرئيسي (عربي)</label>
            <input 
              required
              type="text"
              name="btn_book_ar"
              value={formData.btn_book_ar}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">نص زر استكشاف الوجهات (عربي)</label>
            <input 
              required
              type="text"
              name="btn_explore_ar"
              value={formData.btn_explore_ar}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
            />
          </div>
        </div>

        {/* أزرار الحجز والاستكشاف - إنجليزي */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="ltr">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary block text-right" dir="rtl">نص زر الحجز الرئيسي (English)</label>
            <input 
              required
              type="text"
              name="btn_book_en"
              value={formData.btn_book_en}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium text-left"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary block text-right" dir="rtl">نص زر استكشاف الوجهات (English)</label>
            <input 
              required
              type="text"
              name="btn_explore_en"
              value={formData.btn_explore_en}
              onChange={handleChange}
              className="w-full border border-outline-variant rounded-xl p-3 text-xs bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium text-left"
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