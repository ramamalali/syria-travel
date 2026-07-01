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

  if (loading) return <div className="text-center p-12 text-xs font-bold animate-pulse text-primary">جاري تحميل مراجعات وتقييمات المسافرين...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
      
      {/* الترويسة العلوية */}
      <div className="border-b border-outline-variant/20 pb-5">
        <h2 className="text-sm sm:text-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg md:text-xl">star_rate</span>
          إدارة آراء ومراجعات المسافرين ({testimonials.length})
        </h2>
        <p className="text-[11px] text-on-surface-variant mt-1.5 leading-relaxed">
          هنا يمكنكِ مراقبة وإدارة بطاقات التقييم والثناء التي تظهر في الواجهة الرئيسية لـ "سوا ترافيل". يمكنكِ إقصاء أي تقييم لم يعد مناسباً بضغطة زر.
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
              className="border border-outline-variant/30 rounded-2xl p-6 bg-white flex flex-col justify-between hover:border-outline/60 hover:shadow-xs transition-all min-h-[260px] space-y-4"
            >
              <div className="space-y-4">
                
                {/* الهيدر العمودي الجديد: الصورة في الأعلى وتحتها الاسم والصفة في المنتصف */}
                <div className="flex flex-col items-center text-center w-full space-y-2">
                  <img 
                    src={test.avatar || test.avatar_url} 
                    alt={test.name} 
                    className="w-14 h-14 rounded-full border-2 border-primary/10 bg-surface-container shrink-0 object-cover" 
                  />
                  <div className="w-full">
                    <h4 className="text-xs font-bold text-primary leading-tight px-1 truncate" title={test.name}>
                      {test.name}
                    </h4>
                    <p className="text-[10px] text-on-surface-variant font-medium mt-1 px-1 truncate">
                      {test.role}
                    </p>
                  </div>
                </div>

                {/* استعراض التقييم بالنجوم متمركز في المنتصف تحت الاسم */}
                <div className="flex justify-center gap-0.5 text-amber-500 pt-0.5">
                  {Array.from({ length: test.rating || 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-xs font-filled">star</span>
                  ))}
                </div>

                {/* نص التعليق مريح جداً وبمحاذاة متزنة */}
                <p className="text-[11px] text-on-surface font-medium leading-relaxed text-center block pt-1">
                  "{test.comment}"
                </p>
              </div>

              {/* قسم التحكم السفلي */}
              <div className="pt-3 border-t border-outline-variant/10 flex justify-end w-full">
                <button 
                  onClick={() => handleDeleteTestimonial(test.review_id)}
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