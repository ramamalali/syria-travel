import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import API from "@/Services/api";

function ProvinceDetails() {
  const { id } = useParams(); 
  
  // 1. إدارة اللغة محلياً تماشياً مع طريقتكم المعتمدة
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("site_lang") || "ar");
  const [provinceData, setProvinceData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. الاستماع الفوري لتغير اللغة
  useEffect(() => {
    const handleLangUpdate = () => {
      setCurrentLang(localStorage.getItem("site_lang") || "ar");
    };
    window.addEventListener("languageChange", handleLangUpdate);
    return () => window.removeEventListener("languageChange", handleLangUpdate);
  }, []);

  // 3. جلب البيانات بناءً على المعرف واللغة الحالية الحية
  useEffect(() => {
    const fetchProvinceAndMonuments = async () => {
      setLoading(true);
      try {
        const destinationRes = await API.get(`/destinations-section?lang=${currentLang}`);
        const allDestinations = destinationRes.data.items || [];
        const currentProvince = allDestinations.find(dest => dest.id === id);

        const monumentsRes = await API.get(`/monuments/${id}?lang=${currentLang}`);

        if (currentProvince) {
          const provinceTitle = currentProvince[`title_${currentLang}`] || currentProvince.title;
          const provinceDesc = currentProvince[`description_${currentLang}`] || currentProvince.description;

          setProvinceData({
            provinceName: currentLang === "en" ? "Destination Discovery" : "استكشاف الوجهة",
            title: provinceTitle,
            description: provinceDesc,
            backText: currentLang === "en" ? "Back to home" : "العودة للرئيسية",
            items: monumentsRes.data || []
          });
        } else {
          setProvinceData(null);
        }
      } catch (err) {
        console.error("خطأ في جلب تفاصيل المحافظة:", err);
        setProvinceData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinceAndMonuments();
  }, [id, currentLang]); // تعمل فور تبدل المعرف أو اللغة الحالية

  if (loading) {
    return (
      <div className="text-center py-20 text-primary animate-pulse font-body-lg">
        {currentLang === "en" ? "Exploring archeological sites..." : "جاري استكشاف المعالم الأثرية..."}
      </div>
    );
  }

  if (!provinceData) return null;

  return (
    <div className="py-12 px-margin-desktop max-w-container-max mx-auto" dir={currentLang === "ar" ? "rtl" : "ltr"}>
      {/* رأس الصفحة */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-outline-variant/30 pb-8">
        <div>
          <span className="text-secondary font-label-md text-label-md block mb-2">{provinceData.provinceName}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">{provinceData.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">{provinceData.description}</p>
        </div>
        <Link to="/" className="text-secondary flex items-center gap-2 mb-6 hover:underline">
          <span>{provinceData.backText}</span>
          <span className="material-symbols-outlined">{currentLang === "ar" ? "arrow_left" : "arrow_right"}</span>
        </Link>
      </div>

      {/* عرض المعالم الأثرية */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {provinceData.items.map((item, idx) => {
          const itemTitle = item[`title_${currentLang}`] || item.title;
          const itemDesc = item[`description_${currentLang}`] || item.description;
          const itemLoc = item[`location_${currentLang}`] || item.location;
          const itemTags = item[`tags_${currentLang}`] || item.tags || [];

          return (
            <div key={item.id || idx} className="bg-white rounded-2xl overflow-hidden shadow-md border border-surface-variant flex flex-col h-full group">
              <div className="relative h-64 overflow-hidden">
                <img src={item.imageUrl || item.image_url || item.image} alt={itemTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs text-secondary bg-secondary-container/30 px-2 py-1 rounded-md mb-2 inline-block self-start">{itemLoc}</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{itemTitle}</h3>
                <p className="text-on-surface-variant font-body-md text-body-md mb-4 flex-grow text-justify">{itemDesc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {itemTags.map((tag, i) => (
                    <span key={i} className="text-xs bg-primary-container/20 text-primary px-3 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProvinceDetails;