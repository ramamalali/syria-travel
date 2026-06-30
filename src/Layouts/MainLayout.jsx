import { Outlet } from 'react-router-dom';
import Navbar from '@/Components/Navbar/Navbar'; // تأكدي من مسار الناف بار لديكِ
import Footer from '@/Components/Footer/Footer'; // تأكدي من مسار الفوتر لديكِ

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. الناف بار يظهر دائماً في الأعلى */}
      <Navbar />

      {/* 2. الـ Outlet هو المكان التلقائي الذي ستتبدل فيه الصفحات (الرئيسية أو الفرعية) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 3. الفوتر يظهر دائماً في الأسفل */}
      <Footer />
    </div>
  );
}

export default MainLayout;