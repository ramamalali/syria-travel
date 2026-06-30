import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function AllDestinations() {
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  // جلب كافة الكنوز والوجهات من قاعدة البيانات حياً
  useEffect(() => {
    const fetchAllDestinations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/destinations-section");
        setSectionData(response.data);
      } catch (error) {
        console.error("خطأ أثناء جلب كافة الوجهات:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDestinations();
  }, []);

  if (loading || !sectionData) return null; // يمكنك وضع سبيانر بسيط هنا إن أردتِ

  return (
    <>
      <Navbar />

      <section className="py-24 bg-surface-container-low" id="destinations">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          {/* رأس الصفحة */}
          <div className="mb-12 border-b border-outline-variant/20 pb-6">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
              {sectionData.title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {sectionData.description}
            </p>
          </div>

          {/* شبكة عرض ديناميكية متجاوبة لكل الكنوز بدون تكرار يدوي للـ Grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[350px]">
      
{sectionData.items.map((dest) => (
  <Link to={`/province/${dest.id}`} key={dest.id} className={`${dest.gridClass || ""} block`}>
    <div className="relative group overflow-hidden rounded-xl cursor-pointer h-full w-full">
      {/* محتوى الكرت كما هو تماماً بدون تغيير بالستايل */}
      <img src={dest.image} alt={dest.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className={`absolute bottom-0 ${dest.paddingClass || "p-6"} text-white w-full`}>
        <h3 className={dest.titleClass || "font-headline-sm text-headline-sm"}>{dest.title}</h3>
        {dest.description && <p className="font-body-md text-body-md opacity-80 mt-1">{dest.description}</p>}
      </div>
    </div>
  </Link>
))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AllDestinations;