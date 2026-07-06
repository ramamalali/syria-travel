import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import API from "@/Services/api"; 

function Navbar() {
  // --- إدارة حالة اللغة ---
  const [lang, setLang] = useState(() => localStorage.getItem("site_lang") || "ar");
 const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("site_lang") || "ar");
  // الاستماع لحدث تغيير اللغة الفوري المُنطلق من النافبار
  // الاستماع لحدث تغيير اللغة الفوري المُنطلق من النافبار
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };

    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // --- إدارات الحالة الثابتة للمكون ---
  const [activeTab, setActiveTab] = useState("#");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  const [logo, setLogo] = useState("سوا ترافيل");
  const [navLinks, setNavLinks] = useState([]);
  const [adminHint, setAdminHint] = useState("تلميح للأدمن: admin@orbit.com وباسوورد: admin123");

  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // --- مراقبة اللغة وتحديث اتجاه المتصفح ---
  useEffect(() => {
    localStorage.setItem("site_lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  // --- جلب البيانات الديناميكية من الباك إيند ---
  useEffect(() => {
    API.get(`https://syria-travel.onrender.com/api/navbar?lang=${lang}`)
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
        console.error("خطأ أثناء جلب بيانات النافبار المبسطة:", err);
      });
  }, [lang]); 

  // معالجة تسجيل الدخول المحاكي
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@orbit.com" && password === "admin123") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true"); 
      alert(lang === "ar" ? "تم تسجيل الدخول كمسؤول بنجاح!" : "Logged in as Admin successfully!");
    } else {
      setIsAdmin(false);
      localStorage.setItem("isAdmin", "false");
      alert(lang === "ar" ? `مرحباً بك! تم تسجيل الدخول بالحساب: ${email}` : `Welcome! Logged in with: ${email}`);
    }
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); 
    setIsLoginOpen(false);
    setEmail("");
    setPassword("");
  };

  // معالجة الاشتراك المحاكي
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert(lang === "ar" ? `أهلاً بك يا ${name}! تم إنشاء حسابك بنجاح.` : `Welcome ${name}! Your account has been created.`);
    setIsRegisterOpen(false);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false); 
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    setActiveTab("#");
    alert(lang === "ar" ? "تم تسجيل الخروج." : "Logged out successfully.");
  };

  // 🔥 دالة تبديل اللغة المعدلة لإطلاق الحدث المخصص فوراً
  const toggleLanguage = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    
    // 1. تحديث الحالة الداخلية للنافبار لتغيير واجهته هو أولاً
    setLang(nextLang);
    
    // 2. تحديث التخزين والـ DOM لضمان جاهزية البيانات
    localStorage.setItem("site_lang", nextLang);
    document.documentElement.dir = nextLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = nextLang;

    // 3. بث الحدث المخصص لتقوم الصفحة الرئيسية وقسم الهيرو بالتحديث الفوري
    window.dispatchEvent(new Event("languageChange"));
  };

  return (
    <>
      <nav className="bg-surface sticky top-0 z-50 w-full h-16 shadow-sm border-b border-outline-variant bg-white" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex justify-between items-center max-w-7xl mx-auto h-full px-6">
          
          {/* قسم الشعار والروابط */}
          <div className="flex items-center gap-8">
            <span className="font-bold text-primary text-xl md:text-2xl tracking-tight">
              {logo}
            </span>
            
            <div className="hidden md:flex gap-6 h-full items-center">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setActiveTab(link.href)}
                  className={`pb-1 text-xs md:text-sm cursor-pointer transition-all border-b-2 ${
                    activeTab === link.href
                      ? "text-primary border-primary font-bold"
                      : "text-on-surface-variant border-transparent hover:text-primary"
                  }`}
                >
                  {link.name}
                </a>
              ))}

              {isAdmin && (
                <Link
                  to="/admin/dashboard" 
                  onClick={() => setActiveTab("dashboard")}
                  className={`pb-1 text-xs md:text-sm cursor-pointer transition-all border-b-2 text-secondary ${
                    activeTab === "dashboard"
                      ? "border-secondary font-bold"
                      : "border-transparent hover:text-secondary"
                  }`}
                >
                  {lang === "ar" ? "لوحة التحكم" : "Dashboard"}
                </Link>
              )}
            </div>
          </div>

          {/* أزرار التحكم والولوج + زر تبديل اللغة */}
          <div className="flex items-center gap-4">
            
            {/* 🌐 زر تبديل اللغة الذكي الحركي */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border border-outline-variant rounded-xl text-[11px] font-bold bg-surface-container-lowest hover:bg-surface-container transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-xs">language</span>
              {lang === "ar" ? "English" : "العربية"}
            </button>

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="hidden md:block text-primary text-xs font-bold cursor-pointer active:scale-95 transition-all hover:opacity-80"
                >
                  {lang === "ar" ? "تسجيل الدخول" : "Login"}
                </button>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="bg-primary text-on-primary px-5 py-2 rounded-xl text-xs font-bold cursor-pointer active:scale-95 transition-all"
                >
                  {lang === "ar" ? "اشتراك" : "Register"}
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-500 px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-red-50 transition-all active:scale-95"
              >
                {lang === "ar" ? "تسجيل الخروج" : "Logout"}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ================= بوب اب تسجيل الدخول ================= */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsLoginOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">{lang === "ar" ? "تسجيل الدخول" : "Login"}</h3>
              <button onClick={() => setIsLoginOpen(false)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">{lang === "ar" ? "البريد الإلكتروني" : "Email Address"}</label>
                <input
                  type="email" required placeholder="example@orbit.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs outline-none focus:border-primary"
                />
                <p className="text-[10px] text-gray-400 mt-1">{adminHint}</p>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">{lang === "ar" ? "كلمة المرور" : "Password"}</label>
                <input
                  type="password" required placeholder="••••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs outline-none focus:border-primary"
                />
              </div>
              <button type="submit" className="w-full bg-primary text-on-primary py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all">
                {lang === "ar" ? "دخول" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= بوب اب الاشتراك ================= */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsRegisterOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">{lang === "ar" ? "إنشاء حساب جديد" : "Create New Account"}</h3>
              <button onClick={() => setIsRegisterOpen(false)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
            </div>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">{lang === "ar" ? "الاسم الكامل" : "Full Name"}</label>
                <input
                  type="text" required placeholder={lang === "ar" ? "أدخل اسمك الكريم" : "Enter your full name"} value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">{lang === "ar" ? "البريد الإلكتروني" : "Email Address"}</label>
                <input
                  type="email" required placeholder="name@example.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">{lang === "ar" ? "كلمة المرور" : "Password"}</label>
                <input
                  type="password" required placeholder="••••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs outline-none focus:border-primary"
                />
              </div>
              <button type="submit" className="w-full bg-primary text-on-primary py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all">
                {lang === "ar" ? "إنشاء حساب الحجز" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;