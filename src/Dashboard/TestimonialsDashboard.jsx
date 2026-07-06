import { useState, useEffect } from "react";
import API from "@/Services/api";

function TestimonialsDashboard() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    setLoading(true);
    API.get("/testimonials")
      .then((res) => {
        setTestimonials(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب آراء المسافرين:", err);
        setLoading(false);
      });
  };

  const handleDeleteTestimonial = (reviewId) => {
    if (window.confirm("هل أنتِ متأكدة تماماً من إلغاء نشر هذا الرأي وحذفه من الواجهة الرئيسية؟")) {
      API.delete(`/testimonials/${reviewId}`)
        .then(() => {
          alert("🎉 تمت إزالة الرأي بنجاح من شاشات العرض.");
          fetchTestimonials();
        })
        .catch(() => alert("❌ فشل حذف الرأي من قاعدة البيانات"));
    }
  };

  // دالة مساعدة لتأمين قراءة النصوص المترجمة أو العادية منعاً لانهيار الواجهة
  const renderText = (field, lang = "ar") => {
    if (!field) return "";
    if (typeof field === "object") {
      return field[lang] || field["ar"] || "";
    }
    return field;
  };

  if (loading) return <div className="text-center p-12 text-xs font-bold animate-pulse text-primary">جاري تحميل مراجعات وتقييمات المسافرين...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm" dir="rtl">
      
      {/* الترويسة العلوية */}
      <div className="border-b border-outline-variant/20 pb-5">
        <h2 className="text-sm sm:text-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg md:text-xl">star_rate</span>
          إدارة آراء ومراجعات المسافرين ({testimonials.length})
        </h2>
        <p className="text-[11px] text-on-surface-variant mt-1.5 leading-relaxed">
          هنا يمكنكِ مراقبة وإدارة بطاقات التقييم والثناء التي تظهر في الواجهة الرئيسية لـ "سوا ترافيل". يعرض النظام المراجعات باللغتين لضمان دقة الترجمة، ويمكنكِ إقصاء أي تقييم بضغطة زر.
        </p>
      </div>

      {/* شبكة العرض المحسنة */}
      {testimonials.length === 0 ? (
        <div className="p-12 border border-dashed border-outline-variant/50 rounded-2xl text-center text-xs text-on-surface-variant font-medium">
          لا توجد آراء مسافرين منشورة في الموقع حالياً.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div 
              key={test.id || test.review_id} 
              className="border border-outline-variant/30 rounded-2xl p-6 bg-white flex flex-col justify-between hover:border-outline/60 hover:shadow-xs transition-all min-h-[300px] space-y-4"
            >
              <div className="space-y-4">
                
                {/* الهيدر العمودي: الصورة في الأعلى وتحتها الاسم والصفة لكلا اللغتين */}
                <div className="flex flex-col items-center text-center w-full space-y-2">
                  <img 
                    src={test.avatar || test.avatar_url} 
                    alt={renderText(test.name, "ar")} 
                    className="w-14 h-14 rounded-full border-2 border-primary/10 bg-surface-container shrink-0 object-cover" 
                  />
                  <div className="w-full space-y-0.5">
                    {/* الاسم باللغتين */}
                    <h4 className="text-xs font-bold text-primary leading-tight px-1 truncate" title={renderText(test.name, "ar")}>
                      🇸🇾 {renderText(test.name, "ar")}
                    </h4>
                    <h4 className="text-[11px] font-bold text-secondary leading-tight px-1 truncate" dir="ltr" title={renderText(test.name, "en")}>
                      🇬🇧 {renderText(test.name, "en")}
                    </h4>
                    
                    {/* الصفة باللغتين */}
                    <p className="text-[10px] text-on-surface-variant font-semibold px-1 truncate">
                      {renderText(test.role, "ar")} | <span dir="ltr">{renderText(test.role, "en")}</span>
                    </p>
                  </div>
                </div>

                {/* استعراض التقييم بالنجوم متمركز في المنتصف تحت الاسم */}
                <div className="flex justify-center gap-0.5 text-amber-500 pt-0.5">
                  {Array.from({ length: test.rating || 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>

                {/* نص التعليق المترجم في صندوقين واضحين لسهولة المراجعة */}
                <div className="space-y-2 pt-2 border-t border-dashed border-outline-variant/20">
                  <p className="text-[11px] text-on-surface font-medium leading-relaxed text-justify">
                    <span className="font-bold text-[9px] text-primary ml-1">AR:</span>
                    "{renderText(test.comment, "ar")}"
                  </p>
                  <p className="text-[10px] text-on-surface-variant font-medium leading-relaxed text-left" dir="ltr">
                    <span className="font-bold text-[9px] text-secondary mr-1">EN:</span>
                    "{renderText(test.comment, "en")}"
                  </p>
                </div>
              </div>

              {/* قسم التحكم السفلي */}
              <div className="pt-3 border-t border-outline-variant/10 flex justify-end w-full">
                <button 
                  onClick={() => handleDeleteTestimonial(test.id || test.review_id)}
                  className="text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-end"
                >
                  <span className="material-symbols-outlined text-xs">remove_circle_outline</span>
                  إلغاء النشر بالموقع
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default TestimonialsDashboard;