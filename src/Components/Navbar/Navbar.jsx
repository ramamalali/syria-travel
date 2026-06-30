import { useState, useEffect } from "react";
import API from "@/Services/api"; // استيراد إعداد Axios المخصص للباك إيند

function Navbar() {
  // --- إدارات الحالة (States) ---
  const [activeTab, setActiveTab] = useState("الرئيسية");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // الحالات الديناميكية القادمة من قاعدة البيانات
  const [logo, setLogo] = useState("سوا ترافيل");
  const [navLinks, setNavLinks] = useState([]);
  const [adminHint, setAdminHint] = useState("تلميح للأدمن: admin@orbit.com وباسوورد: admin123");

  // بيانات المستخدم الحالي (لمحاكاة تسجيل الدخول والأدمن)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // حقول الإدخال
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // --- جلب البيانات الديناميكية من الباك إيند عند تحميل المكون ---
  useEffect(() => {
    API.get("/navbar")
      .then((res) => {
        if (res.data.settings) {
          setLogo(res.data.settings.logo);
          setAdminHint(res.data.settings.admin_hint);
        }
        if (res.data.links) {
          setNavLinks(res.data.links);
        }
      })
      .catch((err) => {
        console.error("خطأ أثناء جلب بيانات النافبار من السيرفر:", err);
      });
  }, []);

  // معالجة تسجيل الدخول المحاكي
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@orbit.com" && password === "admin123") {
      setIsAdmin(true);
      alert("تم تسجيل الدخول كمسؤول (Admin) بنجاح!");
    } else {
      setIsAdmin(false);
      alert(`مرحباً بك! تم تسجيل الدخول بالحساب: ${email}`);
    }
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    // تفريغ الحقول
    setEmail("");
    setPassword("");
  };

  // معالجة الاشتراك المحاكي
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert(`أهلاً بك يا ${name}! تم إنشاء حسابك بنجاح.`);
    setIsRegisterOpen(false);
    // تفريغ الحقول
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    isAdmin(false);
    setActiveTab("الرئيسية");
    alert("تم تسجيل الخروج.");
  };

  return (
    <>
      <nav className="bg-surface sticky top-0 z-50 w-full h-16 shadow-sm border-b border-outline-variant bg-white">
        <div className="flex justify-between items-center px-margin-desktop max-w-container-max mx-auto h-full px-4">
          
          {/* قسم الشعار والروابط المجلوبة من الرابط السحابي */}
          <div className="flex items-center gap-8">
            <span className="font-headline-sm text-headline-sm font-bold text-primary text-2xl">
              {logo}
            </span>
            
            <div className="hidden md:flex gap-6 relative h-full items-center">
              {navLinks.map((link) => (
                <a
                  key={link.id || link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`pb-1 font-body-md text-body-md cursor-pointer transition-all border-b-2 ${
                    activeTab === link.name
                      ? "text-primary border-primary font-bold"
                      : "text-on-surface-variant border-transparent hover:text-primary"
                  }`}
                >
                  {link.name}
                </a>
              ))}

              {/* تظهر لوحة التحكم فقط إذا كان المستخدم مسجلاً كأدمن */}
              {isAdmin && (
                <a
                  href="#admin-dashboard"
                  onClick={() => setActiveTab("لوحة التحكم")}
                  className={`pb-1 font-body-md text-body-md cursor-pointer transition-all border-b-2 text-secondary ${
                    activeTab === "لوحة التحكم"
                      ? "border-secondary font-bold"
                      : "border-transparent hover:text-secondary"
                  }`}
                >
                  لوحة التحكم
                </a>
              )}
            </div>
          </div>

          {/* أزرار التحكم والولوج */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="hidden md:block text-primary font-label-md text-label-md cursor-pointer active:scale-95 transition-all hover:opacity-80"
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md cursor-pointer active:scale-95 transition-all"
                >
                  اشتراك
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-500 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-50 transition-all active:scale-95"
              >
                تسجيل الخروج
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ================= بوب اب تسجيل الدخول ================= */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsLoginOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-2xl z-10 animate-scaleUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">تسجيل الدخول</h3>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  placeholder="example@orbit.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">{adminHint}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all"
              >
                دخول
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= بوب اب الاشتراك ================= */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsRegisterOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-2xl z-10 animate-scaleUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">إنشاء حساب جديد</h3>
              <button
                onClick={() => setIsRegisterOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  placeholder="أدخل اسمك الكريم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-bold hover:bg-green-700 transition-all"
              >
                إنشاء حساب الحجز
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;