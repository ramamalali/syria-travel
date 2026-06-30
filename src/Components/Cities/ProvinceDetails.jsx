import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import API from "@/Services/api";

function ProvinceDetails() {
  const { id } = useParams(); 
  const [provinceData, setProvinceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`/province/${id}`)
      .then((res) => {
        if (res.data) setProvinceData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب تفاصيل المحافظة:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-primary animate-pulse font-body-lg">جاري استكشاف المعالم الأثرية...</div>;
  }

  if (!provinceData || !provinceData.items) {
    return (
      <div className="text-center py-20 text-red-500">
        <p className="mb-4">المحافظة غير موجودة أو لم يتم رفع بياناتها بعد.</p>
        <Link to="/" className="text-primary underline">العودة للرئيسية</Link> {/* 🌟 تم تصحيح المسار المطلق هنا */}
      </div>
    );
  }

  return (
    <div className="py-12 px-margin-desktop max-w-container-max mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-outline-variant/30 pb-8">
        <div>
          <span className="text-secondary font-label-md text-label-md block mb-2 tracking-wide">{provinceData.provinceName}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">{provinceData.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">{provinceData.description}</p>
        </div>
        
        <Link to="/" className="text-secondary flex items-center gap-2 mb-6 hover:underline"> {/* 🌟 تم تصحيح المسار المطلق هنا */}
          <span>{provinceData.backText || "العودة للرئيسية"}</span>
          <span className="material-symbols-outlined">arrow_left</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {provinceData.items.map((item, idx) => (
          <div key={item.id || idx} className="bg-white rounded-2xl overflow-hidden shadow-md border border-surface-variant flex flex-col h-full group">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={item.image_url || item.image || item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs text-secondary bg-secondary-container/30 px-2 py-1 rounded-md mb-2 inline-block self-start">
                {item.location || item.loc}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{item.title}</h3>
              <p className="text-on-surface-variant font-body-md text-body-md mb-4 flex-grow">{item.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags && item.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-primary-container/20 text-primary px-3 py-1 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProvinceDetails;