import { useState, useEffect } from "react";
import API from "@/Services/api";

function UsersDashboard() {
  // الهيكل الأساسي يفترض وجود مصفوفة للمستخدمين ونموذج لإضافة مستخدم جديد
  const [users, setUsers] = useState([
    { id: 1, name: "Rama", email: "rama@test.com", role: "أدمن رئيسي", status: "نشط" },
    { id: 2, name: "أحمد المحمد", email: "ahmed@test.com", role: "موظف حجز", status: "نشط" }
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "موظف حجز", password: "" });
  const [loading, setLoading] = useState(false);

  // هيكل دالة جلب المستخدمين الحية مستقبلاً
  useEffect(() => {
    // fetchUsers();
  }, []);

  const handleCreateUser = (e) => {
    e.preventDefault();
    alert("🚀 هذا الهيكل جاهز للربط مع API الباك إيند وحفظ المستخدم الجديد!");
    // هنا سيتم استدعاء POST /api/users
  };

  const handleToggleStatus = (id) => {
    alert(`تغيير حالة الحساب (تجميد / تفعيل) للمستخدم رقم ${id}`);
    // هنا سيتم استدعاء PUT /api/users/:id/status
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-8 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
      
      {/* هيدر الصفحة والتروية الإرشادية */}
      <div className="border-b border-outline-variant/20 pb-4">
        <h2 className="text-md font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">manage_accounts</span>
          إدارة مستخدمي لوحة التحكم والصلاحيات
        </h2>
        <p className="text-[11px] text-on-surface-variant mt-1">
          هيكل تنظيمي للتحكم بملفات الموظفين والمشرفين، وتوزيع مهام العمل داخل لوحة تحكم "سوا ترافيل".
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* 1. نموذج إضافة مستخدم أو موظف جديد (الهيكل المرئي) */}
        <form onSubmit={handleCreateUser} className="p-5 border border-outline-variant/30 rounded-2xl bg-white space-y-4">
          <h3 className="text-xs font-bold text-primary flex items-center gap-1 pb-2 border-b border-outline-variant/20">
            <span className="material-symbols-outlined text-sm">person_add</span>
            إنشاء حساب موظف جديد
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant">الاسم الكامل</label>
              <input type="text" placeholder="مثال: راما..." className="border border-outline-variant/60 p-2 text-xs rounded-xl w-full outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant">البريد الإلكتروني (تسجيل الدخول)</label>
              <input type="email" placeholder="name@company.com" className="border border-outline-variant/60 p-2 text-xs rounded-xl w-full outline-none font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant">كلمة المرور الأولية</label>
              <input type="password" placeholder="••••••••" className="border border-outline-variant/60 p-2 text-xs rounded-xl w-full outline-none font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-on-surface-variant">رتبة الصلاحية</label>
              <select className="border border-outline-variant/60 p-2 text-xs rounded-xl w-full bg-white outline-none">
                <option value="موظف حجز">موظف حجز ومتابعة رحلات</option>
                <option value="مشرف محتوى">مشرف محتوى وآراء</option>
                <option value="أدمن رئيسي">مدير نظام (أدمن رئيسي)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary text-on-primary text-xs font-bold py-2.5 rounded-xl cursor-pointer shadow-xs mt-2">
            تثبيت الحساب في النظام
          </button>
        </form>

        {/* 2. جدول استعراض الطاقم الحالي والتحكم بحالة الحسابات */}
        <div className="lg:col-span-2 overflow-x-auto rounded-xl border border-outline-variant/30 bg-white">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-bold border-b border-outline-variant/30">
                <th className="p-3">المستخدم</th>
                <th className="p-3">الصلاحية</th>
                <th className="p-3 text-center">الحالة</th>
                <th className="p-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-medium">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-on-surface">{u.name}</div>
                    <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">{u.email}</div>
                  </td>
                  <td className="p-3">
                    <span className="bg-surface-container-high px-2 py-0.5 rounded text-[10px] text-primary font-bold">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 border rounded-md bg-emerald-50 text-emerald-700 border-emerald-200">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button 
                        type="button"
                        onClick={() => handleToggleStatus(u.id)}
                        className="text-primary hover:bg-surface-container-high px-2 py-1 rounded text-[10px] font-bold cursor-pointer"
                      >
                        تجميد الحساب
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default UsersDashboard;