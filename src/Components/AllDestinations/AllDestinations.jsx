import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function AllDestinations() {
  // 1. التقاط اللغة وإدارتها محلياً داخل الصفحة من الـ localStorage مباشرة
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("site_lang") || "ar");
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. الاستماع الفوري لحدث تغيير اللغة المنطلق من الـ Navbar
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };
    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // 3. إعادة جلب البيانات من الباك آيند فور تغير الـ State الخاصة باللغة
  useEffect(() => {
    const fetchAllDestinations = async () => {
      try {
        const response = await axios.get(`https://syria-travel.onrender.com/api/destinations-section?lang=${currentLang}`);
        setSectionData(response.data);
      } catch (error) {
        console.error("خطأ أثناء جلب كافة الوجهات:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDestinations();
  }, [currentLang]); // تعتمد على المراقبة الديناميكية لـ currentLang

  if (loading || !sectionData) return null; 

  // اختيار حقول رأس الصفحة ديناميكياً لتفادي الجمود
  const sectionTitle = sectionData[`title_${currentLang}`] || sectionData.title;
  const sectionDescription = sectionData[`description_${currentLang}`] || sectionData.description;

  return (
    <>


      <section className="py-24 bg-surface-container-low" id="destinations" dir={currentLang === "ar" ? "rtl" : "ltr"}>
        <div className="px-margin-desktop max-w-container-max mx-auto">
          
          {/* رأس الصفحة المترجم */}
          <div className="mb-12 border-b border-outline-variant/20 pb-6">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
              {sectionTitle}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {sectionDescription}
            </p>
          </div>

          {/* شبكة عرض ديناميكية متجاوبة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[350px]">
            {sectionData.items && sectionData.items.map((dest) => {
              // استخراج العنوان والوصف للمحافظة بناءً على اللغة الحالية
              const destTitle = dest[`title_${currentLang}`] || dest.title;
              const destDescription = dest[`description_${currentLang}`] || dest.description;

              return (
                <Link 
                  to={`/province/${dest.id}`} 
                  key={dest.id} 
                  className="block"
                >
                  <div className="relative group overflow-hidden rounded-xl cursor-pointer h-full w-full">
                    <img 
                      src={dest.image || dest.image_url} 
                      alt={destTitle} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* النصوص المترجمة للمحافظة داخل الكرت */}
                    <div className="absolute bottom-0 p-6 text-white w-full">
                      <h3 className="font-headline-sm text-headline-sm">
                        {destTitle}
                      </h3>
                      {destDescription && (
                        <p className="font-body-md text-body-md opacity-80 mt-1">
                          {destDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


    </>
  );
}

export default AllDestinations;