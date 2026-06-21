import { useState, useEffect, useRef } from 'react';

function BookingModal({ isModalOpen, handleCloseModal, destination }) {
  // الحالات البرمجية الداخلية للمودال
  const [currentStep, setCurrentStep] = useState(1);
  const [touristsCount, setTouristsCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([1]);
  const [landmark, setLandmark] = useState(""); // لتخزين اسم الوجهة المحددة للرحلة
  const scrollContainerRef = useRef(null);

  const seatPrice = 150000; // السعر المتوافق مع الكروت المحدثة

  const labels = {
    1: "الخطوة 1: تحديد وجهتك والسياح",
    2: "الخطوة 2: اختيار البرنامج والمقاعد الديناميكية",
    3: "الخطوة 3: ملخص الحجز والخيارات المقيدة",
  };

  // تحديث الحقل والخطوات عند فتح المودال بالاعتماد على الكرت المختار
  useEffect(() => {
    if (isModalOpen) {
      setLandmark(destination);
      setCurrentStep(1);
      setTouristsCount(1);
      setSelectedSeats([1]);
    }
  }, [isModalOpen, destination]);

  // تحديث المقاعد تلقائياً لتتطابق مع عدد السياح المختار
  useEffect(() => {
    const seats = [];
    for (let i = 0; i < touristsCount; i++) {
      seats.push((selectedSeats[0] || 1) + i);
    }
    setSelectedSeats(seats);
  }, [touristsCount]);

  const goToStep = (step) => {
    setCurrentStep(step);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleSeatStartChange = (startSeat) => {
    const seats = [];
    for (let i = 0; i < touristsCount; i++) {
      seats.push(startSeat + i);
    }
    setSelectedSeats(seats);
  };

  const confirmBooking = () => {
    alert(`تم تأكيد حجزك لـ (${landmark}) بنجاح!\nيرجى زيارة المكتب لتثبيت المقاعد.`);
    handleCloseModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* الخلفية المضببة */}
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm animate-fadeIn"
        onClick={handleCloseModal}
      ></div>

      {/* جسم المودال */}
      <div className="relative bg-surface-container-lowest w-full max-w-xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col scale-100 opacity-100 animate-scaleUp">
        <div className="h-1 bg-secondary w-full"></div>
        
        <header className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="font-bold text-lg text-primary">حجز رحلة سياحية</h2>
            <p className="text-sm text-on-surface-variant opacity-70">
              {labels[currentStep]}
            </p>
          </div>
          <button
            className="p-2 hover:bg-surface-container rounded-full transition-colors"
            onClick={handleCloseModal}
          >
            <span className="material-symbols-outlined text-primary">close</span>
          </button>
        </header>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-5 md:p-6 relative scroll-smooth"
        >
          {/* الخطوة 1 */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-2">
                <label className="font-label-md text-primary block">نوع البرنامج السياحي</label>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-primary bg-primary-fixed/20 rounded-xl transition-all">
                    <span className="material-symbols-outlined text-primary" data-weight="fill">temple_hindu</span>
                    <span className="text-sm font-bold text-primary">آثار ومعالم</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-outline-variant/30 rounded-xl hover:border-primary/50 transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant">landscape</span>
                    <span className="text-sm text-on-surface-variant">طبيعة واسترخاء</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-primary block">عدد السواح</label>
                <div className="flex items-center border border-outline-variant/50 rounded-xl p-2 h-12 bg-white">
                  <button
                    onClick={() => setTouristsCount(Math.max(1, touristsCount - 1))}
                    className="p-1.5 text-primary hover:bg-gray-100 rounded-lg"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <input
                    className="w-full text-center border-none focus:ring-0 font-bold text-primary bg-transparent outline-none"
                    readOnly
                    type="text"
                    value={touristsCount}
                  />
                  <button
                    onClick={() => setTouristsCount(touristsCount + 1)}
                    className="p-1.5 text-primary hover:bg-gray-100 rounded-lg"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-label-md text-primary">نقطة التجمع</label>
                  <div className="flex items-center gap-2 border border-outline-variant/50 rounded-xl p-3 bg-white focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-secondary">location_on</span>
                    <input className="w-full border-none focus:ring-0 text-sm p-0 outline-none" placeholder="دمشق، حلب..." type="text" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-primary">المعلم أو الوجهة السياحية</label>
                  <div className="flex items-center gap-2 border border-outline-variant/50 rounded-xl p-3 bg-white focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-secondary">museum</span>
                    {/* الحقل يقرأ ويحدث القيمة المستلمة تلقائياً من الكرت */}
                    <input 
                      className="w-full border-none focus:ring-0 text-sm p-0 outline-none text-primary font-bold" 
                      placeholder="قلعة الحصن، تدمر، أفاميا..." 
                      type="text" 
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  className="bg-primary text-on-primary w-full sm:w-auto px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                  onClick={() => goToStep(2)}
                >
                  <span>استعراض الرحلات السياحية</span>
                  <span className="material-symbols-outlined group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
                </button>
              </div>
            </div>
          )}

          {/* الخطوة 2 */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-3">
                <h3 className="font-medium text-primary text-sm">البرامج السياحية المتوفرة</h3>
                <div className="p-3 border border-primary rounded-xl bg-primary-fixed/10 flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>tour</span>
                    </div>
                    <div>
                      {/* دمج اسم المعلم ديناميكياً برأس القائمة */}
                      <div className="font-bold text-sm text-primary">برنامج {landmark || "الوجهة المحددة"} المتكامل</div>
                      <div className="text-xs text-on-surface-variant">الانطلاق: 07:30 ص من نقطة التجمع</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-secondary text-sm font-bold">{seatPrice.toLocaleString()} ل.س / للفرد</div>
                    <div className="text-[9px] text-green-600 font-bold uppercase">متاحة</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <label className="font-medium text-primary text-sm block">حجز المقاعد بحسب عدد السياح ({touristsCount})</label>
                <div className="relative flex items-center gap-2 border border-outline-variant/50 rounded-xl p-3 bg-white focus-within:border-primary transition-all">
                  <span className="material-symbols-outlined text-secondary">airline_seat_recline_normal</span>
                  <select
                    value={selectedSeats[0] || 1}
                    onChange={(e) => handleSeatStartChange(Number(e.target.value))}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm p-0 outline-none cursor-pointer text-primary font-bold pr-6"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seatNum) => (
                      <option key={seatNum} value={seatNum}>
                        تبدأ من مقعد رقم {seatNum}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 pt-3 mt-2 border-t border-outline-variant/30 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">المقاعد المحجوزة للمجموعة:</span>
                    <span className="font-bold text-primary">
                      {selectedSeats.map(s => `مقعد ${s}`).join(" ، ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">مجموع التكلفة المبدئية:</span>
                    <span className="font-bold text-secondary">{(seatPrice * touristsCount).toLocaleString()} ل.س</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <button
                  className="text-primary text-sm font-medium flex items-center gap-1 hover:translate-x-1 transition-transform"
                  onClick={() => goToStep(1)}
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                  <span>العودة</span>
                </button>
                <button
                  className="bg-primary text-on-primary px-6 py-3 rounded-xl text-sm font-medium shadow-lg transition-all flex items-center gap-2"
                  onClick={() => goToStep(3)}
                >
                  <span>تأكيد البيانات</span>
                  <span className="material-symbols-outlined">person_add</span>
                </button>
              </div>
            </div>
          )}

          {/* الخطوة 3 */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-4">
                <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
                  <h3 className="font-medium text-primary text-sm mb-2">ملخص الرحلة السياحية</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-on-surface-variant">البرنامج وعدد الأفراد</p>
                      <p className="font-bold text-primary">{landmark} ({touristsCount} أشخاص)</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant">المقاعد المخصصة</p>
                      <p className="font-bold text-primary text-[11px]">
                        {selectedSeats.join(" ، ")}
                      </p>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-medium text-primary text-sm">طريقة دفع التكاليف المتاحة</h3>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center gap-2 opacity-40 cursor-not-allowed text-center bg-gray-50 text-gray-400">
                    <span className="material-symbols-outlined text-2xl">credit_card</span>
                    <span className="text-xs font-medium">بطاقة ائتمان</span>
                  </div>
                  <div className="p-3 border-2 border-primary rounded-xl bg-primary/5 text-primary flex flex-col items-center gap-2 cursor-pointer text-center transition-all shadow-sm">
                    <span className="material-symbols-outlined text-2xl">storefront</span>
                    <span className="text-xs font-bold">الدفع في المكتب</span>
                  </div>
                  <div className="p-3 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center gap-2 opacity-40 cursor-not-allowed text-center bg-gray-50 text-gray-400">
                    <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                    <span className="text-xs font-medium">محفظة</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-on-surface-variant">إجمالي تكلفة البرنامج:</span>
                    <span className="text-lg font-bold text-secondary">
                      {(seatPrice * touristsCount).toLocaleString()} ل.س
                    </span>
                  </div>
                  <button
                    className="w-full bg-secondary text-primary font-bold py-4 rounded-xl text-md shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                    onClick={confirmBooking}
                  >
                    تأكيد الحجز السياحي
                  </button>
                </div>
              </div>
              <div className="flex justify-start">
                <button
                  className="text-primary text-sm font-medium flex items-center gap-1 hover:translate-x-1 transition-transform"
                  onClick={() => goToStep(2)}
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                  <span>العودة لاختيار البرنامج</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="p-4 border-t border-outline-variant/10 bg-surface-container-lowest flex justify-center gap-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((stepNum) => {
              let dotClass = "bg-outline-variant w-2.5";
              if (currentStep === stepNum) {
                dotClass = "bg-primary w-6";
              } else if (stepNum < currentStep) {
                dotClass = "bg-primary/50 w-2.5";
              }
              return (
                <div
                  key={stepNum}
                  className={`h-2.5 rounded-full transition-all duration-300 ${dotClass}`}
                ></div>
              );
            })}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default BookingModal;