import hamah from '@/assets/images/hamah.png'
import halab from '@/assets/images/halab.png'
import latakia from '@/assets/images/latakia.png'
import homs from '@/assets/images/homs.png'
import tadmur from '@/assets/images/tadmour.png'
import hosn from '@/assets/images/alhusn.png' 
import sednaya from '@/assets/images/sednaya.png'
import maaloula from '@/assets/images/malula.png'
import damas from '@/assets/images/damas.png'






export const navbarData = {
  logo: "Syria Travel",
  navLinks: [
    { name: "الرئيسية", href: "#" },
    { name: "من نحن", href: "#AboutUs" },
    { name: "كنوزنا الأثرية", href: "#destinations" },
    { name: "الرحلات", href: "#turistdestinations" },
    { name: "العروض", href: "#offers" },
    { name: "اتصل بنا", href: "#contact" },
  ],
  adminHint: "تلميح للأدمن: admin@orbit.com وباسوورد: admin123"
};
// أضيفي هذا الجزء إلى ملف src/data/travelData.js

export const heroData = {
  headline: {
    main: "سوا نسافر...",
    sub: "سوريا بكل تفاصيلها"
  },
  description: "اكتشف جمال المدن السورية، من عراقة دمشق إلى سحر الساحل. نوفر لك رحلات آمنة، مريحة، وبأعلى معايير الجودة.",
  ctaButtons: {
    book: "احجز رحلتك الآن",
    explore: "استكشف الوجهات"
  },
  modalLabels: {
    1: "الخطوة 1: تحديد وجهتك",
    2: "الخطوة 2: البرنامج والمقاعد",
    3: "الخطوة 3: إتمام عملية الحجز",
  },
  seatPrice: 120000, // سعر المقعد الأساسي
  programTypes: [
    { id: "type-1", label: "آثار ومعالم", icon: "temple_hindu", default: true },
    { id: "type-2", label: "طبيعة واسترخاء", icon: "landscape", default: false }
  ],
  availableTours: {
    title: "جولة في مدينة تدمر التاريخية",
    time: "الانطلاق: 07:30 ص من دمشق",
    status: "متاحة"
  }
};

// أضيفي هذا الجزء إلى ملف src/data/travelData.js

export const aboutUsData = {
  badge: "لماذا سوريا السياحية؟",
  title: "الريادة في النقل السياحي في سوريا",
  features: [
    {
      id: "feat-1",
      icon: "verified_user",
      title: "أمان مطلق",
      description: "نعتمد أعلى معايير السلامة وصيانة دورية لأسطولنا لضمان وصولكم بسلام."
    },
    {
      id: "feat-2",
      icon: "airline_seat_recline_extra",
      title: "راحة لا تضاهى",
      description: "مقاعد جلدية فاخرة، تكييف متطور، وخدمة إنترنت مجانية طوال الرحلة."
    },
    {
      id: "feat-3",
      icon: "schedule",
      title: "التزام بالمواعيد",
      description: "نقدر وقتكم، لذا نلتزم بمواعيد الانطلاق والوصول بدقة متناهية."
    }
  ]
};
export const destinationsSectionData = {
  title: "كنوزنا الأثرية",
  description: "اختر وجهتك القادمة لاكتشاف عمق الحضارة السورية",
  viewAllText: "عرض جميع الكنوز",
  // مصفوفة تحتوي على كافة الوجهات المشتركة بين الصفحة الرئيسية والفرعية
  items: [
    {
      id: "dest-hamah",
      title: "حماه",
      description: "رحلة في أزقة التاريخ المأهول منذ الأزل",
      alt: "Old City of hamah panorama",
      image: hamah,
      featured: true, // ستظهر في الصفحة الرئيسية
      gridClass: "md:col-span-2 md:row-span-2", // ستايل الحجم المخصص لها في الصفحة الرئيسية
      titleClass: "font-headline-md text-headline-md mb-2",
      paddingClass: "p-8"
    },
    {
      id: "dest-halab",
      title: "قلعة حلب وأسواقها",
      description: "تجربة تسوق تراثية وتاريخية لا مثيل لها",
      alt: "Aleppo Citadel",
      image: halab,
      featured: true,
      gridClass: "md:col-span-2",
      titleClass: "font-headline-sm text-headline-sm mb-1",
      paddingClass: "p-6"
    },
    {
      id: "dest-latakia",
      title: "استجمام الساحل",
      description: "سحر الطبيعة البحرية والغروب الساحر",
      alt: "Latakia coastline",
      image: latakia,
      featured: true,
      gridClass: "",
      titleClass: "font-headline-sm text-headline-sm",
      paddingClass: "p-6"
    },
    {
      id: "dest-homs",
      title: "سحر حمص",
      description: "عراقة المدينة الحمصية القديمة وأسواقها",
      alt: "Homs heritage",
      image: homs,
      featured: true,
      gridClass: "",
      titleClass: "font-headline-sm text-headline-sm",
      paddingClass: "p-6"
    },
    {
      id: "dest-tadmur",
      title: "سحر تدمر",
      description: "عروس البادية السورية الشاهدة على التاريخ",
      alt: "Palmyra ruins",
      image: tadmur,
      featured: false, // تظهر في صفحة الكل فقط
    },
    {
      id: "dest-hosn",
      title: "قلعة الحصن",
      description: "أعظم القلاع العسكرية في القرون الوسطى",
      alt: "Krak des Chevaliers",
      image: hosn,
      featured: false,
    },
    {
      id: "dest-sednaya",
      title: "سحر صيدنايا",
      description: "أجواء روحانية وتاريخ مسيحي موغل في القدم",
      alt: "Sednaya monastery",
      image: sednaya,
      featured: false,
    },
    {
      id: "dest-maaloula",
      title: "سحر معلولا",
      description: "بلدة الصخر والتاريخ المتحدثة بالآرامية",
      alt: "Maaloula village",
      image: maaloula,
      featured: false,
    },
    {
      id: "dest-damas",
      title: "سحر دمشق",
      description: "أقدم عاصمة مأهولة في التاريخ وياسمينها العتيق",
      alt: "Old Damascus",
      image: damas,
      featured: false,
    }
  ]
};

