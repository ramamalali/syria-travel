import { useState, useEffect } from "react";
import axios from "axios";

function ContactUs() {
  // حالة التحكم في ظهور البوب أب
  const [showPopup, setShowPopup] = useState(false);

  // حالة التحكم في اللغة النشطة لضمان الاستماع الفوري والتحديث اللحظي للواجهة
  const [currentLang, setCurrentLang] = useState(
    () => localStorage.getItem("site_lang") || "ar",
  );

  // حالة لتخزين معلومات التواصل المجلوبة من قاعدة البيانات
  const [contactInfo, setContactInfo] = useState({
    title: { ar: "تواصل معنا", en: "Contact Us" },
    description: {
      ar: "نحن هنا للإجابة على استفساراتكم وتلقي ملاحظاتكم على مدار الساعة.",
      en: "We are here to answer your inquiries and receive your feedback around the clock.",
    },
    address: {
      ar: "دمشق، شارع البرامكة، بناء شركة سوا، سوريا.",
      en: "Damascus, Baramkeh Street, Sawa Company Building, Syria.",
    },
    email: "info@sawa-travel.sy",
    mapImgUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800",
    phones: [],
  });

  // حالة التحكم في حقول الفورم لتصفيرها بعد الإرسال
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    inquiryType: "Booking Inquiry",
    message: "",
  });

  // 1. الاستماع لحدث تغيير اللغة الفوري المُنطلق من النافبار
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };

    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // 2. جلب بيانات التواصل الحية من قاعدة البيانات عند تحميل السيكشن
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/contact-info",
        );
        if (response.data && response.data.settings) {
          setContactInfo({
            title: response.data.settings.title,
            description: response.data.settings.description,
            address: response.data.settings.address,
            email: response.data.settings.email,
            mapImgUrl: response.data.settings.map_img_url,
            // قراءة مصفوفة الكائنات واستخراج الأرقام فقط كما تم تعديلها بالسيرفر
            phones: response.data.phones.map((p) => p.phone_number),
          });
        }
      } catch (error) {
        console.error("خطأ أثناء جلب بيانات التواصل:", error);
      }
    };
    fetchContactData();
  }, []);

  // دالة مساعدة لقراءة نصوص كائنات الـ JSONB المترجمة بأمان منعاً لانهيار الواجهة
  const getLocalizedText = (field) => {
    if (!field) return "";
    if (typeof field === "object") {
      return field[currentLang] || field["ar"] || "";
    }
    return field;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. إرسال بيانات الفورم الحية إلى الباك آيند
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
      );
      if (response.data.success) {
        setShowPopup(true); // إظهار بوب أب النجاح المخصص

        // تصفير الفورم
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          inquiryType:
            currentLang === "en" ? "Booking Inquiry" : "استفسار عن حجز",
          message: "",
        });
      }
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال الرسالة إلى السيرفر:", error);
      alert(
        currentLang === "en"
          ? "Sorry, failed to send your message. Please check server connection."
          : "عذراً، فشل إرسال الرسالة. يرجى التحقق من اتصالك بالسيرفر.",
      );
    }
  };

  return (
    <>
      <section
        className="py-24 bg-surface-container"
        id="contact"
        dir={currentLang === "ar" ? "rtl" : "ltr"}
      >
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* قسم معلومات التواصل ديناميكي ومترجم */}
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
                {getLocalizedText(contactInfo.title)}
              </h2>
              <p className="text-on-surface-variant mb-10 font-body-md text-body-md leading-relaxed text-justify">
                {getLocalizedText(contactInfo.description)}
              </p>

              <div className="space-y-6">
                {/* العنوان */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0">
                    location_on
                  </span>
                  <div>
                    <h6 className="font-bold text-sm text-primary mb-0.5">
                      {currentLang === "en" ? "Main Office" : "المكتب الرئيسي"}
                    </h6>
                    <p className="text-on-surface-variant text-xs">
                      {getLocalizedText(contactInfo.address)}
                    </p>
                  </div>
                </div>

                {/* الأرقام المجلوبة ديناميكياً */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0">
                    phone_in_talk
                  </span>
                  <div>
                    <h6 className="font-bold text-sm text-primary mb-0.5">
                      {currentLang === "en"
                        ? "Customer Service"
                        : "خدمة العملاء"}
                    </h6>
                    {contactInfo.phones.map((phone, index) => (
                      <p
                        key={index}
                        className="text-on-surface-variant text-xs"
                        dir="ltr"
                      >
                        {phone}
                      </p>
                    ))}
                  </div>
                </div>

                {/* البريد الإلكتروني */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0">
                    mail
                  </span>
                  <div>
                    <h6 className="font-bold text-sm text-primary mb-0.5">
                      {currentLang === "en"
                        ? "Email Address"
                        : "البريد الإلكتروني"}
                    </h6>
                    <p className="text-on-surface-variant text-xs">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* صورة الموقع أو الخريطة */}
              <div className="mt-10 rounded-2xl overflow-hidden h-64 border-2 border-white shadow-lg">
                <img
                  alt="Map Location"
                  className="w-full h-full object-cover"
                  src={contactInfo.mapImgUrl}
                />
              </div>
            </div>

            {/* قسم الفورم الذكي المترجم */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-outline-variant/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-semibold text-xs text-primary">
                      {currentLang === "en" ? "Full Name" : "الاسم الكامل"}
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full p-4 rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs focus:ring-2 focus:ring-primary outline-none"
                      placeholder={
                        currentLang === "en" ? "Enter your name" : "أدخل اسمك"
                      }
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-xs text-primary">
                      {currentLang === "en" ? "Phone Number" : "رقم الهاتف"}
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      required
                      className="w-full p-4 rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs focus:ring-2 focus:ring-primary outline-none text-left"
                      placeholder="9XXXXX" // تعديل الـ placeholder ليناسب الـ 6 أرقام
                      type="tel"
                      dir="ltr"
                      maxLength={10} // 🛡️ خط الدفاع الأول: يمنع كتابة أكثر من 6 خانات نهائياً
                      onChange={(e) => {
                        // تنظيف القيمة لتبقى أرقاماً فقط
                        e.target.value = e.target.value.replace(/\D/g, "");
                        // تمرير الحدث النظيف إلى دالة التغيير المشتركة الخاصة بكِ
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-xs text-primary">
                    {currentLang === "en"
                      ? "Email Address"
                      : "البريد الإلكتروني"}
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs focus:ring-2 focus:ring-primary outline-none text-left"
                    placeholder="example@mail.com"
                    type="email"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-xs text-primary">
                    {currentLang === "en" ? "Inquiry Type" : "نوع الاستفسار"}
                  </label>
                  <div className="relative">
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full p-4 rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
                    >
                      {currentLang === "en" ? (
                        <>
                          <option value="Booking Inquiry">
                            Booking Inquiry
                          </option>
                          <option value="Complaint or Suggestion">
                            Complaint or Suggestion
                          </option>
                          <option value="Group Tours">Group Tours</option>
                          <option value="Other">Other</option>
                        </>
                      ) : (
                        <>
                          <option value="استفسار عن حجز">استفسار عن حجز</option>
                          <option value="شكوى أو مقترح">شكوى أو مقترح</option>
                          <option value="رحلات المجموعات">
                            رحلات المجموعات
                          </option>
                          <option value="أخرى">أخرى</option>
                        </>
                      )}
                    </select>
                    <span
                      className={`material-symbols-outlined absolute top-4 ${currentLang === "ar" ? "left-4" : "right-4"} text-gray-400 pointer-events-none text-md`}
                    >
                      unfold_more
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-xs text-primary">
                    {currentLang === "en" ? "Your Message" : "رسالتك"}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs focus:ring-2 focus:ring-primary outline-none"
                    placeholder={
                      currentLang === "en"
                        ? "How can we help you?"
                        : "كيف يمكننا مساعدتك؟"
                    }
                    rows="4"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md hover:bg-primary/90 active:scale-[0.98] transition-all"
                >
                  {currentLang === "en" ? "Send Message" : "إرسال الرسالة"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* بوب أب النجاح المخصص بالكامل والمترجم */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          dir={currentLang === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">
                check_circle
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {currentLang === "en"
                ? "Sent Successfully!"
                : "تم الإرسال بنجاح!"}
            </h3>
            <p className="text-on-surface-variant text-xs mb-6 leading-relaxed">
              {currentLang === "en"
                ? "Thank you for contacting us. We have received your message and our team will get back to you as soon as possible."
                : "شكرًا لتواصلك معنا. استلمنا رسالتك وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن."}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              {currentLang === "en" ? "Close" : "إغلاق"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactUs;
