import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { destinationsSectionData } from "@/constants"; // استيراد نفس البيانات المركزية

function AllDestinations() {
  return (
    <>
      <Navbar />

      <section className="py-24 bg-surface-container-low" id="destinations">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          {/* رأس الصفحة */}
          <div className="mb-12 border-b border-outline-variant/20 pb-6">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
              {destinationsSectionData.title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {destinationsSectionData.description}
            </p>
          </div>

          {/* شبكة عرض ديناميكية متجاوبة لكل الكنوز بدون تكرار يدوي للـ Grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[350px]">
            {destinationsSectionData.items.map((dest) => (
              <div 
                key={dest.id} 
                className="relative group overflow-hidden rounded-xl cursor-pointer shadow-md"
              >
                <img
                  alt={dest.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={dest.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 p-6 text-white w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-headline-sm text-headline-sm font-bold mb-1">
                    {dest.title}
                  </h3>
                  <p className="font-label-sm text-label-sm opacity-0 group-hover:opacity-90 transition-opacity duration-300 line-clamp-2">
                    {dest.description || "استكشف أبعاد العراقة في هذه الوجهة التاريخية الساحرة."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AllDestinations;