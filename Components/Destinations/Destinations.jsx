import damas from '@public/images/damas.png'
import halab from '@public/images/halab.png'
import latakia from '@public/images/latakia.png'
import homs from '@public/images/homs.png'

function Destinations() {
  return (
    <>
    <section className="py-24 bg-surface-container-low">
<div className="px-margin-desktop max-w-container-max mx-auto">
<div className="flex justify-between items-end mb-12">
<div>
<h2 className="font-headline-lg text-headline-lg text-primary mb-2">أبرز الوجهات السياحية</h2>
<p className="font-body-md text-body-md text-on-surface-variant">اختر وجهتك القادمة لاكتشاف عمق الحضارة السورية</p>
</div>
<button className="text-secondary font-label-md text-label-md flex items-center gap-1">عرض جميع الوجهات <span className="material-symbols-outlined">arrow_left</span></button>
</div>
<div className="grid md:grid-cols-4 md:grid-rows-2 gap-6 h-[800px]">

<div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Old City of Damascus panorama" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={damas}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-8 text-white">
<span className="bg-secondary px-3 py-1 rounded-full text-[10px] font-bold mb-3 inline-block">سياحة ثقافية</span>
<h3 className="font-headline-md text-headline-md mb-2">دمشق القديمة</h3>
<p className="font-body-md text-body-md opacity-80">رحلة في أزقة التاريخ المأهول منذ الأزل</p>
</div>
</div>

<div className="md:col-span-2 relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Aleppo Citadel" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={halab}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6 text-white">
<h3 className="font-headline-sm text-headline-sm mb-1">قلعة حلب وأسواقها</h3>
<p className="font-label-sm text-label-sm opacity-80">تجربة تسوق تراثية وتاريخية لا مثيل لها</p>
</div>
</div>

<div className="relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Latakia coastline" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={latakia}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6 text-white">
<h3 className="font-headline-sm text-headline-sm">استجمام الساحل</h3>
</div>
</div>

<div className="relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Palmyra ruins" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={homs}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6 text-white">
<h3 className="font-headline-sm text-headline-sm">سحر تدمر</h3>
</div>
</div>
</div>
</div>
</section>
    </>
  );
}

export default Destinations;
