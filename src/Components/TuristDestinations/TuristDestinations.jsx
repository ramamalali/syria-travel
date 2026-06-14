import tadmur from '@/assets/images/tadmour.png'
import hosn from '@/assets/images/alhusn.png' 
import sednaya from '@/assets/images/sednaya.png'
import maaloula from '@/assets/images/malula.png'
function TuristDestinations() {
  return (
    <>
    <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
<div className="max-w-xl">
<h2 className="font-headline-lg text-headline-lg text-primary mb-4 leading-tight">رحلاتنا السياحية الخاصة</h2>
<p className="text-on-surface-variant">انضم إلينا في رحلات استكشافية منظمة لأعظم المعالم الأثرية والطبيعية في سوريا.</p>
</div>
<button className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:shadow-lg transition-all">مشاهدة جميع الرحلات</button>
</div>
<div className="grid grid-cols-12 gap-6">

<div className="col-span-12 md:col-span-8 relative rounded-3xl overflow-hidden h-[400px] group shadow-lg">
<img alt="Palmyra" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A dramatic wide-angle shot of the monumental arch in the ancient city of Palmyra, Syria, at dusk. The sky is a deep indigo, and the limestone ruins are lit by low-angled artificial lights, creating long shadows and highlighting the intricate carvings. The style is epic and editorial, emphasizing the grandeur of Syrian history." src={tadmur}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
<h3 className="font-headline-lg text-headline-lg mb-2">تدمر: لؤلؤة البادية</h3>
<p className="text-surface-variant opacity-90 max-w-lg mb-4">رحلة تاريخية لمدة يومين تشمل زيارة القلعة، الشارع المستقيم، وفندق بل موني.</p>
<div className="flex items-center gap-4">
<span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
</div>
</div>
</div>

<div className="col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden h-[400px] group shadow-lg">
<img alt="Krak" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A stunning view of Krak des Chevaliers, a medieval Crusader castle in Syria, perched atop a lush green hill with mist clinging to the valley below. The stone walls are weathered and grey, contrasting with the vibrant green vegetation. The lighting is diffused and atmospheric, evoking a sense of epic fantasy and historic weight." src={hosn}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
<h3 className="font-headline-sm text-headline-sm font-bold mb-1">قلعة الحصن</h3>
<p className="text-surface-variant opacity-90 text-sm mb-4">أهم القلاع في العالم.</p>
<span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
</div>
</div>

<div className="col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden h-[300px] group shadow-lg">
<img alt="Sednaya" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="The mountain town of Sednaya, Syria, showing the ancient Monastery of Our Lady perched on a cliffside. The architecture is a mix of white-washed buildings and red-tiled roofs, set against a backdrop of rugged brown mountains under a clear sky. The mood is peaceful and spiritual, rendered with crisp, modern clarity." src={sednaya}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
<h3 className="font-headline-sm text-headline-sm font-bold mb-1">صيدنايا</h3>
<p className="text-surface-variant opacity-90 text-sm">سكينة وهدوء الجبال.</p>
<div className="flex items-center gap-4">
<span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
</div>
</div>
</div>

<div className="col-span-12 md:col-span-8 relative rounded-3xl overflow-hidden h-[300px] group shadow-lg">
<img alt="Maaloula" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="An aerial view of Maaloula, Syria, where blue-painted houses are carved directly into the steep limestone cliffs of the Qalamoun Mountains. The early morning light creates soft shadows in the narrow gorges. The palette features striking Mediterranean blues against pale stone, creating a unique and visually compelling cultural landscape." src={maaloula}/>
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
<h3 className="font-headline-md text-headline-md font-bold mb-1">معلولا: لغة التاريخ</h3>
<p className="text-surface-variant opacity-90 mb-4">جولة في المدينة التي لا تزال تتحدث الآرامية، لغة السيد المسيح.</p>
<div className="flex items-center gap-4">
<span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
</div>
</div>
</div>
</div>
</section></>
  )
}

export default TuristDestinations