export const toursSectionData = {
  title: "رحلاتنا السياحية الخاصة",
  description: "انضم إلينا في رحلات منظمة لأعظم المعالم الأثرية والطبيعية في سوريا.",
  viewAllText: "مشاهدة جميع الرحلات",
  items: [
    {
      id: "tour-tadmur",
      title: "تدمر: لؤلؤة البادية",
      bookingName: "جولة تدمر الأثرية",
      description: "رحلة تاريخية لمدة يومين تشمل زيارة القلعة، الشارع المستقيم، وفندق بل موني.",
      price: "150,000 ل.س / للشخص",
      image: tadmur,
      alt: "Palmyra",
      featured: true, // ستظهر في الصفحة الرئيسية
      gridClass: "col-span-12 md:col-span-8 h-[400px] p-10",
      titleClass: "font-headline-lg text-headline-lg mb-2"
    },
    {
      id: "tour-hosn",
      title: "قلعة الحصن",
      bookingName: "رحلة قلعة الحصن المعمارية",
      description: "أهم القلاع في العالم.",
      price: "150,000 ل.س / للشخص",
      image: hosn,
      alt: "Krak",
      featured: true,
      gridClass: "col-span-12 md:col-span-4 h-[400px] p-8",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1"
    },
    {
      id: "tour-sednaya",
      title: "صيدنايا",
      bookingName: "زيارة صيدنايا والطبيعة",
      description: "سكينة وهدوء الجبال.",
      price: "150,000 ل.س / للشخص",
      image: sednaya,
      alt: "Sednaya",
      featured: true,
      gridClass: "col-span-12 md:col-span-4 h-[300px] p-6",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1"
    },
    {
      id: "tour-maaloula",
      title: "معلولا: لغة التاريخ",
      bookingName: "جولة معلولا التاريخية",
      description: "جولة في المدينة التي لا تزال تتحدث الآرامية، لغة السيد المسيح.",
      price: "150,000 ل.س / للشخص",
      image: maaloula,
      alt: "Maaloula",
      featured: true,
      gridClass: "col-span-12 md:col-span-8 h-[300px] p-10",
      titleClass: "font-headline-md text-headline-md font-bold mb-1"
    },
    {
      id: "tour-hamah",
      title: "جولة نواعير حماه",
      bookingName: "جولة نواعير حماه",
      description: "رحلة تاريخية لمدة يومين تشمل زيارة النواعير وأفاميا وفندق بل موني.",
      price: "150,000 ل.س / للشخص",
      image: hamah,
      alt: "Hamah",
      featured: false, // تظهر في صفحة الكل فقط
      gridClass: "col-span-12 md:col-span-8 h-[400px] p-10",
      titleClass: "font-headline-lg text-headline-lg mb-2"
    },
    {
      id: "tour-halab",
      title: "قلعة حلب",
      bookingName: "رحلة قلعة حلب المعمارية",
      description: "أعرق وأضخم القلاع التاريخية المأهولة.",
      price: "150,000 ل.س / للشخص",
      image: halab,
      alt: "Aleppo",
      featured: false,
      gridClass: "col-span-12 md:col-span-4 h-[400px] p-8",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1"
    },
    {
      id: "tour-latakia",
      title: "بحر اللاذقية",
      bookingName: "زيارة بحر اللاذقية والطبيعة",
      description: "سكينة وهدوء ومناظر خلابة على شواطئ الساحل السوري.",
      price: "150,000 ل.س / للشخص",
      image: latakia,
      alt: "Latakia",
      featured: false,
      gridClass: "col-span-12 md:col-span-4 h-[300px] p-6",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1"
    }
  ]
};


// 1. العروض المحدودة (Special Offers)

