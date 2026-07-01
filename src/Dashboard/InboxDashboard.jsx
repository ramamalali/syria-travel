import { useState, useEffect } from "react";
import API from "@/Services/api";

function InboxDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setLoading(true);
    API.get("/contact-messages")
      .then((res) => {
        setMessages(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب رسائل الوارد:", err);
        setLoading(false);
      });
  };

  // حذف رسالة
  const handleDeleteMessage = (id) => {
    if (window.confirm("هل ترغبين بحذف هذه الرسالة نهائياً من صندوق الوارد؟")) {
      API.delete(`/contact-messages/${id}`).then(() => {
        alert("تم مسح الرسالة بنجاح.");
        fetchMessages();
      });
    }
  };

  // ترقية رسالة المدح إلى قسم آراء المسافرين
  const handlePromote = (msg) => {
    API.post("/testimonials/promote-message", { full_name: msg.full_name, message: msg.message })
      .then(() => {
        alert("🌟 تم نقل ثناء العميل بنجاح ونشره في قسم آراء المسافرين الخارجي!");
        fetchMessages();
      })
      .catch(() => alert("❌ فشل ترحيل الرسالة"));
  };

  if (loading) return <div className="text-center p-12 text-xs font-bold animate-pulse text-primary">جاري مراجعة ورصد صندوق الرسائل الحية...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
      
      {/* الترويسة */}
      <div className="border-b border-outline-variant/20 pb-4">
        <h2 className="text-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">mail</span>
          صندوق الوارد ورسائل المسافرين ({messages.length})
        </h2>
        <p className="text-[11px] text-on-surface-variant mt-1">
          هنا تصل جميع الاستفسارات والشكاوى الحية المرسلة من فورم "اتصل بنا". يمكنك فرزها وترقية الرسائل الممتازة مباشرة لصفحة الموقع الرئيسية.
        </p>
      </div>

      {/* قائمة الرسائل المفلترة ذكياً */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 border border-dashed border-outline-variant/50 rounded-2xl text-center text-xs text-on-surface-variant font-medium">
            صندوق الوارد فارغ حالياً، لا توجد رسائل جديدة.
          </div>
        ) : (
          messages.map((msg) => {
            // ذكاء التصنيف التلقائي بناءً على الحقول والنصوص المتوفرة بالباك
            const isComplaint = msg.inquiry_type?.includes("شكوى") || msg.message?.toLowerCase().includes("تأخير") || msg.message?.includes("سيء");
            const isPraise = msg.inquiry_type?.includes("مدح") || msg.message?.includes("شكر") || msg.message?.includes("رائع") || msg.message?.includes("ممتاز") || msg.message?.includes("رايع");

            let badgeStyle = "bg-blue-50 text-blue-700 border-blue-100";
            let computedType = msg.inquiry_type || "استفسار عام";

            if (isComplaint) { badgeStyle = "bg-rose-50 text-rose-700 border-rose-100"; computedType = "🚨 شكوى عاجلة"; }
            else if (isPraise) { badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-100"; computedType = "🌟 رسالة ثناء ومدح"; }

            return (
              <div key={msg.id} className="border border-outline-variant/30 p-5 rounded-xl bg-white flex flex-col justify-between gap-4 hover:border-outline transition-all shadow-2xs">
                
                {/* معلومات العميل */}
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">account_box</span>
                      {msg.full_name}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-[10px] text-on-surface-variant font-mono">
                      <span>📱 {msg.phone}</span>
                      {msg.email && <span>📧 {msg.email}</span>}
                      {msg.created_at && <span className="text-on-surface-variant/70">📅 {new Date(msg.created_at).toLocaleDateString("ar-SY")}</span>}
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-lg ${badgeStyle}`}>
                    {computedType}
                  </span>
                </div>

                {/* نص الرسالة */}
                <div className="p-3.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-xs text-on-surface leading-relaxed text-justify font-medium">
                  {msg.message}
                </div>

                {/* الأزرار الإجرائية */}
                <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10 gap-2">
                  <div>
                    {isPraise && (
                      <button 
                        onClick={() => handlePromote(msg)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <span className="material-symbols-outlined text-xs">publish</span>
                        نشر فوري في آراء المسافرين
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <span className="material-symbols-outlined text-xs">delete_outline</span>
                    مسح الرسالة
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

export default InboxDashboard;