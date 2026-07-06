import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

function Destinations() {
  // 1. التقاط اللغة وإدارتها محلياً داخل السيكشن
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("site_lang") || "ar");
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. الاستماع للحدث المخصص القادم من النافبار فوراً
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };
    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // 3. إعادة جلب البيانات من الباك آيند فور تغير الـ State الخاصة باللغة
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`https://syria-travel.onrender.com/api/destinations-section?lang=${currentLang}`);
        setSectionData(response.data);
      } catch (error) {
        console.error("خطأ أثناء جلب بيانات الوجهات:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, [currentLang]); // تحديث ذكي وتلقائي

  if (loading || !sectionData) return null;

  const featuredDestinations = sectionData.items ? sectionData.items.filter(item => item.featured) : [];

  // قراءة الحقول ديناميكياً لتفادي الجمود
  const sectionTitle = sectionData[`title_${currentLang}`] || sectionData.title;
  const sectionDescription = sectionData[`description_${currentLang}`] || sectionData.description;
  const viewAllText = sectionData[`viewAllText_${currentLang}`] || sectionData.viewAllText;

  return (
    <section className="py-24 bg-surface-container-low" id="destinations" dir={currentLang === "ar" ? "rtl" : "ltr"}>
      <div className="px-margin-desktop max-w-container-max mx-auto">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">{sectionTitle}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{sectionDescription}</p>
          </div>
          
          <Link to="/all-destinations" className="text-secondary font-label-md text-label-md flex items-center gap-1 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined">
              {currentLang === "ar" ? "arrow_left" : "arrow_right"}
            </span>
            <span>{viewAllText}</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-4 md:grid-rows-2 gap-6 h-[800px]">
          {featuredDestinations.map((dest) => {
            const destTitle = dest[`title_${currentLang}`] || dest.title;
            const destDescription = dest[`description_${currentLang}`] || dest.description;

            return (
              <Link to={`/province/${dest.id}`} key={dest.id} className={`${dest.gridClass || ""} relative group overflow-hidden rounded-xl block`}>
                <img alt={destTitle} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={dest.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className={`absolute bottom-0 ${dest.paddingClass || "p-6"} text-white w-full`}>
                  <h3 className={dest.titleClass || "font-headline-sm text-headline-sm"}>{destTitle}</h3>
                  {destDescription && <p className="font-body-md text-body-md opacity-80 mt-1">{destDescription}</p>}
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Destinations;