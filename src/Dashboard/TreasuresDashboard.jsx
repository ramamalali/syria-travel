import { useState, useEffect } from "react";
import API from "@/Services/api";

function TreasuresDashboard() {
  const [activeTab, setActiveTab] = useState("cities");
  const [sectionSettings, setSectionSettings] = useState({ title: "", description: "", viewAllText: "" });
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // لنموذج إضافة معلم جديد
  const [newMonf, setNewMonf] = useState({ title: "", description: "", image_url: "", location: "", tags: "" });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const res = await API.get("/destinations-section");
      setSectionSettings({
        title: res.data.title,
        description: res.data.description,
        viewAllText: res.data.viewAllText
      });
      setCities(res.data.items);
      if (res.data.items.length > 0) {
        setSelectedCity(res.data.items[0].id);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // جلب معالم المدينة عند تغيير اختيار المحافظة
  useEffect(() => {
    if (selectedCity) {
      API.get(`/monuments/${selectedCity}`).then(res => setMonuments(res.data));
    }
  }, [selectedCity]);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put("/destinations-section/settings", {
        title: sectionSettings.title,
        description: sectionSettings.description,
        view_all_text: sectionSettings.viewAllText
      });
      alert("🎉 تم تحديث الإعدادات العامة بنجاح!");
    } catch (err) {
      alert("❌ فشل تحديث الإعدادات العريضة");
    }
  };

  // معالجة تحديث حقول المحافظة محلياً في الـ state قبل الحفظ
  const handleCityFieldChange = (id, field, value) => {
    setCities(cities.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // إرسال تحديثات المحافظة الفردية للباك إيند
  const handleUpdateCity = async (id, cityData) => {
    try {
      await API.put(`/destinations/${id}`, {
        title: cityData.title,
        description: cityData.description,
        image_url: cityData.image
      });
      alert(`🎉 تم تحديث بيانات محافظة ${cityData.title} بنجاح!`);
    } catch (err) {
      alert("❌ فشل حفظ تعديلات المحافظة");
    }
  };

  const handleAddMonument = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = newMonf.tags.split(",").map(t => t.trim()).filter(t => t !== "");
      const res = await API.post("/monuments", { ...newMonf, destination_id: selectedCity, tags: tagsArray });
      setMonuments([...monuments, res.data]);
      setNewMonf({ title: "", description: "", image_url: "", location: "", tags: "" });
      alert("🎉 تم إضافة المعلم الأثري بنجاح!");
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

  if (loading) return <div className="text-center p-12 text-xs font-bold animate-pulse text-primary">جاري تحميل كنوز التاريخ السوري...</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-outline-variant/20 shadow-sm p-4 md:p-8">
      
      {/* رأس الصفحة والمبدل */}
      <div className="mb-6 border-b border-outline-variant/20 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">account_balance</span>
            إدارة الكنوز والمعالم الأثرية
          </h2>
          <p className="text-[11px] text-on-surface-variant mt-1">
            التحكم الكامل ببيانات الـ 9 محافظات الرئيسية وإدارة بطاقات المعالم التاريخية التابعة لكل منها.
          </p>
        </div>
        
        <div className="flex gap-2 bg-surface-container-high p-1 rounded-xl self-start lg:self-auto">
          <button 
            onClick={() => setActiveTab("cities")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "cities" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"}`}
          >
            المحافظات والعناوين
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
          {/* نصوص القسم */}
          <form onSubmit={handleSettingsSubmit} className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">tune</span>إعدادات القسم العامة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                value={sectionSettings.title} 
                onChange={e => setSectionSettings({...sectionSettings, title: e.target.value})}
                className="border border-outline-variant p-2.5 rounded-xl text-xs outline-none focus:border-primary bg-white" placeholder="عنوان القسم الرئيسي"
              />
              <input 
                type="text" 
                value={sectionSettings.viewAllText} 
                onChange={e => setSectionSettings({...sectionSettings, viewAllText: e.target.value})}
                className="border border-outline-variant p-2.5 rounded-xl text-xs outline-none focus:border-primary bg-white" placeholder="نص زر عرض الكل"
              />
              <textarea 
                className="border border-outline-variant p-2.5 rounded-xl text-xs outline-none focus:border-primary md:col-span-2 resize-none bg-white" rows="2"
                value={sectionSettings.description} 
                onChange={e => setSectionSettings({...sectionSettings, description: e.target.value})}
                placeholder="الوصف الفرعي للقسم"
              />
            </div>
            <button type="submit" className="bg-primary text-on-primary text-xs px-4 py-2 rounded-xl font-bold cursor-pointer hover:bg-primary/90">حفظ العناوين</button>
          </form>

          {/* إدارة المحافظات الـ 9 التفاعلية بالكامل */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">edit_location_alt</span>تعديل بيانات المحافظات والكرت التعريفي
            </h3>
            
            <div className="overflow-x-auto border border-outline-variant/30 rounded-xl">
              <table className="w-full text-right text-xs min-w-[700px]">
                <thead className="bg-surface-container-low text-on-surface font-bold border-b border-outline-variant/30">
                  <tr>
                    <th className="p-3 w-32">المحافظة</th>
                    <th className="p-3">الوصف التعريفي للكرت الرئيسي</th>
                    <th className="p-3 w-64">رابط صورة الغلاف (Cloudinary)</th>
                    <th className="p-3 w-24 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {cities.map((city) => (
                    <tr key={city.id} className="hover:bg-surface-container-lowest transition-all">
                      {/* اسم المحافظة كحقل قابل للتعديل */}
                      <td className="p-2">
                        <input 
                          type="text"
                          value={city.title}
                          onChange={(e) => handleCityFieldChange(city.id, "title", e.target.value)}
                          className="w-full border border-outline-variant p-1.5 rounded-lg font-bold text-primary bg-white outline-none text-xs focus:border-primary"
                        />
                      </td>
                      {/* وصف الكرت القابل للتعديل */}
                      <td className="p-2">
                        <textarea 
                          rows="2"
                          value={city.description}
                          onChange={(e) => handleCityFieldChange(city.id, "description", e.target.value)}
                          className="w-full border border-outline-variant p-1.5 rounded-lg text-on-surface-variant bg-white outline-none text-xs focus:border-primary resize-none"
                        />
                      </td>
                      {/* رابط الصورة القابل للتعديل */}
                      <td className="p-2">
                        <input 
                          type="text"
                          value={city.image}
                          onChange={(e) => handleCityFieldChange(city.id, "image", e.target.value)}
                          className="w-full border border-outline-variant p-1.5 rounded-lg text-secondary font-mono text-[10px] bg-white outline-none focus:border-primary"
                        />
                      </td>
                      {/* زر الحفظ الفردي للمحافظة */}
                      <td className="p-2 text-center">
                        <button 
                          type="button"
                          onClick={() => handleUpdateCity(city.id, city)}
                          className="bg-primary/10 text-primary hover:bg-primary hover:text-on-primary p-2 rounded-xl transition-all font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs">save</span>
                          حفظ
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
            <label className="text-xs font-bold text-primary whitespace-nowrap">اختر المحافظة:</label>
            <select 
              value={selectedCity} 
              onChange={e => setSelectedCity(e.target.value)}
              className="p-2 border border-outline-variant bg-white rounded-xl text-xs font-bold outline-none text-on-surface focus:border-primary"
            >
              {cities.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>

          {/* كروت المعالم - معالجة مشكلة الضغط (تصميم عمودي مريح وواسع) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {monuments.map(mon => (
              <div key={mon.id} className="border border-outline-variant/30 rounded-2xl flex flex-col bg-white overflow-hidden shadow-sm relative group hover:shadow-md transition-all">
                
                {/* حاوية الصورة الكاملة بالأعلى */}
                <div className="w-full h-44 overflow-hidden bg-surface-container-high relative">
                  <img src={mon.image_url} alt={mon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                  {/* زر الحذف في زاوية الصورة */}
                  <button 
                    onClick={() => handleDeleteMonument(mon.id)}
                    className="absolute top-2 left-2 bg-white/90 text-rose-600 hover:bg-rose-600 hover:text-white p-2 rounded-xl transition-all cursor-pointer shadow-sm z-10"
                    title="حذف هذا المعلم"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>

                {/* تفاصيل المعلم بالأسفل مأخوذة بكل أريحية */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-primary leading-snug">{mon.title}</h4>
                    <p className="text-[10px] text-secondary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">location_on</span>
                      {mon.location}
                    </p>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium pt-1 text-justify">
                      {mon.description}
                    </p>
                  </div>

                  {/* الهاشتاغات أسفل الكرت */}
                  {mon.tags && mon.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-outline-variant/10">
                      {mon.tags.map((t, i) => (
                        <span key={i} className="text-[9px] bg-surface-container-low font-semibold px-2 py-0.5 rounded text-primary">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* استمارة إضافة معلم جديد */}
          <form onSubmit={handleAddMonument} className="p-5 border border-primary/20 bg-primary/5 rounded-2xl space-y-4 mt-8">
            <h3 className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">add_circle</span>
              إدراج معلم تاريخي جديد لهذه المحافظة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" placeholder="اسم المعلم (مثال: قلعة صلاح الدين)" value={newMonf.title} onChange={e => setNewMonf({...newMonf, title: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary" />
              <input required type="text" placeholder="الموقع الجغرافي (مثال: ريف حمص الغربي)" value={newMonf.location} onChange={e => setNewMonf({...newMonf, location: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary" />
              <input required type="url" placeholder="رابط صورة المعلم الحية" value={newMonf.image_url} onChange={e => setNewMonf({...newMonf, image_url: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary" />
              <input required type="text" placeholder="الهاشتاغات (افصلي بينها بفاصلة ,)" value={newMonf.tags} onChange={e => setNewMonf({...newMonf, tags: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none focus:border-primary" />
              <textarea required placeholder="اكتب نبذة تاريخية ووصف كامل عن المعلم وهندسته المعمارية..." rows="3" value={newMonf.description} onChange={e => setNewMonf({...newMonf, description: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs bg-white outline-none md:col-span-2 resize-none focus:border-primary" />
            </div>
            <button type="submit" className="bg-primary text-on-primary text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shadow-sm hover:bg-primary/90">إدراج المعلم في السجلات حياً</button>
          </form>
        </div>
      )}

    </div>
  );
}

export default TreasuresDashboard;