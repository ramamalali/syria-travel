import { useState, useEffect } from "react";
import API from "@/Services/api";

function TreasuresDashboard() {
  const [activeTab, setActiveTab] = useState("cities");
  const [sectionSettings, setSectionSettings] = useState({ 
    title_ar: "", title_en: "", 
    description_ar: "", description_en: "", 
    viewAllText_ar: "", viewAllText_en: "" 
  });
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // نموذج إضافة معلم جديد يدعم اللغتين
  const [newMonf, setNewMonf] = useState({ 
    title_ar: "", title_en: "", 
    description_ar: "", description_en: "", 
    image_url: "", 
    location_ar: "", location_en: "", 
    tags_ar: "", tags_en: "" 
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // نطلب البيانات بدون تمرير ?lang ليعود الباك آيند بكافة الحقول المزدوجة للداشبورد
      const res = await API.get("/destinations-section");
      setSectionSettings({
        title_ar: res.data.title_ar || "",
        title_en: res.data.title_en || "",
        description_ar: res.data.description_ar || "",
        description_en: res.data.description_en || "",
        viewAllText_ar: res.data.viewAllText_ar || "",
        viewAllText_en: res.data.viewAllText_en || ""
      });
      setCities(res.data.items || []);
      if (res.data.items && res.data.items.length > 0) {
        setSelectedCity(res.data.items[0].id);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // جلب معالم المدينة للداشبورد (بدون تصفية لغوية لعرض الهيكل الكامل)
  useEffect(() => {
    if (selectedCity) {
      API.get(`/monuments/${selectedCity}`).then(res => setMonuments(res.data));
    }
  }, [selectedCity]);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put("/destinations-section/settings", {
        title_ar: sectionSettings.title_ar,
        title_en: sectionSettings.title_en,
        description_ar: sectionSettings.description_ar,
        description_en: sectionSettings.description_en,
        view_all_text_ar: sectionSettings.viewAllText_ar,
        view_all_text_en: sectionSettings.viewAllText_en
      });
      alert("🎉 تم تحديث الإعدادات العامة باللغتين بنجاح!");
    } catch (err) {
      alert("❌ فشل تحديث الإعدادات العريضة");
    }
  };

  const handleCityFieldChange = (id, field, value) => {
    setCities(cities.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleUpdateCity = async (id, cityData) => {
    try {
      await API.put(`/destinations/${id}`, {
        title_ar: cityData.title_ar,
        title_en: cityData.title_en,
        description_ar: cityData.description_ar,
        description_en: cityData.description_en,
        image_url: cityData.image
      });
      alert(`🎉 تم تحديث بيانات محافظة ${cityData.title_ar} باللغتين بنجاح!`);
    } catch (err) {
      alert("❌ فشل حفظ تعديلات المحافظة");
    }
  };

  const handleAddMonument = async (e) => {
    e.preventDefault();
    try {
      const tagsArArray = newMonf.tags_ar.split(",").map(t => t.trim()).filter(t => t !== "");
      const tagsEnArray = newMonf.tags_en.split(",").map(t => t.trim()).filter(t => t !== "");

      const res = await API.post("/monuments", { 
        ...newMonf, 
        destination_id: selectedCity, 
        tags_ar: tagsArArray,
        tags_en: tagsEnArray
      });

      setMonuments([...monuments, res.data]);
      setNewMonf({ 
        title_ar: "", title_en: "", 
        description_ar: "", description_en: "", 
        image_url: "", 
        location_ar: "", location_en: "", 
        tags_ar: "", tags_en: "" 
      });
      alert("🎉 تم إضافة المعلم الأثري المترجم بنجاح!");
    } catch (err) {
      alert("❌ خطأ في إضافة المعلم");
    }
  };

  const handleDeleteMonument = async (id) => {
    if (window.confirm("هل أنتِ متأكدة من حذف هذا المعلم التاريخي تماماً؟")) {
      try {
        await API.delete(`/monuments/${id}`);
        setMonuments(monuments.filter(m => m.id !== id));
      } catch (err) {
        alert("❌ فشل الحذف");
      }
    }
  };

  if (loading) return <div className="text-center p-12 text-xs font-bold animate-pulse text-primary">جاري تحميل سجلات التاريخ السوري...</div>;

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-outline-variant/20 shadow-sm p-4 md:p-8" dir="rtl">
      
      {/* رأس الصفحة والمبدل */}
      <div className="mb-6 border-b border-outline-variant/20 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">account_balance</span>
            إدارة الكنوز والمعالم الأثرية (ثنائي اللغة 🌍)
          </h2>
          <p className="text-[11px] text-on-surface-variant mt-1">
            التحكم الكامل ببيانات المحافظات وإدارة بطاقات المعالم التاريخية التابعة لها باللغتين العربية والإنجليزية.
          </p>
        </div>
        
        <div className="flex gap-2 bg-surface-container-high p-1 rounded-xl self-start lg:self-auto">
          <button 
            onClick={() => setActiveTab("cities")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "cities" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"}`}
          >
            المحافظات والعناوين العامة
          </button>
          <button 
            onClick={() => setActiveTab("monuments")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "monuments" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"}`}
          >
            المعالم التفصيلية لكل محافظة
          </button>
        </div>
      </div>

      {/* ================= التبويب الأول: المحافظات والإعدادات العامة ================= */}
      {activeTab === "cities" && (
        <div className="space-y-8">
          
          {/* نموذج الإعدادات العامة باللغتين */}
          <form onSubmit={handleSettingsSubmit} className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">tune</span>إعدادات القسم العامة (عربي / EN)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" value={sectionSettings.title_ar} onChange={e => setSectionSettings({...sectionSettings, title_ar: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary" placeholder="العنوان الرئيسي (عربي)" />
              <input type="text" value={sectionSettings.title_en} onChange={e => setSectionSettings({...sectionSettings, title_en: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary text-left font-mono" placeholder="Main Title (English)" dir="ltr" />
              
              <input type="text" value={sectionSettings.viewAllText_ar} onChange={e => setSectionSettings({...sectionSettings, viewAllText_ar: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary" placeholder="نص زر عرض الكل (عربي)" />
              <input type="text" value={sectionSettings.viewAllText_en} onChange={e => setSectionSettings({...sectionSettings, viewAllText_en: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary text-left font-mono" placeholder="View All Button Text (English)" dir="ltr" />
              
              <textarea className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary resize-none" rows="2" value={sectionSettings.description_ar} onChange={e => setSectionSettings({...sectionSettings, description_ar: e.target.value})} placeholder="الوصف الفرعي للقسم (عربي)" />
              <textarea className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary resize-none text-left font-mono" rows="2" value={sectionSettings.description_en} onChange={e => setSectionSettings({...sectionSettings, description_en: e.target.value})} placeholder="Sub-description (English)" dir="ltr" />
            </div>
            <button type="submit" className="bg-primary text-on-primary text-xs px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-primary/90">حفظ كافة العناوين</button>
          </form>

          {/* جدول إدارة المحافظات المطور */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">edit_location_alt</span>تعديل بيانات المحافظات والكرت التعريفي المزدوج
            </h3>
            
            <div className="overflow-x-auto border border-outline-variant/30 rounded-xl">
              <table className="w-full text-right text-xs min-w-[900px]">
                <thead className="bg-surface-container-low text-on-surface font-bold border-b border-outline-variant/30">
                  <tr>
                    <th className="p-3 w-44">المحافظة (عربي / EN)</th>
                    <th className="p-3">الوصف التعريفي للكرت (عربي / EN)</th>
                    <th className="p-3 w-52">رابط صورة الغلاف</th>
                    <th className="p-3 w-24 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {cities.map((city) => (
                    <tr key={city.id} className="hover:bg-surface-container-lowest transition-all">
                      {/* أسماء المحافظات التنافسية */}
                      <td className="p-2 space-y-2">
                        <input type="text" value={city.title_ar || ""} onChange={(e) => handleCityFieldChange(city.id, "title_ar", e.target.value)} className="w-full border border-outline-variant p-1.5 rounded-lg font-bold text-primary bg-white text-xs outline-none focus:border-primary" placeholder="الاسم العربي" />
                        <input type="text" value={city.title_en || ""} onChange={(e) => handleCityFieldChange(city.id, "title_en", e.target.value)} className="w-full border border-outline-variant p-1.5 rounded-lg font-mono text-secondary bg-white text-[11px] outline-none focus:border-primary text-left" dir="ltr" placeholder="English name" />
                      </td>
                      {/* نصوص وصف الكروت للغتين */}
                      <td className="p-2 space-y-2">
                        <textarea rows="1" value={city.description_ar || ""} onChange={(e) => handleCityFieldChange(city.id, "description_ar", e.target.value)} className="w-full border border-outline-variant p-1.5 rounded-lg text-on-surface bg-white text-xs outline-none focus:border-primary resize-none" placeholder="الوصف العربي" />
                        <textarea rows="1" value={city.description_en || ""} onChange={(e) => handleCityFieldChange(city.id, "description_en", e.target.value)} className="w-full border border-outline-variant p-1.5 rounded-lg text-on-surface-variant bg-white text-[11px] font-mono outline-none focus:border-primary resize-none text-left" dir="ltr" placeholder="English description" />
                      </td>
                      {/* رابط الصورة */}
                      <td className="p-2">
                        <input type="text" value={city.image || ""} onChange={(e) => handleCityFieldChange(city.id, "image", e.target.value)} className="w-full border border-outline-variant p-1.5 rounded-lg text-secondary font-mono text-[10px] bg-white outline-none focus:border-primary" />
                      </td>
                      {/* زر الحفظ */}
                      <td className="p-2 text-center vertical-middle">
                        <button type="button" onClick={() => handleUpdateCity(city.id, city)} className="bg-primary/10 text-primary hover:bg-primary hover:text-on-primary p-2 rounded-xl transition-all font-bold text-[11px] cursor-pointer inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">save</span>حفظ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= التبويب الثاني: المعالم التفصيلية والتصميم المريح ================= */}
      {activeTab === "monuments" && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
            <label className="text-xs font-bold text-primary whitespace-nowrap">اختر المحافظة لاستعراض معالمها:</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="p-2 border border-outline-variant bg-white rounded-xl text-xs font-bold outline-none text-on-surface focus:border-primary">
              {cities.map(c => <option key={c.id} value={c.id}>{c.title_ar}</option>)}
            </select>
          </div>

          {/* كروت استعراض المعالم (تعرض كلا اللغتين للمسؤول) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monuments.map(mon => (
              <div key={mon.id} className="border border-outline-variant/30 rounded-2xl flex flex-col bg-white overflow-hidden shadow-sm relative group hover:shadow-md transition-all">
                <div className="w-full h-40 overflow-hidden bg-surface-container-high relative">
                  <img src={mon.image_url} alt={mon.title_ar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <button onClick={() => handleDeleteMonument(mon.id)} className="absolute top-2 left-2 bg-white/90 text-rose-600 hover:bg-rose-600 hover:text-white p-2 rounded-xl transition-all cursor-pointer shadow-sm z-10">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    {/* الحقول المزدوجة المعروضة داخل كرت المشرف */}
                    <div>
                      <h4 className="text-xs font-bold text-primary leading-snug">عربي: {mon.title_ar}</h4>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{mon.description_ar}</p>
                      <p className="text-[9px] text-secondary font-bold mt-0.5">📍 {mon.location_ar}</p>
                    </div>
                    <div className="pt-2 border-t border-dashed border-outline-variant/40 text-left font-mono" dir="ltr">
                      <h4 className="text-xs font-bold text-secondary leading-snug">EN: {mon.title_en}</h4>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{mon.description_en}</p>
                      <p className="text-[9px] text-secondary font-bold mt-0.5">📍 {mon.location_en}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* استمارة إضافة معلم مترجم جديد */}
          <form onSubmit={handleAddMonument} className="p-5 border border-primary/20 bg-primary/5 rounded-2xl space-y-4 mt-8">
            <h3 className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">add_circle</span>
              إدراج معلم تاريخي جديد (ثنائي اللغة)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* القسم العربي */}
              <div className="space-y-4 p-3 bg-white rounded-xl border border-outline-variant/40">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">المحتوى العربي</span>
                <input required type="text" placeholder="اسم المعلم (مثال: قلعة حلب)" value={newMonf.title_ar} onChange={e => setNewMonf({...newMonf, title_ar: e.target.value})} className="w-full border border-outline-variant p-2.5 rounded-xl text-xs outline-none focus:border-primary" />
                <input required type="text" placeholder="الموقع الجغرافي (مثال: مركز المدينة)" value={newMonf.location_ar} onChange={e => setNewMonf({...newMonf, location_ar: e.target.value})} className="w-full border border-outline-variant p-2.5 rounded-xl text-xs outline-none focus:border-primary" />
                <input required type="text" placeholder="الهاشتاغات (افصلي بينها بفاصلة ,)" value={newMonf.tags_ar} onChange={e => setNewMonf({...newMonf, tags_ar: e.target.value})} className="w-full border border-outline-variant p-2.5 rounded-xl text-xs outline-none focus:border-primary" />
                <textarea required placeholder="نبذة تاريخية عن المعلم بالعربية..." rows="3" value={newMonf.description_ar} onChange={e => setNewMonf({...newMonf, description_ar: e.target.value})} className="w-full border border-outline-variant p-2.5 rounded-xl text-xs outline-none resize-none focus:border-primary" />
              </div>

              {/* English Section */}
              <div className="space-y-4 p-3 bg-white rounded-xl border border-outline-variant/40 text-left font-mono" dir="ltr">
                <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">English Content</span>
                <input required type="text" placeholder="Monument Title (e.g. Aleppo Citadel)" value={newMonf.title_en} onChange={e => setNewMonf({...newMonf, title_en: e.target.value})} className="w-full border border-outline-variant p-2.5 rounded-xl text-xs outline-none focus:border-primary" />
                <input required type="text" placeholder="Location (e.g. City Center)" value={newMonf.location_en} onChange={e => setNewMonf({...newMonf, location_en: e.target.value})} className="w-full border border-outline-variant p-2.5 rounded-xl text-xs outline-none focus:border-primary" />
                <input required type="text" placeholder="Tags (Separate with comma ,)" value={newMonf.tags_en} onChange={e => setNewMonf({...newMonf, tags_en: e.target.value})} className="w-full border border-outline-variant p-2.5 rounded-xl text-xs outline-none focus:border-primary" />
                <textarea required placeholder="Historical description in English..." rows="3" value={newMonf.description_en} onChange={e => setNewMonf({...newMonf, description_en: e.target.value})} className="w-full border border-outline-variant p-2.5 rounded-xl text-xs outline-none resize-none focus:border-primary" />
              </div>

              {/* حقل الصورة الموحد */}
              <div className="md:col-span-2">
                <input required type="url" placeholder="رابط صورة المعلم الحية الموحدة (Cloudinary URL)" value={newMonf.image_url} onChange={e => setNewMonf({...newMonf, image_url: e.target.value})} className="w-full border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary font-mono text-left" dir="ltr" />
              </div>
            </div>
            <button type="submit" className="bg-primary text-on-primary text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shadow-sm hover:bg-primary/90">إدراج المعلم المترجم في السجلات حياً</button>
          </form>
        </div>
      )}

    </div>
  );
}

export default TreasuresDashboard;