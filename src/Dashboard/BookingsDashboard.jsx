import { useState, useEffect } from "react";
import API from "@/Services/api";

function BookingsDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // الفلاتر: all, pending, confirmed, cancelled
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    API.get("/bookings")
      .then((res) => {
        setBookings(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في تحميل بيانات الحجوزات من السيرفر:", err);
        setLoading(false);
      });
  };

  // تعديل وتحديث حالة الحجز وجدولته
  const handleUpdateStatus = (code, newStatus) => {
    API.put(`/bookings/${code}/status`, { status: newStatus })
      .then(() => {
        alert(`🎉 تم تعديل حالة الحجز ${code} بنجاح!`);
        fetchBookings(); // إعادة تحميل الجدول فوراً
      })
      .catch(() => alert("❌ فشل تحديث حالة الحجز في قاعدة البيانات"));
  };

  // حذف حجز نهائياً من السيستم
  const handleDeleteBooking = (code) => {
    if (window.confirm(`هل أنتِ متأكدة تماماً من مسح الحجز ذو الكود (${code}) من النظام؟`)) {
      API.delete(`/bookings/${code}`).then(() => {
        alert("تم إزالة الحجز بنجاح.");
        fetchBookings();
      });
    }
  };

  // فلترة الحجوزات بناءً على التبويب المختار
  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === "all") return true;
    return b.status === filterStatus;
  });

  if (loading) return <div className="text-center p-12 text-xs font-bold animate-pulse text-primary">جاري مراجعة وجدولة كشوف الحجوزات الحية...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
      
      {/* هيدر الصفحة وأزرار التصفية الفسيحة من التزاحم */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-outline-variant/20 pb-5 gap-4">
        <div>
          <h2 className="text-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">airline_seat_recline_normal</span>
            جدولة وإدارة حجز المقاعد والرحلات
          </h2>
          <p className="text-[11px] text-on-surface-variant mt-1">
            تأكيد المقاعد المحجوزة، تنظيم أعداد المسافرين، ومتابعة التدفقات المالية لرحلات "سوا ترافيل".
          </p>
        </div>

        {/* أزرار الفلترة والتنقل السريع بين حالات الحجز المختلفة */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-surface-container-low rounded-xl w-full lg:w-auto">
          <button onClick={() => setFilterStatus("all")} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer flex-1 lg:flex-none text-center transition-all ${filterStatus === "all" ? "bg-primary text-on-primary shadow-2xs" : "text-on-surface-variant hover:bg-surface-container-high"}`}>الكل ({bookings.length})</button>
          <button onClick={() => setFilterStatus("pending")} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer flex-1 lg:flex-none text-center transition-all ${filterStatus === "pending" ? "bg-amber-600 text-white shadow-2xs" : "text-on-surface-variant hover:bg-surface-container-high"}`}>قيد الانتظار</button>
          <button onClick={() => setFilterStatus("confirmed")} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer flex-1 lg:flex-none text-center transition-all ${filterStatus === "confirmed" ? "bg-emerald-600 text-white shadow-2xs" : "text-on-surface-variant hover:bg-surface-container-high"}`}>المؤكدة</button>
          <button onClick={() => setFilterStatus("cancelled")} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer flex-1 lg:flex-none text-center transition-all ${filterStatus === "cancelled" ? "bg-rose-600 text-white shadow-2xs" : "text-on-surface-variant hover:bg-surface-container-high"}`}>الملغاة</button>
        </div>
      </div>

      {/* استعراض الحجوزات في جدول منظم وهيكلي مريح للعين */}
      {filteredBookings.length === 0 ? (
        <div className="p-12 border border-dashed border-outline-variant/50 rounded-2xl text-center text-xs text-on-surface-variant font-medium">
          لا توجد كشوف أو طلبات حجز تطابق هذا التصنيف حالياً في النظام.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-outline-variant/30 shadow-2xs">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-bold border-b border-outline-variant/30">
                <th className="p-3.5 text-center">كود الحجز</th>
                <th className="p-3.5">بيانات العميل</th>
                <th className="p-3.5">الوجهة أو البرنامج الحركي</th>
                <th className="p-3.5 text-center">توزيع المقاعد</th>
                <th className="p-3.5">تاريخ الحجز</th>
                <th className="p-3.5">إجمالي المبلغ</th>
                <th className="p-3.5 text-center">الحالة</th>
                <th className="p-3.5 text-center">القرارات الإدارية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-medium">
              {filteredBookings.map((book) => {
                // معالجة ذكية لتحديد لون الشارة المريحة بصرياً حسب الحالة الممررة
                let badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
                let computedStatus = "قيد الانتظار";

                if (book.status === "confirmed") {
                  badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
                  computedStatus = "مؤكد للرحلة";
                } else if (book.status === "cancelled") {
                  badgeStyle = "bg-rose-50 text-rose-700 border-rose-200";
                  computedStatus = "ملغي";
                }

                return (
                  <tr key={book.id} className="hover:bg-surface-container-lowest transition-colors">
                    {/* كود الحجز الفريد */}
                    <td className="p-3.5 text-center font-mono font-bold text-primary">{book.booking_code}</td>
                    
                    {/* اسم العميل ورقمه */}
                    <td className="p-3.5">
                      <div className="font-bold text-on-surface">{book.customer_name}</div>
                      <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">📱 {book.phone}</div>
                    </td>
                    
                    {/* الوجهة والبرنامج السياحي المعين */}
                    <td className="p-3.5 text-on-surface-variant max-w-[200px] truncate" title={book.destination}>
                      {book.destination}
                    </td>
                    
                    {/* عدد السياح وأرقام الكراسي المحجوزة بالمصفوفة */}
                    <td className="p-3.5 text-center">
                      <span className="bg-surface-container-high px-2 py-0.5 rounded-md text-[10px] font-mono text-on-surface font-semibold">
                        {book.tourists_count} مسافرين
                      </span>
                      {/* طباعة مصفوفة المقاعد بشكل منسق وآمن */}
                      <div className="text-[9px] text-primary font-mono mt-1 font-bold">
                        رقم المقعد: {Array.isArray(book.seats) ? book.seats.join(", ") : "لم يحدد"}
                      </div>
                    </td>

                    {/* تاريخ تسجيل الحجز القادم من حقل booking_date */}
                    <td className="p-3.5 text-on-surface-variant font-mono text-[11px]">
                      {book.booking_date ? new Date(book.booking_date).toLocaleDateString("ar-SY") : "اليوم"}
                    </td>
                    
                    {/* السعر الإجمالي الفعلي للرحلة */}
                    <td className="p-3.5 font-mono font-bold text-secondary text-[13px]">
                      {parseInt(book.total_price).toLocaleString()} ل.س
                    </td>
                    
                    {/* شارة الحالة اللطيفة */}
                    <td className="p-3.5 text-center">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-md ${badgeStyle}`}>
                        {computedStatus}
                      </span>
                    </td>
                    
                    {/* أزرار اتخاذ القرار المانعة للتزاحم */}
                    <td className="p-3.5 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        {book.status !== "confirmed" && (
                          <button 
                            onClick={() => handleUpdateStatus(book.booking_code, "confirmed")}
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white p-1.5 rounded-lg transition-all cursor-pointer flex items-center"
                            title="تأكيد وتثبيت الحجز للرحلة"
                          >
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                          </button>
                        )}
                        {book.status !== "cancelled" && (
                          <button 
                            onClick={() => handleUpdateStatus(book.booking_code, "cancelled")}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white p-1.5 rounded-lg transition-all cursor-pointer flex items-center"
                            title="إلغاء حجز المقاعد"
                          >
                            <span className="material-symbols-outlined text-sm">block</span>
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteBooking(book.booking_code)}
                          className="bg-surface-container-high text-on-surface hover:bg-rose-600 hover:text-white p-1.5 rounded-lg transition-all cursor-pointer flex items-center"
                          title="حذف الأرشيف تماماً"
                        >
                          <span className="material-symbols-outlined text-sm">delete_outline</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default BookingsDashboard;