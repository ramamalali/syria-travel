import { Link } from "react-router";
import {provinceData} from '@/constants'


function ProvinceDestinations() {
  return (
    <>
      <section className="py-24 bg-surface-container-low" id="province-destinations">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          
          {/* رأس الصفحة بالهوية البصرية الخاصة بك */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-outline-variant/30 pb-8">
            <div>
              <span className="text-secondary font-label-md text-label-md block mb-2 tracking-wide">
                {provinceData.provinceName}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-3">
                {provinceData.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                {provinceData.description}
              </p>
            </div>
            
            {/* زر العودة بتصميم متناسق */}
            <Link 
              to="/" 
              className="text-secondary font-label-md text-label-md flex items-center gap-2 hover:opacity-80 transition-all bg-white py-3 px-5 rounded-xl shadow-sm border border-outline-variant/20 hover:shadow-md"
            >
              <span>{provinceData.backText}</span>
              <span className="material-symbols-outlined transform rotate-180">arrow_left</span>
            </Link>
          </div>

          {/* شبكة العرض المستجيبة (Responsive Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {provinceData.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-outline-variant/20 group transition-all duration-300 flex flex-col h-full"
              >
                {/* حاوية الصورة مع الزووم والـ Tag */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={item.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* التاغات الفوقية */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* تفاصيل المعلم الأثري */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-on-surface-variant mb-2">
                    <span className="material-symbols-outlined text-sm text-secondary">location_on</span>
                    <span className="text-xs font-medium">{item.location}</span>
                  </div>

                  <h3 className="font-headline-sm text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-6 flex-grow">
                    {item.description}
                  </p>

                  {/* زر تفاعلي أسفل البطاقة */}
                  <div className="border-t border-outline-variant/20 pt-4 flex justify-between items-center mt-auto">
                    <span className="text-sm font-bold text-primary flex items-center gap-1 cursor-pointer group-hover:underline">
                      اكتشف المعلم
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </span>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary transition-colors">
                      photo_library
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default ProvinceDestinations;