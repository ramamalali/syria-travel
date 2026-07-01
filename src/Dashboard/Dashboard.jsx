import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    alert("تم تسجيل الخروج من لوحة التحكم.");
    navigate("/"); // العودة للرئيسية
  };

  // مصفوفة اللينكات لتسهيل الصيانة والتعديل
  const menuItems = [
    { category: "📊 التقارير والإحصائيات", links: [
      { id: "overview", text: "الإحصائيات العامة", icon: "monitoring", to: "/admin/dashboard" },
    ]},
    { category: "📝 إدارة محتوى صفحات الموقع", links: [
      { id: "hero", text: "تعديل القسم الرئيسي (Hero)", icon: "view_carousel", to: "/admin/dashboard/hero" },
      { id: "about", text: "تعديل من نحن (About Us)", icon: "info", to: "/admin/dashboard/about" },
      { id: "treasures", text: "الكنوز والمعالم الأثرية", icon: "account_balance", to: "/admin/dashboard/treasures" },
      { id: "tours", text: "الرحلات السياحية", icon: "map", to: "/admin/dashboard/tours" },
      { id: "offers", text: "العروض الخاصة", icon: "local_offer", to: "/admin/dashboard/offers" },
      { id: "contact-info", text: "معلومات التواصل", icon: "contact_page", to: "/admin/dashboard/contact-info" },
    ]},
    { category: "💼 الحجوزات والتفاعل", links: [
      { id: "bookings", text: "إدارة وجدولة الحجوزات", icon: "confirmation_number", to: "/admin/dashboard/bookings" },
      { id: "messages", text: "رسائل المستخدمين (Contact)", icon: "mail", to: "/admin/dashboard/messages" },
      { id: "reviews", text: "آراء وتقييمات المسافرين", icon: "rate_review", to: "/admin/dashboard/reviews" },
    ]},
    { category: "👥 الحسابات والإعدادات", links: [
      { id: "users", text: "جدولة وإدارة المستخدمين", icon: "group", to: "/admin/dashboard/users" },
      { id: "settings", text: "الإعدادات العامة للسيستم", icon: "settings", to: "/admin/dashboard/settings" },
    ]}
  ];

  return (
    <div className="flex h-screen bg-surface-container-low" dir="rtl">
      
      {/* 1. السايد بار الجانبي الثابت */}
      <aside className="w-72 bg-white border-l border-outline-variant/30 flex flex-col h-full shadow-sm">
        {/* هيدر السايد بار */}
        <div className="p-6 border-b border-outline-variant/20 flex items-center gap-3 bg-primary text-on-primary">
          <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          <div>
            <h1 className="font-bold text-sm">لوحة التحكم الإدارية</h1>
            <p className="text-[10px] opacity-75">منصة سوريا ترافيل المشتركة</p>
          </div>
        </div>

        {/* قائمة اللينكات والتنقل */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuItems.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-[10px] font-bold text-on-surface-variant block px-3 mb-2 tracking-wide uppercase">
                {group.category}
              </span>
              {group.links.map((link) => (
                <Link
                  key={link.id}
                  to={link.to}
                  onClick={() => setActiveMenu(link.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeMenu === link.id
                      ? "bg-primary/10 text-primary"
                      : "text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-md">{link.icon}</span>
                  {link.text}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* زر تسجيل الخروج في الأسفل */}
        <div className="p-4 border-t border-outline-variant/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-700 hover:bg-rose-100 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            تسجيل الخروج من النظام
          </button>
        </div>
      </aside>

      {/* 2. منطقة عرض المحتوى المتغير (اليمين والوسط) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* شريط علوي فرعي للترحيب بالأدمن */}
        <header className="h-16 bg-white border-b border-outline-variant/20 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-on-surface-variant">أهلاً بك مجدداً،</span>
            <span className="text-xs font-bold text-primary">المسؤول الرئيسي 👋</span>
          </div>
          <Link to="/" className="text-xs font-bold text-secondary hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            معاينة الموقع حياً
          </Link>
        </header>

        {/* عرض الصفحة الفرعية الحالية ديناميكياً بداخل الـ Main */}
        <main className="flex-1 overflow-y-auto bg-surface-container-lowest p-6 md:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default Dashboard;