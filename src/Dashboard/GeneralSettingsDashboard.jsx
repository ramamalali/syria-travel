import { useState } from "react";

function GeneralSettingsDashboard() {
  // حالات وهمية للهيكل المرئي فقط (تتصل بالباك إيند مستقبلاً)
  const [siteName, setSiteName] = useState("سوا ترافيل | Sawa Travel");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [socialLinks, setSocialLinks] = useState({ facebook: "https://facebook.com/sawatravel", instagram: "https://instagram.com/sawatravel", whatsapp: "+963933111222" });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert("⚙️ تم حفظ الإعدادات العامة هيكلياً! هذا الزر جاهز للربط مع API السيرفر مستقبلاً.");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
      
      {/* ترويسة القسم */}
      <div className="border-b border-outline-variant/20 pb-4">
        <h2 className="text-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">settings</span>
          الإعدادات العامة للنظام للوحة التحكم
        </h2>
        <p className="text-[11px] text-on-surface-variant mt-1">
          تخصيص هوية المنصة، تفعيل وضع الصيانة، وإدارة الروابط الخارجية للموقع دون تعديل الكود.
        </p>
      </div>

      {/* نموذج الإعدادات الهيكلي */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* القسم الأول: هوية الموقع والمنصة */}
        <div className="p-6 border border-outline-variant/30 rounded-2xl bg-white space-y-4">
          <h3 className="text-xs font-bold text-primary flex items-center gap-1 pb-2 border-b border-outline-variant/20">
            <span className="material-symbols-outlined text-sm">language</span>
            هوية وتسمية المنصة الرئيسية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant">اسم الموقع (SEO Title)</label>
              <input 
                type="text" 
                value={siteName} 
                onChange={(e) => setSiteName(e.target.value)}
                className="border border-outline-variant/60 p-2.5 text-xs rounded-xl w-full outline-none focus:border-primary transition-colors" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant">اللغة الافتراضية للنظام</label>
              <select className="border border-outline-variant/60 p-2.5 text-xs rounded-xl w-full bg-white outline-none">
                <option value="ar">العربية (Arabic)</option>
                <option value="en">الإنجليزية (English)</option>
              </select>
            </div>
          </div>
        </div>

        {/* القسم الثاني: روابط التواصل الاجتماعي (Social Media) */}
        <div className="p-6 border border-outline-variant/30 rounded-2xl bg-white space-y-4">
          <h3 className="text-xs font-bold text-primary flex items-center gap-1 pb-2 border-b border-outline-variant/20">
            <span className="material-symbols-outlined text-sm">share</span>
            روابط الحسابات الرسمية (تنعكس في الفوتر)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant">رابط فيسبوك</label>
              <input 
                type="text" 
                value={socialLinks.facebook} 
                onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
                className="border border-outline-variant/60 p-2.5 text-xs rounded-xl w-full outline-none font-mono text-[11px]" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant">رابط إنستغرام</label>
              <input 
                type="text" 
                value={socialLinks.instagram} 
                onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                className="border border-outline-variant/60 p-2.5 text-xs rounded-xl w-full outline-none font-mono text-[11px]" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant">رقم الواتساب الرسمي</label>
              <input 
                type="text" 
                value={socialLinks.whatsapp} 
                onChange={(e) => setSocialLinks({...socialLinks, whatsapp: e.target.value})}
                className="border border-outline-variant/60 p-2.5 text-xs rounded-xl w-full outline-none font-mono text-[11px]" 
              />
            </div>
          </div>
        </div>

        {/* القسم الثالث: الحماية ووضع الصيانة (Maintenance Mode) */}
        <div className="p-6 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">construction</span>
                وضع الصيانة والإغلاق المؤقت (Maintenance Mode)
              </h3>
              <p className="text-[10px] text-on-surface-variant mt-0.5">
                عند تفعيل هذا الخيار، سيتم إغلاق واجهة الموقع الخارجية بوجه الزوار وعرض صفحة "قيد الصيانة".
              </p>
            </div>
            
            {/* زر سويتش وهمي لتغيير وضع الصيانة */}
            <button
              type="button"
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer duration-200 focus:outline-none ${maintenanceMode ? "bg-rose-600 flex justify-end" : "bg-outline-variant flex justify-start"}`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md block"></span>
            </button>
          </div>
          {maintenanceMode && (
            <div className="text-[10px] text-rose-600 font-bold bg-rose-50 border border-rose-100 p-2.5 rounded-xl animate-pulse">
              🚨 تنبيه: الموقع الخارجي مغلق الآن ويظهر رسالة الصيانة للمسافرين!
            </div>
          )}
        </div>

        {/* زر الحفظ النهائي */}
        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-primary text-on-primary text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-xs hover:opacity-90 transition-opacity">
            حفظ التغييرات العامة
          </button>
        </div>

      </form>

    </div>
  );
}

export default GeneralSettingsDashboard;