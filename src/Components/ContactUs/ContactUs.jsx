import { useState, useEffect } from "react";
import axios from "axios";

function ContactUs() {
  // حالة التحكم في ظهور البوب أب
  const [showPopup, setShowPopup] = useState(false);

  // حالة لتخزين معلومات التواصل المجلوبة من قاعدة البيانات
  const [contactInfo, setContactInfo] = useState({
    title: "تواصل معنا",
    description: "نحن هنا للإجابة على استفساراتكم وتلقي ملاحظاتكم على مدار الساعة.",
    address: "دمشق، شارع البرامكة، بناء شركة سوا، سوريا.",
    email: "info@sawa-travel.sy",
    mapImgUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800",
    phones: []
  });

  // حالة التحكم في حقول الفورم لتصفيرها بعد الإرسال
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    inquiryType: "استفسار عن حجز",
    message: ""
  });

  // 1. جلب بيانات التواصل من قاعدة البيانات عند تحميل السيكشن
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact-info");
        if (response.data) {
          setContactInfo({
            title: response.data.settings.title,
            description: response.data.settings.description,
            address: response.data.settings.address,
            email: response.data.settings.email,
            mapImgUrl: response.data.settings.map_img_url,
            phones: response.data.phones.map(p => p.phone_number)
          });
        }
      } catch (error) {
        console.error("خطأ أثناء جلب بيانات التواصل:", error);
      }
    };
    fetchContactData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. إرسال بيانات الفورم الحية إلى الباك آيند وحفظها في الداتابيز
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      
      if (response.data.success) {
        setShowPopup(true); // إظهار بوب أب النجاح المخصص

        // تصفير الفورم تلقائياً
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          inquiryType: "استفسار عن حجز",
          message: ""
        });
      }
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال الرسالة إلى السيرفر:", error);
      alert("عذراً، فشل إرسال الرسالة. يرجى التحقق من اتصالك بالسيرفر.");
    }
  };

  return (
    <>
      <section className="py-24 bg-surface-container" id="contact">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* قسم معلومات التواصل ديناميكي */}
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
                {contactInfo.title}
              </h2>
              <p className="text-on-surface-variant mb-10 font-body-md text-body-md">
                {contactInfo.description}
              </p>
              
              <div className="space-y-6">
                {/* العنوان */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                  <div>
                    <h6 className="font-bold">المكتب الرئيسي</h6>
                    <p className="text-on-surface-variant">{contactInfo.address}</p>
                  </div>
                </div>
                
                {/* الأرقام المجلوبة ديناميكياً باستخدام map */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">phone_in_talk</span>
                  <div>
                    <h6 className="font-bold">خدمة العملاء</h6>
                    {contactInfo.phones.map((phone, index) => (
                      <p key={index} className="text-on-surface-variant" dir="ltr">{phone}</p>
                    ))}
                  </div>
                </div>
                
                {/* البريد الإلكتروني */}
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                  <div>
                    <h6 className="font-bold">البريد الإلكتروني</h6>
                    <p className="text-on-surface-variant">{contactInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* صورة الخريطة */}
              <div className="mt-10 rounded-2xl overflow-hidden h-64 border-2 border-white shadow-lg">
                <img 
                  alt="Map Location" 
                  className="w-full h-full object-cover" 
                  src={contactInfo.mapImgUrl}
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

                <button type="submit" className=" curser-pointer w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-lg shadow-lg hover:bg-primary-container active:scale-95 transition-all">
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