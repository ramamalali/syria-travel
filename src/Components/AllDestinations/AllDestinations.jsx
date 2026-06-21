
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"


import hamah from '@/assets/images/hamah.png'
import halab from '@/assets/images/halab.png'
import latakia from '@/assets/images/latakia.png'
import homs from '@/assets/images/homs.png'
import tadmur from '@/assets/images/tadmour.png'
import hosn from '@/assets/images/alhusn.png' 
import sednaya from '@/assets/images/sednaya.png'
import maaloula from '@/assets/images/malula.png'
import damas from '@/assets/images/damas.png'



function AllDestinations() {
  return (
    <>
      <Navbar />

  <section className="py-24 bg-surface-container-low" id='destinations'>
<div className="px-margin-desktop max-w-container-max mx-auto">
<div className="flex justify-between items-end mb-12">
<div>
<h2 className="font-headline-lg text-headline-lg text-primary mb-2">كنوزنا الأثرية</h2>
<p className="font-body-md text-body-md text-on-surface-variant">اختر وجهتك القادمة لاكتشاف عمق الحضارة السورية</p>
</div>

</div>
<div className="grid md:grid-cols-4 md:grid-rows-2 gap-6 h-[800px]">

<div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Old City of hamah panorama" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={hamah}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-8 text-white">

<h3 className="font-headline-md text-headline-md mb-2">حماه</h3>
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
<div className="relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Palmyra ruins" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={tadmur}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6 text-white">
<h3 className="font-headline-sm text-headline-sm">سحر تدمر</h3>
</div>
</div>




</div>
<div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 h-[800px]">

<div className="relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Palmyra ruins" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={hosn}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6 text-white">
<h3 className="font-headline-sm text-headline-sm">سحر تدمر</h3>
</div>
</div>
<div className="relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Palmyra ruins" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={sednaya}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6 text-white">
<h3 className="font-headline-sm text-headline-sm">سحر الحصن</h3>
</div>
</div>
<div className="relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Palmyra ruins" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={maaloula}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6 text-white">
<h3 className="font-headline-sm text-headline-sm">سحر معلولا</h3>
</div>
</div>
<div className="relative group overflow-hidden rounded-xl cursor-pointer">
<img alt="Palmyra ruins" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={damas}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 p-6 text-white">
<h3 className="font-headline-sm text-headline-sm">سحر دمشق</h3>
</div>
</div>
</div>
</div>
</section>

      <Footer />

    </>
  )
}

export default AllDestinations