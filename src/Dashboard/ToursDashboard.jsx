import { useState, useEffect } from "react";
import API from "@/Services/api";

function ToursDashboard() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTour, setEditingTour] = useState(null); // مسك الرحلة المراد تعديلها حالياً
  const [showAddForm, setShowAddForm] = useState(false);

  // 🌐 لغة عرض لوحة التحكم نفسها (يمكنكِ تغييرها أو ربطها بالـ localStorage)
  const [currentLang] = useState(localStorage.getItem('lang') || 'ar');

  // قالب لتصفير بيانات الاستمارة للرحلات الجديدة يدعم كائنات اللغات الكاملة
  const initialTourState = {
    id: "", 
    bookingName: "", 
    image: "", 
    featured: false,
    province: { ar: "", en: "" },
    title: { ar: "", en: "" },
    description: { ar: "", en: "" },
    price: { ar: "", en: "" },
    alt: { ar: "", en: "" },
    details: { 
      fullDescription: { ar: "", en: "" }, 
      duration: { ar: "", en: "" }, 
      hotelStay: { ar: "", en: "" }, 
      bookingStart: { ar: "", en: "" }, 
      tourDate: { ar: "", en: "" }, 
      landmarksToVisit: { ar: "", en: "" } // سيتم تحويلها لنص يفصل بفاصلة أثناء الإدخال
    }
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

  // دالة مساعدة لقراءة النصوص المترجمة بأمان داخل لوحة التحكم
  const getSafeText = (field, lang = 'ar') => {
    if (!field) return "";
    if (typeof field === 'object') return field[lang] || field['ar'] || "";
    return field;
  };

  // عند الضغط على تعديل لملء الفورم
  const startEdit = (tour) => {
    setEditingTour({
      ...tour,
      province: typeof tour.province === 'object' ? tour.province : { ar: tour.province, en: "" },
      title: typeof tour.title === 'object' ? tour.title : { ar: tour.title, en: "" },
      description: typeof tour.description === 'object' ? tour.description : { ar: tour.description, en: "" },
      price: typeof tour.price === 'object' ? tour.price : { ar: tour.price, en: "" },
      alt: typeof tour.alt === 'object' ? tour.alt : { ar: tour.alt, en: "" },
      details: {
        fullDescription: typeof tour.details?.fullDescription === 'object' ? tour.details.fullDescription : { ar: tour.details?.fullDescription || "", en: "" },
        duration: typeof tour.details?.duration === 'object' ? tour.details.duration : { ar: tour.details?.duration || "", en: "" },
        hotelStay: typeof tour.details?.hotelStay === 'object' ? tour.details.hotelStay : { ar: tour.details?.hotelStay || "", en: "" },
        bookingStart: typeof tour.details?.bookingStart === 'object' ? tour.details.bookingStart : { ar: tour.details?.bookingStart || "", en: "" },
        tourDate: typeof tour.details?.tourDate === 'object' ? tour.details.tourDate : { ar: tour.details?.tourDate || "", en: "" },
        landmarksToVisit: {
          ar: Array.isArray(tour.details?.landmarksToVisit?.ar) ? tour.details.landmarksToVisit.ar.join(", ") : Array.isArray(tour.details?.landmarksToVisit) ? tour.details.landmarksToVisit.join(", ") : tour.details?.landmarksToVisit?.ar || tour.details?.landmarksToVisit || "",
          en: Array.isArray(tour.details?.landmarksToVisit?.en) ? tour.details.landmarksToVisit.en.join(", ") : tour.details?.landmarksToVisit?.en || ""
        }
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // حفظ التعديلات للرحلة الحالية
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    
    // تحويل نصوص المعالم السياحية المفصولة بفاصلة إلى مصفوفات لكل لغة
    const landmarksArArray = editingTour.details.landmarksToVisit.ar.split(",").map(l => l.trim()).filter(l => l !== "");
    const landmarksEnArray = editingTour.details.landmarksToVisit.en.split(",").map(l => l.trim()).filter(l => l !== "");

    const updatedPayload = {
      ...editingTour,
      details: { 
        ...editingTour.details, 
        landmarksToVisit: { ar: landmarksArArray, en: landmarksEnArray } 
      }
    };

    API.put(`/featured-tours/${editingTour.id}`, updatedPayload)
      .then(() => {
        alert("🎉 تم تحديث بيانات الرحلة وتفاصيلها باللغتين بنجاح!");
        setEditingTour(null);
        loadTours();
      })
      .catch(err => alert("❌ فشل تحديث الرحلة"));
  };

  // إدراج رحلة جديدة
  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    const landmarksArArray = newTour.details.landmarksToVisit.ar.split(",").map(l => l.trim()).filter(l => l !== "");
    const landmarksEnArray = newTour.details.landmarksToVisit.en.split(",").map(l => l.trim()).filter(l => l !== "");

    const addPayload = {
      ...newTour,
      id: `all-tour-${Date.now()}`, // توليد ID تلقائي فريد
      details: { 
        ...newTour.details, 
        landmarksToVisit: { ar: landmarksArArray, en: landmarksEnArray } 
      }
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
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm" dir="rtl">
      
      {/* الهيدر الرئيسي */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-outline-variant/20 pb-4 gap-4">
        <div>
          <h2 className="text-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">explore</span>
            إدارة وجدولة البرامج والرحلات السياحية (متعدد اللغات 🌐)
          </h2>
          <p className="text-[11px] text-on-surface-variant mt-1">
            إضافة وتعديل مسارات حافلات "سوا ترافيل"، الأسعار الحية، الفنادق، والمعالم المخصصة للزيارة بالعربية والإنجليزية.
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
            أنتِ الآن تقومي بتعديل: <span className="underline">{getSafeText(editingTour.title, 'ar')}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-outline-variant/20 pb-4">
            <div className="space-y-1 md:col-span-2 bg-primary/10 p-2 rounded-lg font-bold text-xs text-primary">⚙️ الحقول الأساسية والثابتة:</div>
            <div className="space-y-1"><label className="text-[11px] font-bold">اسم البرنامج في الحجز (ثابت برمجياً)</label>
              <input type="text" value={editingTour.bookingName} onChange={e => setEditingTour({...editingTour, bookingName: e.target.value})} className="border p-2.5 rounded-xl text-xs w-full bg-white outline-none" /></div>
            <div className="space-y-1"><label className="text-[11px] font-bold">رابط غلاف الرحلة (URL)</label>
              <input type="text" value={editingTour.image} onChange={e => setEditingTour({...editingTour, image: e.target.value})} className="border p-2.5 rounded-xl text-xs w-full bg-white font-mono outline-none" /></div>
          </div>

          {/* نصوص اللغات للكرت الخارجي */}
          <div className="space-y-4">
            <div className="bg-secondary/10 p-2 rounded-lg font-bold text-xs text-secondary">🌐 ترجمة الكرت الخارجي الرئيسي:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[11px] font-bold">المحافظة (بالعربية)</label>
                <input type="text" value={editingTour.province.ar} onChange={e => setEditingTour({...editingTour, province: {...editingTour.province, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Province (English)</label>
                <input type="text" value={editingTour.province.en} onChange={e => setEditingTour({...editingTour, province: {...editingTour.province, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white text-left font-sans" dir="ltr" /></div>
              
              <div className="space-y-1"><label className="text-[11px] font-bold">عنوان الكرت (بالعربية)</label>
                <input type="text" value={editingTour.title.ar} onChange={e => setEditingTour({...editingTour, title: {...editingTour.title, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Title (English)</label>
                <input type="text" value={editingTour.title.en} onChange={e => setEditingTour({...editingTour, title: {...editingTour.title, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white text-left font-sans" dir="ltr" /></div>

              <div className="space-y-1"><label className="text-[11px] font-bold">التكلفة والأسعار (بالعربية)</label>
                <input type="text" value={editingTour.price.ar} onChange={e => setEditingTour({...editingTour, price: {...editingTour.price, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Price & Currency (English)</label>
                <input type="text" value={editingTour.price.en} onChange={e => setEditingTour({...editingTour, price: {...editingTour.price, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white text-left font-sans" dir="ltr" /></div>

              <div className="space-y-1"><label className="text-[11px] font-bold">وصف الكرت الخارجي (بالعربية)</label>
                <textarea rows="2" value={editingTour.description.ar} onChange={e => setEditingTour({...editingTour, description: {...editingTour.description, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white resize-none" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Description (English)</label>
                <textarea rows="2" value={editingTour.description.en} onChange={e => setEditingTour({...editingTour, description: {...editingTour.description, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs w-full bg-white resize-none text-left font-sans" dir="ltr" /></div>
            </div>
          </div>

          {/* تفاصيل الصفحة الداخلية مترجمة */}
          <div className="border-t border-outline-variant/30 pt-4 space-y-4">
            <div className="bg-amber-700/10 p-2 rounded-lg font-bold text-xs text-amber-900">📑 ترجمة تفاصيل صفحة الرحلة الداخلية:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[11px] font-bold">مدة الرحلة (بالعربية)</label>
                <input type="text" value={editingTour.details.duration.ar} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, duration: {...editingTour.details.duration, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Duration (English)</label>
                <input type="text" value={editingTour.details.duration.en} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, duration: {...editingTour.details.duration, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white text-left" dir="ltr" /></div>

              <div className="space-y-1"><label className="text-[11px] font-bold">المبيت والإقامة الفندقية (بالعربية)</label>
                <input type="text" value={editingTour.details.hotelStay.ar} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, hotelStay: {...editingTour.details.hotelStay, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Hotel Stay (English)</label>
                <input type="text" value={editingTour.details.hotelStay.en} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, hotelStay: {...editingTour.details.hotelStay, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white text-left" dir="ltr" /></div>

              <div className="space-y-1"><label className="text-[11px] font-bold">موعد الانطلاق الحقيقي (بالعربية)</label>
                <input type="text" value={editingTour.details.tourDate.ar} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, tourDate: {...editingTour.details.tourDate, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Departure Date (English)</label>
                <input type="text" value={editingTour.details.tourDate.en} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, tourDate: {...editingTour.details.tourDate, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white text-left" dir="ltr" /></div>

              <div className="space-y-1"><label className="text-[11px] font-bold">حالة وعمر الحجز (بالعربية)</label>
                <input type="text" value={editingTour.details.bookingStart.ar} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, bookingStart: {...editingTour.details.bookingStart, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Booking Status (English)</label>
                <input type="text" value={editingTour.details.bookingStart.en} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, bookingStart: {...editingTour.details.bookingStart, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white text-left" dir="ltr" /></div>

              <div className="space-y-1"><label className="text-[11px] font-bold">المعالم السياحية المستهدفة باللغة العربية (افصلي بـ فاصلة , )</label>
                <input type="text" value={editingTour.details.landmarksToVisit.ar} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, landmarksToVisit: {...editingTour.details.landmarksToVisit, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white" placeholder="قلعة حلب, الأسواق القديمة" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Landmarks to Visit in English (Separate with comma , )</label>
                <input type="text" value={editingTour.details.landmarksToVisit.en} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, landmarksToVisit: {...editingTour.details.landmarksToVisit, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white text-left" dir="ltr" placeholder="Aleppo Citadel, Old Souks" /></div>

              <div className="space-y-1"><label className="text-[11px] font-bold">شرح تفصيلي كامل للمسار (بالعربية)</label>
                <textarea rows="3" value={editingTour.details.fullDescription.ar} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, fullDescription: {...editingTour.details.fullDescription, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white resize-none" /></div>
              <div className="space-y-1"><label className="text-[11px] font-bold">Full Description & Services (English)</label>
                <textarea rows="3" value={editingTour.details.fullDescription.en} onChange={e => setEditingTour({...editingTour, details: {...editingTour.details, fullDescription: {...editingTour.details.fullDescription, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs w-full bg-white resize-none text-left" dir="ltr" /></div>
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
            <span className="material-symbols-outlined text-sm">add_box</span>إدراج برنامج رحلة سياحية جديد في الجدول (باللغتين)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required type="text" placeholder="اسم البرنامج في استمارة الحجز (برمجي ثابت)" value={newTour.bookingName} onChange={e => setNewTour({...newTour, bookingName: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white outline-none md:col-span-2" />
            <input required type="url" placeholder="رابط صورة الغلاف" value={newTour.image} onChange={e => setNewTour({...newTour, image: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2 outline-none" />
            
            <input required type="text" placeholder="المحافظة بالعربية" value={newTour.province.ar} onChange={e => setNewTour({...newTour, province: {...newTour.province, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white" />
            <input required type="text" placeholder="Province in English" value={newTour.province.en} onChange={e => setNewTour({...newTour, province: {...newTour.province, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white text-left" dir="ltr" />
            
            <input required type="text" placeholder="عنوان الكرت بالعربية" value={newTour.title.ar} onChange={e => setNewTour({...newTour, title: {...newTour.title, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white" />
            <input required type="text" placeholder="Title in English" value={newTour.title.en} onChange={e => setNewTour({...newTour, title: {...newTour.title, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white text-left" dir="ltr" />
            
            <input required type="text" placeholder="السعر بالعربية" value={newTour.price.ar} onChange={e => setNewTour({...newTour, price: {...newTour.price, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white" />
            <input required type="text" placeholder="Price in English" value={newTour.price.en} onChange={e => setNewTour({...newTour, price: {...newTour.price, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white text-left" dir="ltr" />
            
            <textarea required placeholder="وصف الكرت الخارجي بالعربية..." rows="2" value={newTour.description.ar} onChange={e => setNewTour({...newTour, description: {...newTour.description, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white resize-none" />
            <textarea required placeholder="Description in English..." rows="2" value={newTour.description.en} onChange={e => setNewTour({...newTour, description: {...newTour.description, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white resize-none text-left" dir="ltr" />
          </div>

          <div className="border-t border-emerald-200 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-emerald-900">تفاصيل المسار الداخلي للقروب</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="المدة بالعربية" value={newTour.details.duration.ar} onChange={e => setNewTour({...newTour, details: {...newTour.details, duration: {...newTour.details.duration, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white" />
              <input type="text" placeholder="Duration in English" value={newTour.details.duration.en} onChange={e => setNewTour({...newTour, details: {...newTour.details, duration: {...newTour.details.duration, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white text-left" dir="ltr" />
              
              <input type="text" placeholder="الإقامة بالفنادق بالعربية" value={newTour.details.hotelStay.ar} onChange={e => setNewTour({...newTour, details: {...newTour.details, hotelStay: {...newTour.details.hotelStay, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white" />
              <input type="text" placeholder="Hotel Stay in English" value={newTour.details.hotelStay.en} onChange={e => setNewTour({...newTour, details: {...newTour.details, hotelStay: {...newTour.details.hotelStay, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white text-left" dir="ltr" />
              
              <input type="text" placeholder="موعد انطلاق الباص بالعربية" value={newTour.details.tourDate.ar} onChange={e => setNewTour({...newTour, details: {...newTour.details, tourDate: {...newTour.details.tourDate, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white" />
              <input type="text" placeholder="Departure Date in English" value={newTour.details.tourDate.en} onChange={e => setNewTour({...newTour, details: {...newTour.details, tourDate: {...newTour.details.tourDate, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white text-left" dir="ltr" />
              
              <input type="text" placeholder="حالة توفر المقاعد بالعربية" value={newTour.details.bookingStart.ar} onChange={e => setNewTour({...newTour, details: {...newTour.details, bookingStart: {...newTour.details.bookingStart, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white" />
              <input type="text" placeholder="Booking Window in English" value={newTour.details.bookingStart.en} onChange={e => setNewTour({...newTour, details: {...newTour.details, bookingStart: {...newTour.details.bookingStart, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white text-left" dir="ltr" />
              
              <input type="text" placeholder="المعالم المستهدفة بالعربية (افصلي بـ ,)" value={newTour.details.landmarksToVisit.ar} onChange={e => setNewTour({...newTour, details: {...newTour.details, landmarksToVisit: {...newTour.details.landmarksToVisit, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white" />
              <input type="text" placeholder="Landmarks in English (Separate with ,)" value={newTour.details.landmarksToVisit.en} onChange={e => setNewTour({...newTour, details: {...newTour.details, landmarksToVisit: {...newTour.details.landmarksToVisit, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white text-left" dir="ltr" />
              
              <textarea placeholder="شرح تفصيلي كامل وموسع للمحطات بالعربية..." rows="3" value={newTour.details.fullDescription.ar} onChange={e => setNewTour({...newTour, details: {...newTour.details, fullDescription: {...newTour.details.fullDescription, ar: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2 resize-none" />
              <textarea placeholder="Full Description & itinerary in English..." rows="3" value={newTour.details.fullDescription.en} onChange={e => setNewTour({...newTour, details: {...newTour.details, fullDescription: {...newTour.details.fullDescription, en: e.target.value}}})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2 resize-none text-left" dir="ltr" />
            </div>
          </div>
          <button type="submit" className="bg-emerald-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer">إدراج وتفعيل الرحلة فوراً</button>
        </form>
      )}

      {/* 3. استعراض وجدولة كروت الرحلات القائمة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="border border-outline-variant/30 rounded-2xl flex flex-col bg-white overflow-hidden shadow-sm group hover:shadow-md transition-all relative">
            
            {/* غلاف الصورة */}
            <div className="w-full h-48 bg-surface-container-high overflow-hidden relative">
              <img src={tour.image} alt={getSafeText(tour.title, currentLang)} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
              <span className="absolute top-3 right-3 bg-primary text-on-primary text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                {getSafeText(tour.province, currentLang)}
              </span>
            </div>

            {/* تفاصيل نصوص كرت الرحلة */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-primary leading-snug">{getSafeText(tour.title, currentLang)}</h4>
                <p className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded inline-block">{getSafeText(tour.price, currentLang)}</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium text-justify line-clamp-3">
                  {getSafeText(tour.description, currentLang)}
                </p>
              </div>

              {/* معالم الزيارة الداشبورد تعرض حسب لغة الواجهة الحالية */}
              {tour.details?.landmarksToVisit && (
                <div className="pt-2 border-t border-outline-variant/10">
                  <p className="text-[10px] font-bold text-secondary mb-1">المحطات الحالية ({currentLang}):</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(tour.details.landmarksToVisit?.[currentLang]) ? (
                      tour.details.landmarksToVisit[currentLang].map((l, i) => (
                        <span key={i} className="text-[9px] bg-surface-container-low px-2 py-0.5 rounded text-on-surface-variant font-medium">
                          • {l}
                        </span>
                      ))
                    ) : Array.isArray(tour.details?.landmarksToVisit) ? (
                      tour.details.landmarksToVisit.map((l, i) => (
                        <span key={i} className="text-[9px] bg-surface-container-low px-2 py-0.5 rounded text-on-surface-variant font-medium">
                          • {l}
                        </span>
                      ))
                    ) : (
                      <span className="text-[9px] text-on-surface-variant font-medium">
                        {getSafeText(tour.details.landmarksToVisit, currentLang)}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* أزرار التحكم بالأسفل */}
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