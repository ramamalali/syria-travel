import { useState, useEffect } from "react";
import API from "@/Services/api";

function OffersDashboard() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOffer, setEditingOffer] = useState(null); // مسك العرض الجاري تعديله
  const [showAddForm, setShowAddForm] = useState(false);

  // حالة العرض الجديد للاستمارة - متوافقة تماماً مع بنية الكائنات المترجمة المتوقعة بالسيرفر
  const initialOfferState = { 
    title: { ar: "", en: "" }, 
    bookingName: { ar: "", en: "" }, 
    description: { ar: "", en: "" }, 
    discount: { ar: "", en: "" }, 
    price: "" 
  };
  const [newOffer, setNewOffer] = useState(initialOfferState);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = () => {
    API.get("/special-offers")
      .then(res => {
        setOffers(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // ملء استمارة التعديل - مع تأمين الهيكلية لضمان عدم وجود حقول فارغة
  const startEdit = (offer) => {
    setEditingOffer({
      id: offer.id,
      price: offer.price,
      title: { ar: offer.title?.ar || "", en: offer.title?.en || "" },
      bookingName: { ar: offer.bookingName?.ar || "", en: offer.bookingName?.en || "" },
      description: { ar: offer.description?.ar || "", en: offer.description?.en || "" },
      discount: { ar: offer.discount?.ar || "", en: offer.discount?.en || "" }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // إرسال تحديثات العرض للباك إيند
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    API.put(`/special-offers/${editingOffer.id}`, editingOffer)
      .then(() => {
        alert("🎉 تم تحديث بيانات العرض المترجمة بنجاح!");
        setEditingOffer(null);
        loadOffers();
      })
      .catch(err => alert("❌ فشل تحديث العرض"));
  };

  // إرسال كرت عرض جديد
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...newOffer,
      offer_id: `offer-${Date.now()}` // توليد معرف فريد تلقائي
    };

    API.post("/special-offers", payload)
      .then(() => {
        alert("🎉 تم إدراج العرض الخاص والموسمي المترجم بنجاح!");
        setNewOffer(initialOfferState);
        setShowAddForm(false);
        loadOffers();
      })
      .catch(err => alert("❌ خطأ أثناء إضافة العرض"));
  };

  // حذف نهائي للعرض
  const handleDelete = (offerId) => {
    if (window.confirm("هل أنتِ متأكدة من حذف هذا العرض الحصري تماماً؟")) {
      API.delete(`/special-offers/${offerId}`).then(() => {
        alert("تم إقصاء العرض بنجاح.");
        loadOffers();
      });
    }
  };

  if (loading) return <div className="text-center p-12 text-xs font-bold animate-pulse text-primary">جاري جلب العروض التنافسية والحصرية...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm" dir="rtl">
      
      {/* الرأس والتحكم */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-outline-variant/20 pb-4 gap-4">
        <div>
          <h2 className="text-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">local_activity</span>
            إدارة العروض الخاصة والحملات الموسمية (متعدد اللغات)
          </h2>
          <p className="text-[11px] text-on-surface-variant mt-1">
            إطلاق باقات التوفير باللغتين العربية والإنجليزية، تعديل نسب الخصم، وتحديث أسعار الرحلات الحصرية.
          </p>
        </div>
        <button 
          onClick={() => { setShowAddForm(!showAddForm); setEditingOffer(null); }}
          className="bg-primary text-on-primary text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-sm flex items-center gap-1 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">{showAddForm ? "close" : "add_circle"}</span>
          {showAddForm ? "إغلاق الاستمارة" : "إضافة باقة عرض جديدة"}
        </button>
      </div>

      {/* 1. استمارة تعديل عرض قائم */}
      {editingOffer && (
        <form onSubmit={handleUpdateSubmit} className="p-6 border-2 border-primary rounded-2xl bg-primary/5 space-y-5 animate-scaleUp">
          <h3 className="text-xs font-bold text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">edit_attributes</span>
            تعديل بيانات العرض: <span className="underline">{editingOffer.title.ar || editingOffer.title.en}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* العناوين */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-primary">اسم العرض (العربية)</label>
              <input required type="text" value={editingOffer.title.ar} onChange={e => setEditingOffer({...editingOffer, title: {...editingOffer.title, ar: e.target.value}})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary" />
            </div>
            <div className="space-y-1" dir="ltr">
              <label className="text-[11px] font-bold text-secondary block text-left">Offer Title (English)</label>
              <input required type="text" value={editingOffer.title.en} onChange={e => setEditingOffer({...editingOffer, title: {...editingOffer.title, en: e.target.value}})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary text-left" />
            </div>

            {/* أسماء البرامج للحجز */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-primary">اسم البرنامج الكامل في استمارة الحجز (العربية)</label>
              <input required type="text" value={editingOffer.bookingName.ar} onChange={e => setEditingOffer({...editingOffer, bookingName: {...editingOffer.bookingName, ar: e.target.value}})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary" />
            </div>
            <div className="space-y-1" dir="ltr">
              <label className="text-[11px] font-bold text-secondary block text-left">Booking Program Name (English)</label>
              <input required type="text" value={editingOffer.bookingName.en} onChange={e => setEditingOffer({...editingOffer, bookingName: {...editingOffer.bookingName, en: e.target.value}})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary text-left" />
            </div>

            {/* قيمة الخصومات */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-primary">قيمة الخصم بالعربية (مثال: خصم 25%)</label>
              <input required type="text" value={editingOffer.discount.ar} onChange={e => setEditingOffer({...editingOffer, discount: {...editingOffer.discount, ar: e.target.value}})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary" />
            </div>
            <div className="space-y-1" dir="ltr">
              <label className="text-[11px] font-bold text-secondary block text-left">Discount In English (e.g., 25% OFF)</label>
              <input required type="text" value={editingOffer.discount.en} onChange={e => setEditingOffer({...editingOffer, discount: {...editingOffer.discount, en: e.target.value}})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary text-left" />
            </div>

            {/* السعر النهائي المشترك كـ Number */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-[11px] font-bold text-primary">السعر النهائي بعد الخصم (ل.س) - رقمي مشترك</label>
              <input required type="number" value={editingOffer.price} onChange={e => setEditingOffer({...editingOffer, price: parseInt(e.target.value) || 0})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary" />
            </div>

            {/* وصف العروض */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-[11px] font-bold text-primary">شرح تفاصيل باقة العرض (العربية)</label>
              <textarea required rows="2" value={editingOffer.description.ar} onChange={e => setEditingOffer({...editingOffer, description: {...editingOffer.description, ar: e.target.value}})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white resize-none outline-none focus:border-primary" />
            </div>
            <div className="space-y-1 md:col-span-2" dir="ltr">
              <label className="text-[11px] font-bold text-secondary block text-left">Offer Description & Features (English)</label>
              <textarea required rows="2" value={editingOffer.description.en} onChange={e => setEditingOffer({...editingOffer, description: {...editingOffer.description, en: e.target.value}})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white resize-none outline-none focus:border-primary text-left" />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setEditingOffer(null)} className="bg-outline-variant text-on-surface text-xs font-bold px-4 py-2 rounded-xl cursor-pointer">إلغاء</button>
            <button type="submit" className="bg-primary text-on-primary text-xs font-bold px-6 py-2 rounded-xl cursor-pointer">حفظ العرض المحدث</button>
          </div>
        </form>
      )}

      {/* 2. استمارة إضافة عرض جديد بالكامل */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-6 border border-amber-500 rounded-2xl bg-amber-50/20 space-y-5 animate-scaleUp">
          <h3 className="text-xs font-bold text-amber-800 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">workspace_premium</span>إطلاق باقة عرض حصرية جديدة للنظام (مترجمة)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* مدخلات الاسم ثنائي اللغة */}
            <input required type="text" placeholder="اسم العرض بالعربية (العرض العائلي الصيفي)" value={newOffer.title.ar} onChange={e => setNewOffer({...newOffer, title: {...newOffer.title, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <input required type="text" placeholder="Offer Title in English (e.g. Summer Family Offer)" value={newOffer.title.en} onChange={e => setNewOffer({...newOffer, title: {...newOffer.title, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white outline-none text-left" dir="ltr" />
            
            {/* مدخلات الحجز للربط */}
            <input required type="text" placeholder="اسم البرنامج الكامل للحجز (العربية)" value={newOffer.bookingName.ar} onChange={e => setNewOffer({...newOffer, bookingName: {...newOffer.bookingName, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <input required type="text" placeholder="Booking Name in English (for identification)" value={newOffer.bookingName.en} onChange={e => setNewOffer({...newOffer, bookingName: {...newOffer.bookingName, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white outline-none text-left" dir="ltr" />
            
            {/* مدخلات الخصم */}
            <input required type="text" placeholder="الخصم بالعربية (مثال: خصم 30%)" value={newOffer.discount.ar} onChange={e => setNewOffer({...newOffer, discount: {...newOffer.discount, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <input required type="text" placeholder="Discount in English (e.g. 30% OFF)" value={newOffer.discount.en} onChange={e => setNewOffer({...newOffer, discount: {...newOffer.discount, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white outline-none text-left" dir="ltr" />
            
            {/* السعر المشترك */}
            <input required type="number" placeholder="السعر الصافي بالليرة لجميع اللغات (عدد فقط)" value={newOffer.price} onChange={e => setNewOffer({...newOffer, price: parseInt(e.target.value) || 0})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2 outline-none" />
            
            {/* نصوص الوصف المترجمة */}
            <textarea required placeholder="وصف الرحلة ومميزات هذا العرض بالتفصيل (العربية)..." rows="2" value={newOffer.description.ar} onChange={e => setNewOffer({...newOffer, description: {...newOffer.description, ar: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2 resize-none outline-none" />
            <textarea required placeholder="Offer description and features in detail (English)..." rows="2" value={newOffer.description.en} onChange={e => setNewOffer({...newOffer, description: {...newOffer.description, en: e.target.value}})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2 resize-none outline-none text-left" dir="ltr" />
          </div>
          
          <button type="submit" className="bg-amber-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer">نشر وتفعيل العرض الترويجي</button>
        </form>
      )}

      {/* 3. استعراض باقات كروت العروض الحالية بدون تداخل (تعرض اللغتين معاً للمراجعة السريعة من المسؤول) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="border border-outline-variant/30 rounded-2xl flex flex-col justify-between bg-white overflow-hidden shadow-sm hover:shadow-md transition-all p-5 space-y-4 relative">
            
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-primary leading-snug">🇸🇾 {offer.title?.ar || "بدون عنوان عربي"}</h4>
                  <h4 className="text-[11px] font-semibold text-secondary leading-snug mt-0.5 text-right" dir="ltr">🇬🇧 {offer.title?.en || "No English Title"}</h4>
                </div>
                <div className="flex flex-col gap-1 items-end whitespace-nowrap">
                  <span className="bg-rose-50 text-rose-600 border border-rose-100 text-[9px] font-bold px-2 py-0.5 rounded-md">
                    {offer.discount?.ar || "خصم"}
                  </span>
                  <span className="bg-amber-50 text-amber-700 border border-amber-100 text-[8px] font-bold px-2 py-0.5 rounded-md" dir="ltr">
                    {offer.discount?.en || "OFF"}
                  </span>
                </div>
              </div>
              
              <p className="text-[10px] text-secondary font-semibold bg-surface-container-low px-2 py-1 rounded inline-block">
                السعر الحالي: {Number(offer.price).toLocaleString()} ل.س
              </p>
              
              {/* استعراض تفصيلي مصغر للنصوص المترجمة داخل كرت الإدارة */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] text-on-surface-variant leading-relaxed text-justify line-clamp-3">
                  <span className="font-bold text-[9px] text-primary">AR:</span> {offer.description?.ar}
                </p>
                <p className="text-[10px] text-on-surface-variant/80 leading-relaxed text-left line-clamp-3" dir="ltr">
                  <span className="font-bold text-[9px] text-secondary">EN:</span> {offer.description?.en}
                </p>
              </div>
            </div>

            {/* تفاصيل أسماء الربط بالحجوزات لكلا اللغتين بجزء سفلي منفصل */}
            <div className="pt-3 border-t border-outline-variant/10 space-y-3">
              <div className="text-[9px] text-on-surface-variant/70 space-y-0.5">
                <p>💡 ربط الحجز (AR): <span className="text-on-surface font-sans font-bold">{offer.bookingName?.ar}</span></p>
                <p dir="ltr" className="text-left">💡 program (EN): <span className="text-on-surface font-sans font-bold">{offer.bookingName?.en}</span></p>
              </div>
              
              {/* أزرار التحكم بالكرت */}
              <div className="flex gap-2">
                <button 
                  onClick={() => startEdit(offer)}
                  className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">edit</span>
                  تعديل اللغتين
                </button>
                <button 
                  onClick={() => handleDelete(offer.id)}
                  className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white p-2 rounded-xl transition-all cursor-pointer"
                  title="حذف العرض بالكامل"
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

export default OffersDashboard;