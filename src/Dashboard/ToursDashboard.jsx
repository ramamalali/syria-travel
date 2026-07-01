import { useState, useEffect } from "react";
import API from "@/Services/api";

function ToursDashboard() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTour, setEditingTour] = useState(null); // مسك الرحلة المراد تعديلها حالياً
  const [showAddForm, setShowAddForm] = useState(false);

  // قالب لتصفير بيانات الاستمارة للرحلات الجديدة
  const initialTourState = {
    id: "", province: "", title: "", bookingName: "", description: "", price: "", image: "", alt: "", featured: false,
    details: { fullDescription: "", duration: "", hotelStay: "", bookingStart: "", tourDate: "", landmarksToVisit: "" }
  };
  const [newTour, setNewTour] = useState(initialTourState);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = () => {
    API.get("/featured-tours")
      .then(res => {
        setTours(res.data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // عند الضغط على تعديل لملء الفورم
  const startEdit = (tour) => {
    setEditingTour({
      ...tour,
      details: {
        ...tour.details,
        landmarksToVisit: Array.isArray(tour.details?.landmarksToVisit) 
          ? tour.details.landmarksToVisit.join(", ") 
          : tour.details?.landmarksToVisit || ""
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // حفظ التعديلات للرحلة الحالية
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const landmarksArray = editingTour.details.landmarksToVisit.split(",").map(l => l.trim()).filter(l => l !== "");
    
    const updatedPayload = {
      ...editingTour,
      details: { ...editingTour.details, landmarksToVisit: landmarksArray }
    };

    API.put(`/featured-tours/${editingTour.id}`, updatedPayload)
      .then(() => {
        alert("🎉 تم تحديث بيانات الرحلة وتفاصيلها بنجاح!");
        setEditingTour(null);
        loadTours();
      })
      .catch(err => alert("❌ فشل تحديث الرحلة"));
  };

  // إدراج رحلة جديدة
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const landmarksArray = newTour.details.landmarksToVisit.split(",").map(l => l.trim()).filter(l => l !== "");
    
    const addPayload = {
      ...newTour,
      id: `all-tour-${Date.now()}`, // توليد ID تلقائي فريد
      details: { ...newTour.details, landmarksToVisit: landmarksArray }
    };

    API.post("/featured-tours", addPayload)
      .then(() => {
        alert("🎉 تم إضافة البرنامج السياحي الجديد بنجاح!");
        setNewTour(initialTourState);
        setShowAddForm(false);
        loadTours();
      })
      .catch(err => alert("❌ خطأ أثناء الإضافة"));
  };

  const handleDelete = (id) => {
    if (window.confirm("هل أنتِ متأكدة من إلغاء وحذف هذه الرحلة بالكامل؟")) {
      API.delete(`/featured-tours/${id}`).then(() => {
        alert("تم الحذف.");
        loadTours();
      });
    }
  };

  if (loading) return <div className="text-center p-12 text-xs font-bold animate-pulse text-primary">جاري تحميل برامج الرحلات السياحية...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
      
      {/* الهيدر الرئيسي */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-outline-variant/20 pb-4 gap-4">
        <div>
          <h2 className="text-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">explore</span>
            إدارة وجدولة البرامج والرحلات السياحية
          </h2>
          <p className="text-[11px] text-on-surface-variant mt-1">
            إضافة وتعديل مسارات حافلات "سوا ترافيل"، الأسعار الحية، الفنادق، والمعالم المخصصة للزيارة.
          </p>
        </div>
        <button 
          onClick={() => { setShowAddForm(!showAddForm); setEditingTour(null); }}
          className="bg-primary text-on-primary text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-sm flex items-center gap-1 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">{showAddForm ? "close" : "add_circle"}</span>
          {showAddForm ? "إغلاق الاستمارة" : "إضافة برنامج رحلة جديد"}
        </button>
      </div>

      {/* 1. فوروم تعديل رحلة قائمة */}
      {editingTour && (
        <form onSubmit={handleUpdateSubmit} className="p-6 border-2 border-primary rounded-2xl bg-primary/5 space-y-6">
          <h3 className="text-xs font-bold text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">edit_note</span>
            أنتِ الآن تقومي بتعديل: <span className="underline">{editingTour.title}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1"><label className="text-[11px] font-bold">المحافظة / النطاق</label>
              <input type="text" value={editingTour.province} onChange={e => setEditingTour({...editingTour, province: e.target.value})} className="border p-2.5 rounded-xl text-xs w-full bg-white outline-none" /></div>
            <div className="space-y-1"><label className="text-[11px] font-bold">عنوان الكرت السريع</label>
              <input type="text" value={editingTour.title} onChange={e => setEditingTour({...editingTour, title: e.target.value})} className="border p-2.5 rounded-xl text-xs w-full bg-white outline-none" /></div>
            <div className="space-y-1"><label className="text-[11px] font-bold">اسم البرنامج في الحجز</label>
              <input type="text" value={editingTour.bookingName} onChange={e => setEditingTour({...editingTour, bookingName: e.target.value})} className="border p-2.5 rounded-xl text-xs w-full bg-white outline-none" /></div>
            <div className="space-y-1"><label className="text-[11px] font-bold">تكلفة الحجز والأسعار</label>
              <input type="text" value={editingTour.price} onChange={e => setEditingTour({...editingTour, price: e.target.value})} className="border p-2.5 rounded-xl text-xs w-full bg-white outline-none" /></div>
            <div className="space-y-1 md:col-span-2"><label className="text-[11px] font-bold">رابط غلاف الرحلة</label>
              <input type="text" value={editingTour.image} onChange={e => setEditingTour({...editingTour, image: e.target.value})} className="border p-2.5 rounded-xl text-xs w-full bg-white font-mono outline-none" /></div>
            <div className="space-y-1 md:col-span-3"><label className="text-[11px] font-bold">وصف الكرت الخارجي</label>
              <textarea rows="2" value={editingTour.description} onChange={e => setEditingTour({...editingTour, description: e.target.value})} className="border p-2.5 rounded-xl text-xs w-full bg-white resize-none outline-none" /></div>
          </div>

          <div className="border-t border-outline-variant/30 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-secondary">تفاصيل صفحة الرحلة الداخلية (JSON Object Fields)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[11px] font-bold">مدة الرحلة (مثال: 3 أيام - ليلتان)</label>
                <input type="text" value={editingTour.details.duration} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, duration: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">المبيت والإقامة الفندقية</label>
                <input type="text" value={editingTour.details.hotelStay} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, hotelStay: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">موعد الانطلاق الحقيقي للرحلة</label>
                <input type="text" value={editingTour.details.tourDate} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, tourDate: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">حالة وعمر الحجز</label>
                <input type="text" value={editingTour.details.bookingStart} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, bookingStart: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1 md:col-span-2"><label className="text-[11px] font-bold">المعالم السياحية المخصصة للزيارة (افصلي بين كل معلم بـ فاصلة , )</label>
                <input type="text" value={editingTour.details.landmarksToVisit} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, landmarksToVisit: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" placeholder="المعلم الأول, المعلم الثاني, الثالث" /></div>
              <div className="space-y-1 md:col-span-2"><label className="text-[11px] font-bold">شرح تفصيلي كامل للمسار والخدمات</label>
                <textarea rows="3" value={editingTour.details.fullDescription} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, fullDescription: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white resize-none" /></div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setEditingTour(null)} className="bg-outline-variant text-on-surface text-xs font-bold px-4 py-2 rounded-xl cursor-pointer">إلغاء</button>
            <button type="submit" className="bg-primary text-on-primary text-xs font-bold px-6 py-2 rounded-xl cursor-pointer">حفظ وإرسال التحديث للسيرفر</button>
          </div>
        </form>
      )}

      {/* 2. فوروم إضافة رحلة جديدة بالكامل */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-6 border border-emerald-500 rounded-2xl bg-emerald-50/20 space-y-6">
          <h3 className="text-xs font-bold text-emerald-800 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">add_box</span>إدراج برنامج رحلة سياحية جديد في الجدول
          </h3>
          {/* نفس حقول الإدخال مستهدفة الـ newTour */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input required type="text" placeholder="المحافظة (مثال: طرطوس)" value={newTour.province} onChange={e => setNewTour({...newTour, province: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <input required type="text" placeholder="عنوان الكرت الخارجي" value={newTour.title} onChange={e => setNewTour({...newTour, title: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <input required type="text" placeholder="اسم البرنامج في استمارة الحجز" value={newTour.bookingName} onChange={e => setNewTour({...newTour, bookingName: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <input required type="text" placeholder="السعر (مثال: 350,000 ل.س / للشخص)" value={newTour.price} onChange={e => setNewTour({...newTour, price: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <input required type="url" placeholder="رابط صورة الغلاف" value={newTour.image} onChange={e => setNewTour({...newTour, image: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2 outline-none" />
            <textarea required placeholder="وصف الكرت الخارجي السريع لصفحة الاستكشاف الرئيسي..." rows="2" value={newTour.description} onChange={e => setNewTour({...newTour, description: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-3 resize-none outline-none" />
          </div>

          <div className="border-t border-emerald-200 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-emerald-900">تفاصيل المسار الداخلي للقروب</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="المدة (مثال: 4 أيام - 3 ليالي)" value={newTour.details.duration} onChange={e => setNewTour({...newTour, details: {...newTour.details, duration: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white" />
              <input type="text" placeholder="الإقامة بالفنادق" value={newTour.details.hotelStay} onChange={e => setNewTour({...newTour, details: {...newTour.details, hotelStay: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white" />
              <input type="text" placeholder="موعد انطلاق الباص والساعة" value={newTour.details.tourDate} onChange={e => setNewTour({...newTour, details: {...newTour.details, tourDate: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white" />
              <input type="text" placeholder="حالة توفر وتثبيت المقاعد" value={newTour.details.bookingStart} onChange={e => setNewTour({...newTour, details: {...newTour.details, bookingStart: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white" />
              <input type="text" placeholder="المعالم المستهدفة (افصلي بينها بـ فاصلة ,)" value={newTour.details.landmarksToVisit} onChange={e => setNewTour({...newTour, details: {...newTour.details, landmarksToVisit: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2" />
              <textarea placeholder="شرح تفصيلي كامل وموسع عن محطات الرحلة السياحية..." rows="3" value={newTour.details.fullDescription} onChange={e => setNewTour({...newTour, details: {...newTour.details, fullDescription: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2 resize-none" />
            </div>
          </div>
          <button type="submit" className="bg-emerald-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer">إدراج وتفعيل الرحلة فوراً</button>
        </form>
      )}

      {/* 3. استعراض وجدولة كروت الرحلات القائمة بتوزيع عمودي مريح وفسيح للعين */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="border border-outline-variant/30 rounded-2xl flex flex-col bg-white overflow-hidden shadow-sm group hover:shadow-md transition-all relative">
            
            {/* غلاف الصورة بالأعلى بمساحة كاملة مريحة */}
            <div className="w-full h-48 bg-surface-container-high overflow-hidden relative">
              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
              <span className="absolute top-3 right-3 bg-primary text-on-primary text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                {tour.province}
              </span>
            </div>

            {/* تفاصيل نصوص كرت الرحلة بدون أي تزاحم */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-primary leading-snug">{tour.title}</h4>
                <p className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded inline-block">{tour.price}</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium text-justify line-clamp-3">
                  {tour.description}
                </p>
              </div>

              {/* معالم الزيارة إن وجدت داخل الـ details */}
              {tour.details?.landmarksToVisit && tour.details.landmarksToVisit.length > 0 && (
                <div className="pt-2 border-t border-outline-variant/10">
                  <p className="text-[10px] font-bold text-secondary mb-1">المحطات الرئيسية:</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(tour.details.landmarksToVisit) && tour.details.landmarksToVisit.map((l, i) => (
                      <span key={i} className="text-[9px] bg-surface-container-low px-2 py-0.5 rounded text-on-surface-variant font-medium">
                        • {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* أزرار التحكم بالأسفل بوضوح تام */}
              <div className="flex gap-2 pt-3 border-t border-outline-variant/10">
                <button 
                  onClick={() => startEdit(tour)}
                  className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">edit</span>
                  تعديل البرنامج
                </button>
                <button 
                  onClick={() => handleDelete(tour.id)}
                  className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white p-2 rounded-xl transition-all cursor-pointer"
                  title="حذف الرحلة"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default ToursDashboard;