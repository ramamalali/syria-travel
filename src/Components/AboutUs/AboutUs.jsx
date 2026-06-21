import sets from "@/assets/images/sets.png";
import { aboutUsData } from "@/constants"; // استيراد بيانات قسم من نحن

function AboutUs() {
  return (
    <>
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id="AboutUs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* الجانب البصري (الصورة والخلفية) */}
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
            <img
              alt="About Sawa"
              className="relative z-10 w-full rounded-2xl shadow-xl border-4 border-white"
              data-alt="A clean, professionally shot interior of a modern executive luxury coach bus. The seats are upholstered "
              src={sets}
            />
          </div>

          {/* الجانب النصي والميزات */}
          <div>
            <span className="text-secondary font-label-md text-label-md tracking-widest block mb-4">
              {aboutUsData.badge}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-8 leading-tight">
              {aboutUsData.title}
            </h2>
            
            {/* عرض الميزات ديناميكياً */}
            <div className="space-y-6">
              {aboutUsData.features.map((feature) => (
                <div key={feature.id} className="flex gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm font-bold text-primary mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-on-surface-variant font-body-md text-body-md">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;