export const initialOffers = [
  {
    id: "offer-family-beach",
    title: "العرض العائلي الصيفي",
    bookingName: "العرض العائلي الصيفي - بحر اللاذقية",
    description: "رحلة متكاملة لـ 4 أشخاص إلى شواطئ اللاذقية الساحرة شاملة الإقامة الفندقية الفاخرة والنقل الوجبات.",
    discount: "خصم 25%",
    price: 450000 // نكتب السعر كرقم ليتمكن التنسيق toLocaleString() من إضافة الفواصل تلقائياً
  },
  {
    id: "offer-history-tour",
    title: "باقة الكنوز التاريخية",
    bookingName: "باقة الكنوز التاريخية - تدمر والحصن",
    description: "جولة ثقافية عائلية مميزة تشمل زيارة قلاع الحصن وحلب وآثار تدمر مع مرشد سياحي مخصص.",
    discount: "خصم 20%",
    price: 600000
  },
  {
    id: "offer-weekend-escape",
    title: "هروب عطلة نهاية الأسبوع",
    bookingName: "هروب عطلة نهاية الأسبوع - صيدنايا ومعلولا",
    description: "استمتع بأجواء الطبيعة والسكينة الروحية في مرتفعات صيدنايا ومعلولا بأسعار مخفضة للمجموعات.",
    discount: "خصم 15%",
    price: 320000
  }
];
// 2. آراء المسافرين (Testimonials)
// أضيفي هذا الجزء إلى ملف src/data/travelData.js

export const testimonialsData = {
  title: "ماذا يقول مسافرونا",
  items: [
    {
      id: "review-ahmed",
      name: "أحمد العلي",
      role: "مسافر دائم",
      comment: "تجربة السفر مع سوا كانت استثنائية. الحافلات نظيفة جداً والمواعيد دقيقة تماماً. سأعتمد عليهم دائماً في رحلاتي بين حلب ودمشق.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" // استخدام خدمة آمنة لتوليد الصور الرمزية
    },
    {
      id: "review-hadi",
      name: "هادي خوري",
      role: "سياحة داخلية",
      comment: "الرحلة السياحية إلى تدمر كانت منظمة بشكل رائع. الفندق كان ممتازاً والدليل السياحي متمكن جداً من معلوماته. شكراً سوا ترافيل.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hadi"
    },
    {
      id: "review-omar",
      name: "عمر المصطفى",
      role: "طالب جامعي",
      comment: "الخدمة داخل الحافلة ممتازة، الويفي سريع والمقاعد مريحة جداً. أتمنى فقط زيادة عدد الرحلات المسائية بين دمشق واللاذقية.",
      rating: 4, // 4 نجوم لعرض النجمة الفارغة ديناميكياً
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar"
    }
  ]
};


// أضيفي هذا الجزء إلى ملف src/data/travelData.js أو constants الخاص بكِ

export const contactData = {
  title: "تواصل معنا",
  description: "نحن هنا للإجابة على استفساراتكم وتلقي ملاحظاتكم على مدار الساعة. تفضلوا بزيارتنا في مكاتبنا أو اتصلوا بنا مباشرة.",
  address: "دمشق، شارع البرامكة، بناء شركة سوا، سوريا.",
  phones: [
    "+963 11 222 3333",
    "+963 999 000 111"
  ],
  email: "info@sawa-travel.sy",
  mapImgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPE8I6km-2KOGEIpYJFGiEr_toMZkxTCei3HHa39jpcatCJMgHeW8T68dCGRI-V6fNr5x3fVhlgJyw7zNd3-NgAAYu4JNSKJ8y-PWA2TqOYq_VBrGmiZ0Qf1D3mR_bQOyKdPLqbs6YSBFpO3EY75bm7wcBw0_tPKmjcVSvqsU2M0dlAAnWmZkexbTKfugFHKW0daPfsR1_SQ9hcSmAgcDXBClSO03fAsZC7msSb85P29oQ1QilQTlcPZ4XOR4ckPRqX6Cb7BhF1K0" // رابط صورة الخريطة
};



// 3. الحجوزات القادمة (سجل الحجوزات الأولي للوحة التحكم)
export const initialBookings = [
  {
    id: "B-1001",
    customerName: "رشا المحمد",
    phone: "0933111222",
    destination: 'عرض رحلة "الساحل الذهبي"',
    touristsCount: 2,
    seats: [1, 2],
    totalPrice: 900000,
    status: "pending", // pending, confirmed, canceled
    date: "2026-06-21"
  }
];

// 4. رسائل التواصل الواردة
export const initialMessages = [
  {
    id: "msg-1",
    name: "خالد العبدالله",
    phone: "0944555666",
    email: "khaled@mail.com",
    type: "استفسار عن حجز",
    text: "هل يتوفر حجز لرحلة الساحل الأسبوع القادم؟",
    date: "2026-06-20",
    status: "unread" // unread, read
  }
];