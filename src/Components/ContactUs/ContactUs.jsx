import { useState } from "react";
// استيراد البيانات المركزية للقسم
import { contactData } from "@/constants"; 

function ContactUs() {
  // حالة التحكم في ظهور البوب أب
  const [showPopup, setShowPopup] = useState(false);

  // حالة التحكم في حقول الفورم لتصفيرها بعد الإرسال
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    inquiryType: "استفسار عن حجز",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // هنا يتم معالجة إرسال البيانات (API) مستقبلاً
    console.log("بيانات المراسلة المستلمة:", formData);

    setShowPopup(true); // إظهار بوب أب النجاح

    // تصفير الفورم تلقائياً
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      inquiryType: "استفسار عن حجز",
      message: ""
    });
  };

  return (
    <>
      <section className="py-24 bg-surface-container" id="contact">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* قسم معلومات التواصل - يقرأ الآن من ملف الداتا المركزي */}
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
                {contactData.title}
              </h2>
              <p className="text-on-surface-variant mb-10 font-body-md text-body-md">
                {contactData.description}
              </p>
              
              <div className="space-y-6">
                {/* العنوان */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                  <div>
                    <h6 className="font-bold">المكتب الرئيسي</h6>
                    <p className="text-on-surface-variant">{contactData.address}</p>
                  </div>
                </div>
                
                {/* الأرقام المجلوبة ديناميكياً باستخدام map من ملف الثوابت */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">phone_in_talk</span>
                  <div>
                    <h6 className="font-bold">خدمة العملاء</h6>
                    {contactData.phones.map((phone, index) => (
                      <p key={index} className="text-on-surface-variant" dir="ltr">{phone}</p>
                    ))}
                  </div>
                </div>
                
                {/* البريد الإلكتروني */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                  <div>
                    <h6 className="font-bold">البريد الإلكتروني</h6>
                    <p className="text-on-surface-variant">{contactData.email}</p>
                  </div>
                </div>
              </div>

              {/* صورة الخريطة من ملف الثوابت */}
              <div className="mt-10 rounded-2xl overflow-hidden h-64 border-2 border-white shadow-lg">
                <img 
                  alt="Map Location" 
                  className="w-full h-full object-cover" 
                  src={contactData.mapImgUrl}
                />
              </div>
            </div>

            {/* قسم الفورم */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-outline-variant/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md">الاسم الكامل</label>
                    <input 
                      name="fullName" value={formData.fullName} onChange={handleChange} required 
                      className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" 
                      placeholder="أدخل اسمك" type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md">رقم الهاتف</label>
                    <input 
                      name="phone" value={formData.phone} onChange={handleChange} required 
                      className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" 
                      placeholder="09XX XXX XXX" type="tel"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-label-md text-label-md">البريد الإلكتروني</label>
                  <input 
                    name="email" value={formData.email} onChange={handleChange} required 
                    className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" 
                    placeholder="example@mail.com" type="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label-md text-label-md">نوع الاستفسار</label>
                  <select 
                    name="inquiryType" value={formData.inquiryType} onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none appearance-none"
                  >
                    <option>استفسار عن حجز</option>
                    <option>شكوى أو مقترح</option>
                    <option>رحلات المجموعات</option>
                    <option>أخرى</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-label-md text-label-md">رسالتك</label>
                  <textarea 
                    name="message" value={formData.message} onChange={handleChange} required 
                    className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" 
                    placeholder="كيف يمكننا مساعدتك؟" rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-lg shadow-lg hover:bg-primary-container active:scale-95 transition-all">
                  إرسال الرسالة
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* بوب أب النجاح المخصص */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-outline-variant/30">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">تم الإرسال بنجاح!</h3>
            <p className="text-on-surface-variant text-sm mb-6">
              شكرًا لتواصلك معنا. استلمنا رسالتك وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن.
            </p>
            <button onClick={() => setShowPopup(false)} className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary-container transition-all">
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactUs;