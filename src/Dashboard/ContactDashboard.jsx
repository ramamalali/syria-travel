import { useState, useEffect } from "react";
import API from "@/Services/api";

function ContactDashboard() {
  const [activeTab, setActiveTab] = useState("info_management"); // التبديل بين: إدارة معلومات الاتصال و فلترة الرسائل الواردة
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({ title: "", description: "", address: "", email: "", map_img_url: "" });
  const [phones, setPhones] = useState([]);
  const [newPhone, setNewPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // 1. جلب معلومات الاتصال العامة والأرقام بناءً على مسار GET المتاح لديكِ
      const contactRes = await API.get("/contact-info");
      if (contactRes.data.settings) setSettings(contactRes.data.settings);
      if (contactRes.data.phones) setPhones(contactRes.data.phones);

      // 2. جلب الرسائل الواردة من الفورم للفلترة والتحكم
      const msgRes = await API.get("/contact-messages");
      setMessages(msgRes.data || []);
    } catch (err) {
      console.error("خطأ أثناء جلب البيانات في لوحة التحكم:", err);
    } finally {
      setLoading(false);
    }
  };

  // أ) تحديث الإعدادات ونصوص الاتصال العامة لقسم اتصل بنا
  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    API.put("/contact-info/settings", settings)
      .then(() => alert("🎉 تم تحديث بيانات ومعلومات التواصل الحية بنجاح!"))
      .catch(() => alert("❌ فشل تحديث معلومات الاتصال"));
  };

  // ب) إضافة رقم هاتف جديد لفروع الشركة
  const handleAddPhone = (e) => {
    e.preventDefault();
    if (!newPhone.trim()) return;
    API.post("/contact-info/phones", { phone_number: newPhone })
      .then(() => {
        alert("تم إضافة رقم الهاتف الجديد للموقع.");
        setNewPhone("");
        loadAllData();
      })
      .catch(() => alert("❌ خطأ أثناء إضافة الهاتف"));
  };

  // ج) حذف رقم هاتف من اللائحة
  const handleDeletePhone = (phoneNum) => {
    if (window.confirm(`هل تريدين إزالة خط الاتصال ${phoneNum} من الموقع؟`)) {
      API.delete(`/contact-info/phones/${phoneNum}`).then(() => {
        loadAllData();
      });
    }
  };

  // د) حذف وإرشفة رسالة واردة من صندوق الفورم
  const handleDeleteMessage = (id) => {
    if (window.confirm("هل ترغبين بحذف هذه الرسالة نهائياً من أرشيف الوارد؟")) {
      API.delete(`/contact-messages/${id}`).then(() => {
        alert("تم مسح الرسالة.");
        loadAllData();
      });
    }
  };

  // هـ) ترقية رسالة المدح إلى جدول آراء المسافرين (Testimonials) المطابق لجدولكِ تماماً
  const handlePromoteToTestimonial = (msg) => {
    API.post("/testimonials/promote-message", { full_name: msg.full_name, message: msg.message })
      .then(() => {
        alert("🌟 رائع جداً! تم تحويل ونشر رأي المسافر بنجاح في قسم الآراء بالموقع الرئيسي.");
        loadAllData();
      })
      .catch(() => alert("❌ حدث خطأ أثناء ترحيل ونشر الرأي"));
  };

  if (loading) return <div className="text-center p-12 text-xs font-bold animate-pulse text-primary">جاري تحميل شاشات التحكم وبيانات تواصل "سوا ترافيل"...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
      
      {/* هيدر الترويسة ونظام تبديل الأقسام الفسيح */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-outline-variant/20 pb-4 gap-4">
        <div>
          <h2 className="text-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">contact_phone</span>
            بوابة إدارة معلومات الاتصال ورسائل العملاء
          </h2>
          <p className="text-[11px] text-on-surface-variant mt-1">
            تحديث عناوين فروع "سوا ترافيل" الرسمية، وفرز وتصنيف رسائل الفورم الحية الواردة من المسافرين.
          </p>
        </div>
        
        {/* أزرار الانتقال والتبويب الثنائية لتجنب تداخل الشاشات */}
        <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl w-full md:w-auto">
          <button 
            onClick={() => setActiveTab("info_management")}
            className={`flex-1 md:flex-none text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1 ${activeTab === "info_management" ? "bg-primary text-on-primary shadow-xs" : "text-on-surface-variant hover:bg-surface-container-high"}`}
          >
            <span className="material-symbols-outlined text-xs">edit_attributes</span>
            إدارة معلومات الاتصال
          </button>
          <button 
            onClick={() => setActiveTab("messages_filter")}
            className={`flex-1 md:flex-none text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1 ${activeTab === "messages_filter" ? "bg-primary text-on-primary shadow-xs" : "text-on-surface-variant hover:bg-surface-container-high"}`}
          >
            <span className="material-symbols-outlined text-xs">filter_alt</span>
            فلترة الرسائل الواردة ({messages.length})
          </button>
        </div>
      </div>

      {/* [القسم الأول]: التحكم الكامل بمعلومات الاتصال، الخريطة، وأرقام الفروع حية */}
      {activeTab === "info_management" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* فورم تعديل العناوين والنصوص الإرشادية لصفحة اتصل بنا */}
          <form onSubmit={handleSettingsUpdate} className="lg:col-span-2 p-6 border border-outline-variant/30 rounded-2xl bg-white space-y-4">
            <h3 className="text-xs font-bold text-primary flex items-center gap-1 pb-2 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-sm">map</span>
              تعديل العناوين ونصوص المكاتب الرئيسية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-on-surface-variant">العنوان العريض الرئيسي</label>
                <input required type="text" value={settings.title || ""} onChange={e => setSettings({...settings, title: e.target.value})} className="border border-outline-variant/60 p-2.5 text-xs rounded-xl w-full outline-none focus:border-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-on-surface-variant">البريد الإلكتروني الرسمي للشركة</label>
                <input required type="email" value={settings.email || ""} onChange={e => setSettings({...settings, email: e.target.value})} className="border border-outline-variant/60 p-2.5 text-xs rounded-xl w-full outline-none font-mono focus:border-primary transition-colors" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[11px] font-bold text-on-surface-variant">الوصف الجغرافي والتفصيلي للموقع</label>
                <input required type="text" value={settings.address || ""} onChange={e => setSettings({...settings, address: e.target.value})} className="border border-outline-variant/60 p-2.5 text-xs rounded-xl w-full outline-none focus:border-primary transition-colors" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[11px] font-bold text-on-surface-variant">رابط الخريطة التفاعلية للموقع (Embed / Link URL)</label>
                <textarea rows="3" value={settings.map_img_url || ""} onChange={e => setSettings({...settings, map_img_url: e.target.value})} className="border border-outline-variant/60 p-2.5 text-xs rounded-xl w-full resize-none outline-none font-mono text-[11px] focus:border-primary transition-colors" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="bg-primary text-on-primary text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shadow-xs hover:bg-primary-hover transition-colors">
                حفظ معلومات التواصل الجديدة
              </button>
            </div>
          </form>

          {/* بوكس جانبي مريح لإدارة لائحة أرقام هواتف وسوا ترافيل الحية */}
          <div className="p-6 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest space-y-4">
            <h3 className="text-xs font-bold text-primary flex items-center gap-1 pb-2 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-sm">p2p</span>
              خطوط الاتصال والـ Call Center
            </h3>

            {/* فورم إضافة هاتف سريع */}
            <form onSubmit={handleAddPhone} className="flex gap-2">
              <input 
                required
                type="text" 
                placeholder="مثال: +963 933..." 
                value={newPhone} 
                onChange={e => setNewPhone(e.target.value)} 
                className="border border-outline-variant/60 p-2 text-xs rounded-xl flex-1 bg-white outline-none font-mono focus:border-primary"
              />
              <button type="submit" className="bg-secondary text-on-secondary text-xs font-bold px-3 py-2 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                إضافة
              </button>
            </form>

            {/* قائمة أرقام الهواتف المضافة حالياً بالحقل */}
            <div className="space-y-2 pt-2 max-h-[190px] overflow-y-auto custom-scrollbar">
              {phones.map((p, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-outline-variant/20 shadow-2xs font-mono text-xs">
                  <span className="text-on-surface font-semibold">📞 {p.phone_number}</span>
                  <button 
                    type="button"
                    onClick={() => handleDeletePhone(p.phone_number)}
                    className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer flex items-center"
                    title="حذف هذا الرقم"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* [القسم الثاني]: صفحة فلترة الرسائل الواردة، وتصنيف المليح منها ونقله للآراء بضغطة زر */}
      {activeTab === "messages_filter" && (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="p-12 border border-dashed border-outline-variant/50 rounded-2xl text-center text-xs text-on-surface-variant font-medium">
              صندوق رسائل اتصل بنا فارغ تماماً حالياً، لا يوجد رسائل بحاجة لفلترة.
            </div>
          ) : (
            messages.map((msg) => {
              // ذكاء الفرز التلقائي لتصنيف جودة الرسالة والفلترة البصرية للـ (المنيح / الشكاوى)
              const isComplaint = msg.inquiry_type?.includes("شكوى") || msg.message?.toLowerCase().includes("تأخير") || msg.message?.includes("سيء");
              const isPraise = msg.inquiry_type?.includes("مدح") || msg.message?.includes("شكر") || msg.message?.includes("رائع") || msg.message?.includes("ممتاز") || msg.message?.includes("رايع");

              let badgeStyle = "bg-blue-50 text-blue-700 border-blue-100";
              let computedType = msg.inquiry_type || "استفسار / طلب رحلة";

              if (isComplaint) { 
                badgeStyle = "bg-rose-50 text-rose-700 border-rose-100"; 
                computedType = "🚨 شكوى عاجلة"; 
              } else if (isPraise) { 
                badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-100"; 
                computedType = "🌟 رسالة ثناء ومدح (منيح)"; 
              }

              return (
                <div key={msg.id} className="border border-outline-variant/30 p-5 rounded-xl bg-white flex flex-col justify-between gap-4 hover:border-outline transition-all shadow-2xs">
                  
                  {/* هيدر الكرت وتفاصيل العميل الراسل */}
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
                    {/* شارة الفرز والتصنيف */}
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-lg ${badgeStyle}`}>
                      {computedType}
                    </span>
                  </div>

                  {/* نص نص الرسالة المريح مساحياً */}
                  <div className="p-3.5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-xs text-on-surface leading-relaxed text-justify font-medium">
                    {msg.message}
                  </div>

                  {/* اتخاذ القرارات: المليح يضاف مباشرة لقسم آراء المسافرين بجدولكِ */}
                  <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10 gap-2">
                    <div>
                      {isPraise && (
                        <button 
                          onClick={() => handlePromoteToTestimonial(msg)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                        >
                          <span className="material-symbols-outlined text-xs">workspace_premium</span>
                          نشر فوري في آراء المسافرين
                        </button>
                      )}
                    </div>
                    <button 
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <span className="material-symbols-outlined text-xs">delete_outline</span>
                      حذف ومسح الرسالة
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>
      )}

    </div>
  );
}

export default ContactDashboard;