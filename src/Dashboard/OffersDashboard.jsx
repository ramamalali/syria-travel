import { useState, useEffect } from "react";
import API from "@/Services/api";

function OffersDashboard() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOffer, setEditingOffer] = useState(null); // مسك العرض الجاري تعديله
  const [showAddForm, setShowAddForm] = useState(false);

  // حالة العرض الجديد للاستمارة
  const initialOfferState = { offer_id: "", title: "", bookingName: "", description: "", discount: "", price: "" };
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

  // ملء استمارة التعديل
  const startEdit = (offer) => {
    setEditingOffer({ ...offer });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // إرسال تحديثات العرض للباك إيند
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    API.put(`/special-offers/${editingOffer.id}`, editingOffer)
      .then(() => {
        alert("🎉 تم تحديث بيانات العرض بنجاح!");
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
        alert("🎉 تم إدراج العرض الخاص والموسمي الجديد بنجاح!");
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
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
      
      {/* الرأس والتحكم */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-outline-variant/20 pb-4 gap-4">
        <div>
          <h2 className="text-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">local_activity</span>
            إدارة العروض الخاصة والحملات الموسمية
          </h2>
          <p className="text-[11px] text-on-surface-variant mt-1">
            إطلاق باقات التوفير، تعديل نسب الخصم المئوية، وتحديث أسعار الرحلات العائلية الحصرية.
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
        <form onSubmit={handleUpdateSubmit} className="p-6 border-2 border-primary rounded-2xl bg-primary/5 space-y-5">
          <h3 className="text-xs font-bold text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">edit_attributes</span>
            تعديل بيانات العرض: <span className="underline">{editingOffer.title}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold">اسم العرض الرئيسي</label>
              <input type="text" value={editingOffer.title} onChange={e => setEditingOffer({...editingOffer, title: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary" />
            </div>
            <div className="space-y-1 md:col-span-1 lg:col-span-2">
              <label className="text-[11px] font-bold">اسم البرنامج الكامل في استمارة الحجز</label>
              <input type="text" value={editingOffer.bookingName} onChange={e => setEditingOffer({...editingOffer, bookingName: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold">قيمة الخصم (مثال: خصم 25%)</label>
              <input type="text" value={editingOffer.discount} onChange={e => setEditingOffer({...editingOffer, discount: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold">السعر النهائي بعد الخصم (ل.س)</label>
              <input type="number" value={editingOffer.price} onChange={e => setEditingOffer({...editingOffer, price: parseInt(e.target.value) || 0})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white outline-none focus:border-primary" />
            </div>
            <div className="space-y-1 md:col-span-2 lg:col-span-4">
              <label className="text-[11px] font-bold">شرح تفاصيل ومميزات باقة العرض المخصصة</label>
              <textarea rows="3" value={editingOffer.description} onChange={e => setEditingOffer({...editingOffer, description: e.target.value})} className="border border-outline-variant p-2.5 rounded-xl text-xs w-full bg-white resize-none outline-none focus:border-primary" />
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
        <form onSubmit={handleAddSubmit} className="p-6 border border-amber-500 rounded-2xl bg-amber-50/20 space-y-5">
          <h3 className="text-xs font-bold text-amber-800 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">workspace_premium</span>إطلاق باقة عرض حصرية جديدة للنظام
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input required type="text" placeholder="اسم العرض (العرض العائلي الصيفي)" value={newOffer.title} onChange={e => setNewOffer({...newOffer, title: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <input required type="text" placeholder="اسم البرنامج الكامل في جدول الحجز" value={newOffer.bookingName} onChange={e => setNewOffer({...newOffer, bookingName: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-1 lg:col-span-2 outline-none" />
            <input required type="text" placeholder="الخصم (مثال: خصم 30%)" value={newOffer.discount} onChange={e => setNewOffer({...newOffer, discount: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <input required type="number" placeholder="السعر الصافي بالليرة (عدد فقط)" value={newOffer.price} onChange={e => setNewOffer({...newOffer, price: parseInt(e.target.value) || 0})} className="border p-2.5 rounded-xl text-xs bg-white outline-none" />
            <textarea required placeholder="اكتبي هنا وصف الرحلة ومميزات هذا العرض بالتفصيل العريض ليرغب الزبائن بالحجز فوراً..." rows="3" value={newOffer.description} onChange={e => setNewOffer({...newOffer, description: e.target.value})} className="border p-2.5 rounded-xl text-xs bg-white md:col-span-2 lg:col-span-4 resize-none outline-none" />
          </div>
          <button type="submit" className="bg-amber-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer">نشر وتفعيل العرض الترويجي</button>
        </form>
      )}

      {/* 3. استعراض باقات كروت العروض الحالية بدون تداخل */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="border border-outline-variant/30 rounded-2xl flex flex-col justify-between bg-white overflow-hidden shadow-sm hover:shadow-md transition-all p-5 space-y-4 relative">
            
            {/* الجزء العلوي: العنوان وشارات السعر */}
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-primary leading-snug">{offer.title}</h4>
                <span className="bg-rose-50 text-rose-600 border border-rose-100 text-[9px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap">
                  {offer.discount}
                </span>
              </div>
              <p className="text-[10px] text-secondary font-semibold bg-surface-container-low px-2 py-1 rounded inline-block">
                السعر الحالي: {offer.price.toLocaleString()} ل.س
              </p>
              <p className="text-[11px] text-on-surface-variant leading-relaxed text-justify font-medium">
                {offer.description}
              </p>
            </div>

            {/* تفاصيل اسم الحجز الصغير المريح بجزء سفلي منفصل */}
            <div className="pt-3 border-t border-outline-variant/10 space-y-3">
              <p className="text-[9px] text-on-surface-variant/70 font-mono">
                💡 اسم الربط بالحجوزات: <span className="text-on-surface font-sans font-bold">{offer.bookingName}</span>
              </p>
              
              {/* أزرار التحكم بالكرت */}
              <div className="flex gap-2">
                <button 
                  onClick={() => startEdit(offer)}
                  className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">edit</span>
                  تعديل العرض
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