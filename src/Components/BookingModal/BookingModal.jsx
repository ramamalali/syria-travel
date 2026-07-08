import { useState, useEffect, useRef } from "react";

function BookingModal({ isModalOpen, handleCloseModal, destination }) {
  // الحالات البرمجية الداخلية للمودال
  const [currentStep, setCurrentStep] = useState(1);
  const [touristsCount, setTouristsCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([1]);
  const [landmark, setLandmark] = useState(""); // لتخزين اسم الوجهة المحددة للرحلة

  // حقول بيانات المستخدم
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+963"); // القيمة الافتراضية لسوريا
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gatheringPoint, setGatheringPoint] = useState("");

  const scrollContainerRef = useRef(null);
  const seatPrice = 150000; // السعر لكل مقعد

  // حالة التحكم في اللغة النشطة للاستماع الفوري والتحديث اللحظي للواجهة
  const [currentLang, setCurrentLang] = useState(
    () => localStorage.getItem("site_lang") || "ar",
  );

  // 1. الاستماع لحدث تغيير اللغة الفوري المُنطلق من النافبار
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };
    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // كائن الترجمة المتكامل لكل نصوص وخطوات المودال
  const t = {
    ar: {
      modalTitle: "حجز رحلة سياحية",
      step1Label: "الخطوة 1: تحديد وجهتك والسياح",
      step2Label: "الخطوة 2: اختيار البرنامج والمقاعد الديناميكية",
      step3Label: "الخطوة 3: ملخص الحجز والبيانات الشخصية والدفع",
      progType: "نوع البرنامج السياحي",
      type1: "آثار ومعالم",
      type2: "طبيعة واسترخاء",
      touristsNum: "عدد السياح",
      gatheringPt: "نقطة التجمع",
      gatheringPlaceholder: "دمشق، حلب...",
      destinationLabel: "المعلم أو الوجهة السياحية",
      destinationPlaceholder: "قلعة الحصن، تدمر، أفاميا...",
      btnNext1: "استعراض الرحلات السياحية",
      availableProgs: "البرامج السياحية المتوفرة",
      integratedProg: "برنامج المتميز المتكامل",
      departureTime: "الانطلاق: 07:30 ص من نقطة التجمع",
      pricePerPerson: "ل.س / للفرد",
      statusAvailable: "متاحة",
      reserveSeats: "حجز المقاعد بحسب عدد السياح",
      seatStart: "تبدأ من مقعد رقم",
      reservedSeatsGroup: "المقاعد المحجوزة للمجموعة:",
      seatLabel: "مقعد",
      initialCost: "مجموع التكلفة المبدئية:",
      currency: "ل.س",
      btnBack: "العودة",
      btnNext2: "بيانات العميل والدفع",
      summaryTitle: "ملخص الرحلة السياحية",
      summaryProg: "البرنامج وعدد الأفراد",
      summaryPersons: "أشخاص",
      assignedSeats: "المقاعد المخصصة",
      clientDataTitle: "بيانات المسافر الرئيسي للتثبيت",
      fullNameLabel: "الاسم الكامل",
      fullNamePlaceholder: "أدخل اسمك الثلاثي",
      phoneLabel: "رقم الهاتف",
      paymentMethodTitle: "طريقة دفع التكاليف المتاحة",
      payCredit: "بطاقة ائتمان",
      payOffice: "الدفع في المكتب",
      payWallet: "محفظة",
      totalCostLabel: "إجمالي تكلفة البرنامج:",
      btnConfirm: "تأكيد الحجز السياحي والدفع",
      btnBackToProg: "العودة لاختيار البرنامج",
      alertFillData: "يرجى ملء الاسم الكامل ورقم الهاتف أولاً لإتمام الحجز.",
      alertSuccess:
        "شكراً لك!\nتم تأكيد حجزك للوجهة بنجاح.\nيرجى زيارة المكتب لتثبيت المقاعد.",
      // النصوص الجديدة للربح المجاني الوهمي
      freeBookingAlert: "🎉 مبروك! لقد تم اختيارك لربح هذا الحجز مجاناً بالكامل! التكلفة الآن: 0 ل.س! 🎁",
      freeBookingAlertEn: "🎉 Congratulations! You have been selected to win this booking for completely free! Total Cost: 0 SYP! 🎁",
    },
    en: {
      modalTitle: "Book a Tour Trip",
      step1Label: "Step 1: Select Destination & Tourists",
      step2Label: "Step 2: Program Selection & Dynamic Seats",
      step3Label: "Step 3: Booking Summary, Personal Info & Payment",
      progType: "Tour Program Type",
      type1: "Antiquities & Landmarks",
      type2: "Nature & Relaxation",
      touristsNum: "Number of Tourists",
      gatheringPt: "Gathering Point",
      gatheringPlaceholder: "Damascus, Aleppo...",
      destinationLabel: "Landmark or Destination",
      destinationPlaceholder: "Krak des Chevaliers, Palmyra...",
      btnNext1: "Browse Available Tours",
      availableProgs: "Available Tour Programs",
      integratedProg: "Premium Integrated Program",
      departureTime: "Departure: 07:30 AM from gathering point",
      pricePerPerson: "SYP / Person",
      statusAvailable: "AVAILABLE",
      reserveSeats: "Reserve Seats for Group Size",
      seatStart: "Starts from seat number",
      reservedSeatsGroup: "Reserved Seats for Group:",
      seatLabel: "Seat",
      initialCost: "Initial Total Cost:",
      currency: "SYP",
      btnBack: "Back",
      btnNext2: "Client Info & Payment",
      summaryTitle: "Tour Booking Summary",
      summaryProg: "Program & Attendees",
      summaryPersons: "people",
      assignedSeats: "Assigned Seats",
      clientDataTitle: "Primary Traveler Verification Info",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "Enter your full triple name",
      phoneLabel: "Phone Number",
      paymentMethodTitle: "Available Payment Methods",
      payCredit: "Credit Card",
      payOffice: "Pay at Office",
      payWallet: "E-Wallet",
      totalCostLabel: "Total Program Cost:",
      btnConfirm: "Confirm Tour Booking & Pay",
      btnBackToProg: "Back to Program Selection",
      alertFillData:
        "Please enter your full name and phone number to complete the booking.",
      alertSuccess:
        "Thank you!\nYour booking has been registered successfully.\nPlease visit our office to confirm your seats.",
    },
  };

  const stepLabels = {
    1: t[currentLang].step1Label,
    2: t[currentLang].step2Label,
    3: t[currentLang].step3Label,
  };

  // تحديث الحقل والخطوات عند فتح المودال بالاعتماد على الكرت المختار
  useEffect(() => {
    if (isModalOpen) {
      setLandmark(destination);
      setCurrentStep(1);
      setTouristsCount(1);
      setSelectedSeats([1]);
      setFullName("");
      setPhoneNumber("");
      setGatheringPoint("");
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

  const confirmBooking = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !phoneNumber.trim()) {
      alert(t[currentLang].alertFillData);
      return;
    }

    // المنطق الوهمي: جلب عداد الحجوزات الحالي من الستورج وزيادته
    const currentCount = Number(localStorage.getItem("mock_bookings_count") || 0) + 1;
    localStorage.setItem("mock_bookings_count", currentCount);

    // التحقق إذا كان الحجز رقم 5 أو مضاعفاته
    const isFreeWin = currentCount % 5 === 0;

    if (isFreeWin) {
      // إظهار بوب اب الفوز المجاني أولاً
      alert(currentLang === "ar" ? t.ar.freeBookingAlert : t.ar.freeBookingAlertEn);
    }

    // صياغة نص التكلفة النهائي بناءً على الفوز أو الحجز العادي
    const finalCostText = isFreeWin 
      ? (currentLang === "ar" ? "مجاني (0 ل.س)" : "FREE (0 SYP)") 
      : `${(seatPrice * touristsCount).toLocaleString()} ${t[currentLang].currency}`;

    alert(
      currentLang === "ar"
        ? `شكراً لكِ ${fullName}!\nتم تسجيل حجزكِ لـ (${landmark || "الوجهة"}) بنجاح برقم الهاتف: ${phoneNumber}.\nإجمالي التكلفة: ${finalCostText}.\nيرجى زيارة المكتب لتثبيت المقاعد.`
        : `Thank you ${fullName}!\nYour booking for (${landmark || "Destination"}) was received successfully for phone: ${phoneNumber}.\nTotal Cost: ${finalCostText}.\nPlease visit our branch to secure your seating.`,
    );
    
    handleCloseModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* الخلفية الضبابية التفاعلية */}
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm animate-fadeIn"
        onClick={handleCloseModal}
      ></div>

      {/* جسم النافذة الرئيسي المتحسس للاتجاه واللغة */}
      <div
        className="relative bg-surface-container-lowest w-full max-w-xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col scale-100 opacity-100 animate-scaleUp"
        dir={currentLang === "ar" ? "rtl" : "ltr"}
      >
        <div className="h-1 bg-secondary w-full"></div>

        <header className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="font-bold text-lg text-primary">
              {t[currentLang].modalTitle}
            </h2>
            <p className="text-xs text-on-surface-variant opacity-70 mt-0.5">
              {stepLabels[currentStep]}
            </p>
          </div>
          <button
            className="p-2 hover:bg-surface-container rounded-full transition-colors cursor-pointer"
            onClick={handleCloseModal}
          >
            <span className="material-symbols-outlined text-primary">
              close
            </span>
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
                <label className="font-label-md text-primary block font-bold text-xs">
                  {t[currentLang].progType}
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-primary bg-primary-fixed/20 rounded-xl transition-all"
                  >
                    <span
                      className="material-symbols-outlined text-primary"
                      data-weight="fill"
                    >
                      temple_hindu
                    </span>
                    <span className="text-xs font-bold text-primary">
                      {t[currentLang].type1}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-outline-variant/30 rounded-xl hover:border-primary/50 transition-all opacity-60"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant">
                      landscape
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      {t[currentLang].type2}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-primary block font-bold text-xs">
                  {t[currentLang].touristsNum}
                </label>
                <div className="flex items-center border border-outline-variant/50 rounded-xl p-2 h-12 bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() =>
                      setTouristsCount(Math.max(1, touristsCount - 1))
                    }
                    className="p-1.5 text-primary hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <input
                    className="w-full text-center border-none focus:ring-0 font-bold text-primary bg-transparent outline-none font-mono"
                    readOnly
                    type="text"
                    value={touristsCount}
                  />
                  <button
                    type="button"
                    onClick={() => setTouristsCount(touristsCount + 1)}
                    className="p-1.5 text-primary hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-label-md text-primary font-bold text-xs">
                    {t[currentLang].gatheringPt}
                  </label>
                  <div className="flex items-center gap-2 border border-outline-variant/50 rounded-xl p-3 bg-white focus-within:border-primary transition-all shadow-2xs">
                    <span className="material-symbols-outlined text-secondary">
                      location_on
                    </span>
                    <input
                      className="w-full border-none focus:ring-0 text-xs p-0 outline-none font-medium"
                      placeholder={t[currentLang].gatheringPlaceholder}
                      type="text"
                      value={gatheringPoint}
                      onChange={(e) => setGatheringPoint(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-primary font-bold text-xs">
                    {t[currentLang].destinationLabel}
                  </label>
                  <div className="flex items-center gap-2 border border-outline-variant/50 rounded-xl p-3 bg-white focus-within:border-primary transition-all shadow-2xs">
                    <span className="material-symbols-outlined text-secondary">
                      museum
                    </span>
                    <input
                      className="w-full border-none focus:ring-0 text-xs p-0 outline-none text-primary font-bold"
                      placeholder={t[currentLang].destinationPlaceholder}
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  className="bg-primary text-on-primary w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  onClick={() => goToStep(2)}
                >
                  <span>{t[currentLang].btnNext1}</span>
                  <span
                    className={`material-symbols-outlined transition-transform ${currentLang === "ar" ? "group-hover:translate-x-[-4px]" : "group-hover:translate-x-[4px]"}`}
                  >
                    {currentLang === "ar" ? "arrow_back" : "arrow_forward"}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* الخطوة 2 */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-3">
                <h3 className="font-bold text-primary text-xs">
                  {t[currentLang].availableProgs}
                </h3>
                <div className="p-3 border border-primary rounded-xl bg-primary-fixed/10 flex justify-between items-center gap-4">
                  <div className="flex gap-3 items-center">
                    <div className="bg-white p-2.5 rounded-lg shadow-2xs shrink-0">
                      <span
                        className="material-symbols-outlined text-secondary block"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        tour
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-xs text-primary">
                        {t[currentLang].integratedProg} ({landmark || "---"})
                      </div>
                      <div className="text-[10px] text-on-surface-variant mt-0.5">
                        {t[currentLang].departureTime}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      currentLang === "ar" ? "text-left" : "text-right"
                    }
                  >
                    <div className="text-secondary text-xs font-bold font-mono whitespace-nowrap">
                      {seatPrice.toLocaleString()} {t[currentLang].currency}
                    </div>
                    <div className="text-[9px] text-green-600 font-bold tracking-wide mt-0.5">
                      {t[currentLang].statusAvailable}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <label className="font-bold text-primary text-xs block">
                  {t[currentLang].reserveSeats} ({touristsCount})
                </label>
                <div className="relative flex items-center gap-2 border border-outline-variant/50 rounded-xl p-3 bg-white focus-within:border-primary transition-all shadow-2xs">
                  <span className="material-symbols-outlined text-secondary">
                    airline_seat_recline_normal
                  </span>
                  <select
                    value={selectedSeats[0] || 1}
                    onChange={(e) =>
                      handleSeatStartChange(Number(e.target.value))
                    }
                    className={`w-full bg-transparent border-none focus:ring-0 text-xs p-0 outline-none cursor-pointer text-primary font-bold ${currentLang === "ar" ? "pr-6" : "pl-2"}`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                      (seatNum) => (
                        <option key={seatNum} value={seatNum}>
                          {t[currentLang].seatStart} {seatNum}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div className="space-y-1.5 pt-3 mt-2 border-t border-outline-variant/30 text-[11px] font-medium">
                  <div className="flex justify-between gap-4">
                    <span className="text-on-surface-variant">
                      {t[currentLang].reservedSeatsGroup}
                    </span>
                    <span className="font-bold text-primary font-mono">
                      {selectedSeats
                        .map((s) => `${t[currentLang].seatLabel} ${s}`)
                        .join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-on-surface-variant">
                      {t[currentLang].initialCost}
                    </span>
                    <span className="font-bold text-secondary font-mono">
                      {(seatPrice * touristsCount).toLocaleString()}{" "}
                      {t[currentLang].currency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 gap-4">
                <button
                  type="button"
                  className="text-primary text-xs font-bold flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => goToStep(1)}
                >
                  <span className="material-symbols-outlined text-sm">
                    {currentLang === "ar" ? "arrow_forward" : "arrow_back"}
                  </span>
                  <span>{t[currentLang].btnBack}</span>
                </button>
                <button
                  type="button"
                  className="bg-primary text-on-primary px-5 py-3 rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  onClick={() => goToStep(3)}
                >
                  <span>{t[currentLang].btnNext2}</span>
                  <span className="material-symbols-outlined text-sm">
                    badge
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* الخطوة 3 */}
          {currentStep === 3 && (
            <form
              onSubmit={confirmBooking}
              className="space-y-5 animate-fadeIn"
            >
              <div className="space-y-4">
                <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
                  <h3 className="font-bold text-primary text-xs mb-2.5">
                    {t[currentLang].summaryTitle}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                    <div>
                      <p className="text-on-surface-variant text-[11px] mb-0.5">
                        {t[currentLang].summaryProg}
                      </p>
                      <p className="font-bold text-primary">
                        {landmark || "---"} ({touristsCount}{" "}
                        {t[currentLang].summaryPersons})
                      </p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-[11px] mb-0.5">
                        {t[currentLang].assignedSeats}
                      </p>
                      <p className="font-bold text-primary text-[11px] font-mono">
                        {selectedSeats
                          .map((s) => `${t[currentLang].seatLabel} ${s}`)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-outline-variant/40 space-y-3 shadow-2xs">
                  <h3 className="font-bold text-primary text-xs flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-secondary text-md">
                      assignment_ind
                    </span>
                    {t[currentLang].clientDataTitle}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-on-surface-variant">
                        {t[currentLang].fullNameLabel}
                      </label>
                      <div className="flex items-center gap-2 border border-outline-variant/50 rounded-xl p-3 bg-surface-container-lowest focus-within:border-primary transition-all shadow-3xs">
                        <span className="material-symbols-outlined text-sm text-primary">
                          person
                        </span>
                        <input
                          required
                          className="w-full border-none focus:ring-0 text-xs p-0 outline-none text-primary font-bold"
                          placeholder={t[currentLang].fullNamePlaceholder}
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-on-surface-variant">
                        {t[currentLang].phoneLabel}
                      </label>
                      <div
                        className="flex items-center gap-2 border border-outline-variant/50 rounded-xl p-3 bg-surface-container-lowest focus-within:border-primary transition-all shadow-3xs"
                        dir="ltr"
                      >
                        <span className="material-symbols-outlined text-sm text-primary pl-1">
                          phone
                        </span>

                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-transparent border-none text-xs font-bold text-primary p-0 pr-2 outline-none focus:ring-0 cursor-pointer border-r border-outline-variant/30 font-mono"
                        >
                          <option value="+963">🇸🇾 +963</option>
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+974">🇶🇦 +974</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+39">🇮🇹 +39</option>
                        </select>
                        <input
                          required
                          className="w-full border-none focus:ring-0 text-xs p-0 outline-none text-primary font-bold font-mono tracking-wide pl-1"
                          placeholder="9XXXXX" 
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 6) {
                              setPhoneNumber(value);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-primary text-xs">
                  {t[currentLang].paymentMethodTitle}
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 border border-outline-variant/20 rounded-xl flex flex-col items-center gap-1.5 opacity-40 cursor-not-allowed text-center bg-surface-container-low text-gray-400">
                    <span className="material-symbols-outlined text-xl">
                      credit_card
                    </span>
                    <span className="text-[10px] font-medium">
                      {t[currentLang].payCredit}
                    </span>
                  </div>
                  <div className="p-3 border-2 border-primary rounded-xl bg-primary/5 text-primary flex flex-col items-center gap-1.5 cursor-pointer text-center transition-all shadow-2xs">
                    <span className="material-symbols-outlined text-xl">
                      storefront
                    </span>
                    <span className="text-[10px] font-bold">
                      {t[currentLang].payOffice}
                    </span>
                  </div>
                  <div className="p-3 border border-outline-variant/20 rounded-xl flex flex-col items-center gap-1.5 opacity-40 cursor-not-allowed text-center bg-surface-container-low text-gray-400">
                    <span className="material-symbols-outlined text-xl">
                      account_balance_wallet
                    </span>
                    <span className="text-[10px] font-medium">
                      {t[currentLang].payWallet}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-3">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-xs font-bold text-on-surface-variant">
                      {t[currentLang].totalCostLabel}
                    </span>
                    <span className="text-md font-black text-secondary font-mono">
                      {(seatPrice * touristsCount).toLocaleString()}{" "}
                      {t[currentLang].currency}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-secondary text-primary font-black py-3.5 rounded-xl text-xs shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    {t[currentLang].btnConfirm}
                  </button>
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  type="button"
                  className="text-primary text-xs font-bold flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => goToStep(2)}
                >
                  <span className="material-symbols-outlined text-sm">
                    {currentLang === "ar" ? "arrow_forward" : "arrow_back"}
                  </span>
                  <span>{t[currentLang].btnBackToProg}</span>
                </button>
              </div>
            </form>
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