import syriaBg from "@/assets/images/hero.png";

function Hero() {
  return (
    <>
     <section className="relative h-[35rem] flex items-center overflow-hidden">
<div className="absolute inset-0 z-0">
<img alt="Hero Image" className="w-full h-full object-cover" data-alt="A luxurious modern tour bus parked in front " src={syriaBg}/>
<div className="absolute inset-0 bg-gradient-to-l from-primary/80 via-primary/40 to-transparent"></div>
</div>
<div className="relative z-10 px-margin-desktop max-w-container-max mx-auto w-full text-white">
<div className="max-w-2xl">
<h1 className="font-headline-lg text-headline-lg mb-6 leading-tight">سوا نسافر...<br/><span className="text-secondary-fixed">سوريا بكل تفاصيلها</span></h1>
<p className="font-body-lg text-body-lg mb-10 text-surface-container-low opacity-90">اكتشف جمال المدن السورية، من عراقة دمشق إلى سحر الساحل. نوفر لك رحلات آمنة، مريحة، وبأعلى معايير الجودة.</p>
<div className="flex flex-wrap gap-4">
<button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-headline-sm text-headline-sm font-bold shadow-lg flex items-center gap-3 hover:bg-secondary-fixed transition-all active:scale-95" /* onClick={() => {toggleBookingModal}} */>
<span className="material-symbols-outlined">directions_bus</span>
                        احجز رحلتك الآن
                    </button>
<button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-headline-sm text-headline-sm font-bold hover:bg-white/10 transition-all active:scale-95">
                        استكشف الوجهات
                    </button>
</div>
</div>
</div>
</section>
    </>
  );
}

export default Hero;
