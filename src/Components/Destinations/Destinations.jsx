import { Link } from "react-router";
import { destinationsSectionData } from "@/constants"; // استيراد البيانات المركزية

function Destinations() {
  // تصفية العناصر المخصصة للصفحة الرئيسية فقط
  const featuredDestinations = destinationsSectionData.items.filter(item => item.featured);

  return (
    <>
      <section className="py-24 bg-surface-container-low" id="destinations">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          {/* رأس القسم */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
                {destinationsSectionData.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {destinationsSectionData.description}
              </p>
            </div>
            <Link 
              to="/all-destinations" 
              className="text-secondary font-label-md text-label-md flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined">arrow_left</span>
              <span>{destinationsSectionData.viewAllText}</span>
            </Link>
          </div>

          {/* شبكة العرض (Grid) */}
          <div className="grid md:grid-cols-4 md:grid-rows-2 gap-6 h-[800px]">
            {featuredDestinations.map((dest) => (
              <div
                key={dest.id}
                className={`${dest.gridClass || ""} relative group overflow-hidden rounded-xl cursor-pointer`}
              >
                <img
                  alt={dest.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={dest.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className={`absolute bottom-0 ${dest.paddingClass || "p-6"} text-white w-full`}>
                  <h3 className={dest.titleClass || "font-headline-sm text-headline-sm"}>
                    {dest.title}
                  </h3>
                  {dest.description && (
                    <p className="font-body-md text-body-md opacity-80 mt-1">
                      {dest.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Destinations;