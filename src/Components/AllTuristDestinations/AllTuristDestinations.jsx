import { useState } from 'react';
import BookingModal from '@/Components/BookingModal/BookingModal.jsx'; // استيراد المودال من الملف المستقل

import tadmur from '@/assets/images/tadmour.png';
import hosn from '@/assets/images/alhusn.png'; 
import sednaya from '@/assets/images/sednaya.png';
import maaloula from '@/assets/images/malula.png';
import hamah from '@/assets/images/hamah.png'
import halab from '@/assets/images/halab.png'
import latakia from '@/assets/images/latakia.png'

function AllTuristDestinations() {
  // الحالات البرمجية للتحكم بالمودال والوجهة المحددة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  // دالة للتعامل مع النقر على كرت سياحي
  const handleCardClick = (destinationName) => {
    setSelectedDestination(destinationName);
    setIsModalOpen(true);
  };

  // دالة إغلاق المودال
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDestination("");
  };

  return (
    <>
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id='turistdestinations'>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4 leading-tight">رحلاتنا السياحية الخاصة</h2>
            <p className="text-on-surface-variant">انضم إلينا في رحلات منظمة لأعظم المعالم الأثرية والطبيعية في سوريا.</p>
          </div>

        </div>

        {/* شبكة كروت الرحلات الأثرية والسياحية */}
        <div className="grid grid-cols-12 gap-6  ">
              {/* كرت 1: حماه */}
          <div 
            onClick={() => handleCardClick("جولة  نواعير حماه")} 
            className="col-span-12 md:col-span-8 relative rounded-3xl overflow-hidden h-[400px] group shadow-lg cursor-pointer transition-all active:scale-[0.99]"
          >
            <img alt="Palmyra" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={hamah}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
              <h3 className="font-headline-lg text-headline-lg mb-2">جولة نواعير حماه</h3>
              <p className="text-surface-variant opacity-90 max-w-lg mb-4">رحلة تاريخية لمدة يومين تشمل زيارة النواعير  وأفاميا وفندق بل موني.</p>
              <div className="flex items-center gap-4">
                <span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
              </div>
            </div>
          </div>
         

          {/* كرت 2: قلعة الحصن */}
          <div 
            onClick={() => handleCardClick("رحلة قلعة الحصن المعمارية")} 
            className="col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden h-[400px] group shadow-lg cursor-pointer transition-all active:scale-[0.99]"
          >
            <img alt="Krak" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={hosn}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="font-headline-sm text-headline-sm font-bold mb-1">قلعة الحصن</h3>
              <p className="text-surface-variant opacity-90 text-sm mb-4">أهم القلاع في العالم.</p>
              <span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
            </div>
          </div>

          {/* كرت 3: صيدنايا */}
          <div 
            onClick={() => handleCardClick("زيارة صيدنايا والطبيعة")} 
            className="col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden h-[300px] group shadow-lg cursor-pointer transition-all active:scale-[0.99]"
          >
            <img alt="Sednaya" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={sednaya}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="font-headline-sm text-headline-sm font-bold mb-1">صيدنايا</h3>
              <p className="text-surface-variant opacity-90 text-sm">سكينة وهدوء الجبال.</p>
              <div className="flex items-center gap-4">
                <span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
              </div>
            </div>
          </div>

          {/* كرت 4: معلولا */}
          <div 
            onClick={() => handleCardClick("جولة معلولا التاريخية")} 
            className="col-span-12 md:col-span-8 relative rounded-3xl overflow-hidden h-[300px] group shadow-lg cursor-pointer transition-all active:scale-[0.99]"
          >
            <img alt="Maaloula" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={maaloula}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
              <h3 className="font-headline-md text-headline-md font-bold mb-1">معلولا: لغة التاريخ</h3>
              <p className="text-surface-variant opacity-90 mb-4">جولة في المدينة التي لا تزال تتحدث الآرامية، لغة السيد المسيح.</p>
              <div className="flex items-center gap-4">
                <span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
              </div>
            </div>
          </div>

        </div>

          <div className="grid grid-cols-12 gap-6 mt-[27px]">
           {/* كرت 1: تدمر */}
          <div 
            onClick={() => handleCardClick("جولة تدمر الأثرية")} 
            className="col-span-12 md:col-span-8 relative rounded-3xl overflow-hidden h-[400px] group shadow-lg cursor-pointer transition-all active:scale-[0.99]"
          >
            <img alt="Palmyra" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={tadmur}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
              <h3 className="font-headline-lg text-headline-lg mb-2">تدمر: لؤلؤة البادية</h3>
              <p className="text-surface-variant opacity-90 max-w-lg mb-4">رحلة تاريخية لمدة يومين تشمل زيارة القلعة، الشارع المستقيم، وفندق بل موني.</p>
              <div className="flex items-center gap-4">
                <span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
              </div>
            </div>
          </div>
      

          {/* كرت 2: قلعة الحصن */}
          <div 
            onClick={() => handleCardClick("رحلة قلعة حلب المعمارية")} 
            className="col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden h-[400px] group shadow-lg cursor-pointer transition-all active:scale-[0.99]"
          >
            <img alt="Krak" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={halab}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="font-headline-sm text-headline-sm font-bold mb-1">قلعة حلب</h3>
              <p className="text-surface-variant opacity-90 text-sm mb-4">أهم القلاع في العالم.</p>
              <span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
            </div>
          </div>

          {/* كرت 3: صيدنايا */}
          <div 
            onClick={() => handleCardClick("زيارة بحر اللاذقية والطبيعة")} 
            className="col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden h-[300px] group shadow-lg cursor-pointer transition-all active:scale-[0.99]"
          >
            <img alt="Sednaya" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={latakia}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="font-headline-sm text-headline-sm font-bold mb-1">بحر اللاذقية</h3>
              <p className="text-surface-variant opacity-90 text-sm">سكينة وهدوء ومناظر خلابة.</p>
              <div className="flex items-center gap-4">
                <span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
              </div>
            </div>
          </div>

          {/* كرت 4: معلولا */}
          <div 
            onClick={() => handleCardClick("جولة معلولا التاريخية")} 
            className="col-span-12 md:col-span-8 relative rounded-3xl overflow-hidden h-[300px] group shadow-lg cursor-pointer transition-all active:scale-[0.99]"
          >
            <img alt="Maaloula" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={maaloula}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
              <h3 className="font-headline-md text-headline-md font-bold mb-1">معلولا: لغة التاريخ</h3>
              <p className="text-surface-variant opacity-90 mb-4">جولة في المدينة التي لا تزال تتحدث الآرامية، لغة السيد المسيح.</p>
              <div className="flex items-center gap-4">
                <span className="text-secondary-fixed font-bold">150,000 ل.س / للشخص</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* المودال واستقبال الخصائص الديناميكية عبر الـ Props */}
      <BookingModal 
        isModalOpen={isModalOpen} 
        handleCloseModal={handleCloseModal} 
        destination={selectedDestination}
      />
    </>
  );
}

export default AllTuristDestinations;