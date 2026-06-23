import hamah from '@/assets/images/hamah.png'
import halab from '@/assets/images/halab.png'
import latakia from '@/assets/images/latakia.png'
import homs from '@/assets/images/homs.png'
import tadmur from '@/assets/images/tadmour.png'
import hosn from '@/assets/images/alhusn.png' 
import sednaya from '@/assets/images/sednaya.png'
import maaloula from '@/assets/images/malula.png'
import damas from '@/assets/images/damas.png'
import tartous from '@/assets/images/tartous.png'






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
      title: "حلب",
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
      title: "اللاذقية",
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
      title: " حمص",
      description: "عراقة المدينة الحمصية القديمة وأسواقها",
      alt: "Homs heritage",
      image: homs,
      featured: true,
      gridClass: "",
      titleClass: "font-headline-sm text-headline-sm",
      paddingClass: "p-6"
    },
    {
      id: "dest-tartous",
      title: "طرطوس",
      description: "من اجمل المدن السورية",
      alt: "tartous",
      image: tartous,
      featured: false, // تظهر في صفحة الكل فقط
    },
    {
      id: "dest-rackah",
      title: "الرقة",
      description: "عروس الفرات",
      alt: "rackah",
      image: hosn,
      featured: false,
    },
    {
      id: "dest-deralzor",
      title: "سحر صيدنايا",
      description: "أجواء روحانية وتاريخ مسيحي موغل في القدم",
      alt: "deralzor",
      image: sednaya,
      featured: false,
    },
    {
      id: "dest-alhasaka",
      title: "الحسكة",
      description: "بلدة الصخر والتاريخ المتحدثة بالآرامية",
      alt: "alhasaka",
      image: maaloula,
      featured: false,
    },
    {
      id: "dest-damas",
      title: "دمشق",
      description: "أقدم عاصمة مأهولة في التاريخ وياسمينها العتيق",
      alt: "Old Damascus",
      image: damas,
      featured: false,
    }
  ]
};
// بيانات المناطق الأثرية (يمكنك نقلها إلى ملف constants لاحقاً إذا أردت)
export const provinceData = {
  provinceName: "محافظة دمشق وريفها",
  title: "كنوز التاريخ والأصالة",
  description: "استكشف أعرق المواقع الأثرية في العالم، حيث تلتقي الحضارات وتتنفس الجدران حكايات التاريخ.",
  backText: "العودة للرئيسية",
  items: [
    {
      id: 1,
      title: "الجامع الأموي الكبير",
      location: "دمشق القديمة",
      description: "لؤلؤة العمارة الإسلامية ومن أقدم وأعظم المساجد في العالم، يجسد تلاحم الحضارات المتعاقبة.",
      image: "https://images.unsplash.com/photo-1590075865003-e48277adc558?auto=format&fit=crop&w=800&q=80", // رابط تجريبي لصورة أثرية
      tags: ["تاريخي", "ديني"],
    },
    {
      id: 2,
      title: "مدينة معلولا الأثرية",
      location: "قلمون، ريف دمشق",
      description: "الحاضنة التاريخية الفريدة التي تنبض بالحياة، حيث ما زال سكانها يتحدثون اللغة الآرامية، لغة السيد المسيح.",
      image: "https://images.unsplash.com/photo-1547149603-d558e6012445?auto=format&fit=crop&w=800&q=80",
      tags: ["أثري", "ثقافي"],
    },
    {
      id: 3,
      title: "قصر العظم",
      location: "البزورية، دمشق القديمة",
      description: "نموذج ساحر للعمارة الدمشقية الفريدة في العهد العثماني، يتميز ببحيراته الرخامية وحدائقه الغناء.",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
      tags: ["عمارة", "متحف"],
    },
    {
      id: 4,
      title: "سوق الحميدية والقلعة",
      location: "مدخل دمشق القديمة",
      description: "أشهر أسواق الشرق وأكثرها عراقة، مغطى بسقف حديدي مخرم تنفذ منه أشعة الشمس، وينتهي بأسوار قلعة دمشق.",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
      tags: ["سياحي", "أسواق"],
    },
    {
      id: 5,
      title: "دير مار تقلا",
      location: "معلولا، ريف دمشق",
      description: "دير منحوت في الصخر يضم الفج الصخري الشهير والمياه المقدسة، ويعد مزاراً سياحياً وتاريخياً عالمياً.",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80",
      tags: ["أثري", "ديني"],
    },
    {
      id: 6,
      title: "التكية السليمانية",
      location: "ضفاف نهر بردى، دمشق",
      description: "تحفة معمارية صممها المعماري الشهير سنان، وتعتبر اليوم مركزاً للحفاظ على الحرف والمهن اليدوية الدمشقية التراثية.",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      tags: ["تراث", "عمارة"],
    }
  ]
};
export const toursSectionData = {
  title: "رحلاتنا السياحية للمحافظات",
  description: "اكتشف الكنوز الأثرية لكل محافظة سورية من خلال جولاتنا الشاملة والمنظمة.",
  viewAllText: "مشاهدة جميع المحافظات",
  items: [
    {
      id: "tour-homs",
      province: "حمص",
      title: "جولة حمص الأثرية الكبرى",
      bookingName: "برنامج جولة محافظة حمص المتكامل",
      description: "رحلة شاملة تشمل زيارة قلاع حمص العريقة، أسواقها العتيقة، مزاراتها الدينية الكبرى لثلاثة أيام.",
      price: "450,000 ل.س / للشخص",
      image: hosn, // يمكنك استخدام الصورة المناسبة
      alt: "Homs Tour",
      featured: true,
      gridClass: "col-span-12 md:col-span-8 h-[400px] p-10",
      titleClass: "font-headline-lg text-headline-lg mb-2",
      details: {
        fullDescription: "جولة تاريخية عريضة تبدأ من ريف حمص الغربي صعوداً إلى القلاع المعمارية الفخمة، مرواً بوسط المدينة التاريخي وأحيائها القديمة ومزاراتها المقدسة.",
        landmarksToVisit: [
          "قلعة الحصن المعمارية الشهيرة", 
          "جامع خالد بن الوليد التاريخي", 
          "كنيسة أم الزنار الأثرية", 
          "أسواق حمص القديمة والقيصريات"
        ],
        duration: "3 أيام - ليلتان",
        hotelStay: "تتضمن إقامة فندقية (فندق السفير حمص)",
        bookingStart: "بدأ الحجز وينتهي قبل الرحلة بيومين",
        tourDate: "الخميس القادم الساعة 07:30 صباحاً"
      }
    },
    {
      id: "tour-damascus",
      province: "دمشق وريفها",
      title: "أصالة الشام وصيدنايا",
      bookingName: "برنامج جولة دمشق وريفها الأثرية",
      description: "جولة بين أقدم عاصمة مأهولة في التاريخ وأديرة جبال ريف دمشق الشامخة.",
      price: "350,000 ل.س / للشخص",
      image: sednaya,
      alt: "Damascus Tour",
      featured: true,
      gridClass: "col-span-12 md:col-span-4 h-[400px] p-8",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1",
      details: {
        fullDescription: "مسار سياحي مميز يربط الحارات الشامية القديمة داخل السور بجمال وروحانية الفجاج والأديرة الصخرية العتيقة في معلولا وصيدنايا.",
        landmarksToVisit: [
          "الجامع الأموي الكبير بدمشق", 
          "سوق الحميدية ومدحت باشا", 
          "دير سيدة صيدنايا الجبلي", 
          "أديرة وفج معلولا الأثرية"
        ],
        duration: "يومين - ليلة واحدة",
        hotelStay: "تتضمن مبيت في بيت ضيافة شامي تراثي",
        bookingStart: "متاح للحجز الآن",
        tourDate: "الجمعة القادمة الساعة 08:00 صباحاً"
      }
    },
    {
      id: "tour-aleppo",
      province: "حلب",
      title: "عاصمة الطرب والشهباء",
      bookingName: "جولة محافظة حلب التاريخية",
      description: "رحلة وثائقية لأضخم القلاع وأعرق الأسواق المسقوفة في العالم.",
      price: "500,000 ل.س / للشخص",
      image: halab,
      alt: "Aleppo Tour",
      featured: true,
      gridClass: "col-span-12 md:col-span-4 h-[300px] p-6",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1",
      details: {
        fullDescription: "جولة غنية في عاصمة الشمال السوري، تركز على العمارة العسكرية الإسلامية والأسواق التراثية المسقوفة التي تروي قصص طريق الحرير الممتد.",
        landmarksToVisit: [
          "قلعة حلب وأبراجها الضخمة", 
          "الأسواق القديمة المستقيمة (المدينة)", 
          "المدرسة الحلوية الأثرية", 
          "خان الشونة والصاغة القديم"
        ],
        duration: "4 أيام - 3 ليالي",
        hotelStay: "تتضمن إقامة فندقية (فندق شهباء حلب)",
        bookingStart: "مفتوح حالياً وحتى اكتمال المقاعد",
        tourDate: "الأحد القادم الساعة 06:00 صباحاً"
      }
    },
    {
      id: "tour-coast",
      province: "اللاذقية وطرطوس",
      title: "جولة الساحل وأوغاريت",
      bookingName: "برنامج جولة محافظات الساحل الأثرية",
      description: "تاريخ ممتد من أول أبجدية في العالم وصولاً إلى الجزر والقلاع البحرية الصليبية.",
      price: "400,000 ل.س / للشخص",
      image: latakia,
      alt: "Coast Tour",
      featured: true,
      gridClass: "col-span-12 md:col-span-8 h-[300px] p-10",
      titleClass: "font-headline-md text-headline-md font-bold mb-1",
      details: {
        fullDescription: "رحلة تجمع سحر البحر الأبيض المتوسط بعمق التاريخ، حيث نمر على قلاع الجبال والحصون البحرية وموقع اكتشاف الأبجدية الأولى.",
        landmarksToVisit: [
          "مملكة أوغاريت الأثرية برأس شمرا", 
          "قلعة صلاح الدين الأيوبي بالجبال", 
          "جزيرة أرواد البحرية الكنعانية", 
          "برج صافيتا الأثري الشهير"
        ],
        duration: "3 أيام - ليلتان",
        hotelStay: "تتضمن إقامة فندقية مطلة على البحر",
        bookingStart: "متاح للتثبيت الفوري",
        tourDate: "الجمعة القادمة الساعة 07:00 صباحاً"
      }
    }
  ]
};

export const allToursData = {
  title: "جميع الرحلات السياحية للمحافظات السورية",
  description: "استكشف الكنوز الأثرية والتاريخية الممتدة عبر كافة المحافظات من قلب البادية وحتى قمم الجبال الساحلية.",
  items: [
    {
      id: "all-tour-homs",
      province: "حمص",
      title: "جولة حمص الأثرية الكبرى",
      bookingName: "برنامج جولة محافظة حمص المتكامل",
      description: "رحلة شاملة تشمل زيارة قلاع حمص العريقة، أسواقها العتيقة، مزاراتها الدينية الكبرى لثلاثة أيام.",
      price: "450,000 ل.س / للشخص",
      image: hosn,
      alt: "Homs Tour",
      featured: true,
      gridClass: "col-span-12 md:col-span-8 h-[400px] p-10",
      titleClass: "font-headline-lg text-headline-lg mb-2",
      details: {
        fullDescription: "جولة تاريخية عريضة تبدأ من ريف حمص الغربي صعوداً إلى القلاع المعمارية الفخمة، مرواً بوسط المدينة التاريخي وأحيائها القديمة ومزاراتها المقدسة.",
        landmarksToVisit: [
          "قلعة الحصن المعمارية الشهيرة", 
          "جامع خالد بن الوليد التاريخي", 
          "كنيسة أم الزنار الأثرية", 
          "أسواق حمص القديمة والقيصريات"
        ],
        duration: "3 أيام - ليلتان",
        hotelStay: "تتضمن إقامة فندقية (فندق السفير حمص)",
        bookingStart: "بدأ الحجز وينتهي قبل الرحلة بيومين",
        tourDate: "الخميس القادم الساعة 07:30 صباحاً"
      }
    },
    {
      id: "all-tour-damascus",
      province: "دمشق وريفها",
      title: "أصالة الشام وصيدنايا",
      bookingName: "برنامج جولة دمشق وريفها الأثرية",
      description: "جولة بين أقدم عاصمة مأهولة في التاريخ وأديرة جبال ريف دمشق الشامخة.",
      price: "350,000 ل.س / للشخص",
      image: sednaya,
      alt: "Damascus Tour",
      featured: true,
      gridClass: "col-span-12 md:col-span-4 h-[400px] p-8",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1",
      details: {
        fullDescription: "مسار سياحي مميز يربط الحارات الشامية القديمة داخل السور بجمال وروحانية الفجاج والأديرة الصخرية العتيقة في معلولا وصيدنايا.",
        landmarksToVisit: [
          "الجامع الأموي الكبير بدمشق", 
          "سوق الحميدية والشارع المستقيم", 
          "دير سيدة صيدنايا الجبلي", 
          "أديرة وفج معلولا الأثرية"
        ],
        duration: "يومين - ليلة واحدة",
        hotelStay: "تتضمن مبيت في بيت ضيافة شامي تراثي",
        bookingStart: "متاح للحجز الآن",
        tourDate: "الجمعة القادمة الساعة 08:00 صباحاً"
      }
    },
    {
      id: "all-tour-aleppo",
      province: "حلب",
      title: "عاصمة الطرب والشهباء",
      bookingName: "جولة محافظة حلب التاريخية",
      description: "رحلة وثائقية لأضخم القلاع وأعرق الأسواق المسقوفة في العالم.",
      price: "500,000 ل.س / للشخص",
      image: halab,
      alt: "Aleppo Tour",
      featured: true,
      gridClass: "col-span-12 md:col-span-4 h-[300px] p-6",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1",
      details: {
        fullDescription: "جولة غنية في عاصمة الشمال السوري، تركز على العمارة العسكرية الإسلامية والأسواق التراثية المسقوفة التي تروي قصص طريق الحرير الممتد.",
        landmarksToVisit: [
          "قلعة حلب وأبراجها الضخمة", 
          "الأسواق القديمة المستقيمة (المدينة)", 
          "المدرسة الحلوية الأثرية", 
          "خان الشونة والصاغة القديم"
        ],
        duration: "4 أيام - 3 ليالي",
        hotelStay: "تتضمن إقامة فندقية (فندق شهباء حلب)",
        bookingStart: "مفتوح حالياً وحتى اكتمال المقاعد",
        tourDate: "الأحد القادم الساعة 06:00 صباحاً"
      }
    },
    {
      id: "all-tour-latakia",
      province: "اللاذقية",
      title: "عروس الساحل وأوغاريت",
      bookingName: "برنامج جولة محافظة اللاذقية",
      description: "تاريخ ممتد من أول أبجدية في العالم وصولاً إلى الجبال الخضراء المطلة على البحر.",
      price: "400,000 ل.س / للشخص",
      image: latakia,
      alt: "Latakia Tour",
      featured: true,
      gridClass: "col-span-12 md:col-span-8 h-[300px] p-10",
      titleClass: "font-headline-md text-headline-md font-bold mb-1",
      details: {
        fullDescription: "رحلة تجمع سحر البحر الأبيض المتوسط بعمق التاريخ الفينيقي، حيث نمر على قلاع الجبال وموقع اكتشاف الأبجدية الأولى وغابات كسب الخلابة.",
        landmarksToVisit: [
          "مملكة أوغاريت الأثرية برأس شمرا", 
          "قلعة صلاح الدين الأيوبي بالجبال", 
          "الآثار الرومانية في القنوات والمدينة القديمة",
          "غابات وقمم كسب الخضراء"
        ],
        duration: "3 أيام - ليلتان",
        hotelStay: "تتضمن إقامة فندقية (فندق أفاميا الشام أو منتجع روتانا)",
        bookingStart: "متاح للتثبيت الفوري",
        tourDate: "الجمعة القادمة الساعة 07:00 صباحاً"
      }
    },
    {
      id: "all-tour-tartous",
      province: "طرطوس",
      title: "قلاع البحر والتاريخ الكنعاني",
      bookingName: "برنامج جولة محافظة طرطوس",
      description: "اكتشف معالم الجزيرة المأهولة الوحيدة في سوريا وقلاع طرطوس الشامخة.",
      price: "380,000 ل.س / للشخص",
      image: tartous, // تأكدي من استيراد الصور في الأعلى
      alt: "Tartous Tour",
      featured: false,
      gridClass: "col-span-12 md:col-span-6 h-[350px] p-8",
      titleClass: "font-headline-md text-headline-md font-bold mb-1",
      details: {
        fullDescription: "رحلة ساحلية فريدة مخصصة لاستكشاف المواقع الفينيقية البحرية، وزيارة الكاتدرائيات والقلاع الصليبية التاريخية المنتشرة في ريف المحافظة الجبلي.",
        landmarksToVisit: [
          "جزيرة أرواد البحرية التاريخية", 
          "قلعة مرقب الضخمة بريف بانياس", 
          "برج صافيتا الأثري الشامخ", 
          "عمريت الأثرية (الملعب والمعبد الفينيقي)"
        ],
        duration: "3 أيام - ليلتان",
        hotelStay: "تتضمن إقامة فندقية (فندق شاهين طرطوس)",
        bookingStart: "متاح للحجز",
        tourDate: "الأربعاء القادم الساعة 08:00 صباحاً"
      }
    },
    {
      id: "all-tour-hama",
      province: "حماة",
      title: "أصالة النواعير ومملكة أفاميا",
      bookingName: "برنامج جولة محافظة حماة الشاملة",
      description: "رحلة عبق التاريخ لسماع صوت النواعير الأثرية واستكشاف أعمدة أفاميا العملاقة.",
      price: "320,000 ل.س / للشخص",
      image: hamah,
      alt: "Hama Tour",
      featured: false,
      gridClass: "col-span-12 md:col-span-6 h-[350px] p-8",
      titleClass: "font-headline-md text-headline-md font-bold mb-1",
      details: {
        fullDescription: "رحلة تجمع هدوء نهر العاصي في قلب حماة بعظمة المدرجات والأعمدة الرومانية والبيزنطية الشاهقة في ريفها الشمالي والغربي.",
        landmarksToVisit: [
          "نواعير حماة الأثرية الكبرى الكائنة على العاصي", 
          "موقع أفاميا الأثري والشارع المستقيم الطويل", 
          "قصر العظم الأثري (متحف التقاليد الشعبية)", 
          "قلعة شيزر التاريخية المشرفة على النهر"
        ],
        duration: "يومين - ليلة واحدة",
        hotelStay: "تتضمن مبيت في فندق أفاميا الشام حماة",
        bookingStart: "متاح الآن",
        tourDate: "الخميس القادم الساعة 07:30 صباحاً"
      }
    },
    {
      id: "all-tour-palmyra",
      province: "دير الزور والرقة (البادية السورية)",
      title: "لؤلؤة الفرات وآثار ماري",
      bookingName: "برنامج جولة وادي الفرات والبادية",
      description: "رحلة استكشافية عميقة لحواضر وادي الفرات وممالكها القديمة الممتدة.",
      price: "480,000 ل.س / للشخص",
      image: /* deirEzzor */null,
      alt: "Deir Ezzor Tour",
      featured: false,
      gridClass: "col-span-12 md:col-span-6 h-[350px] p-8",
      titleClass: "font-headline-md text-headline-md font-bold mb-1",
      details: {
        fullDescription: "مسار استكشافي لعشاق الحضارات القديمة، يتتبع ضفاف نهر الفرات الخالد لزيارة القلاع المنيعة والممالك الطينية والحجرية الأولى في الشرق الأدنى.",
        landmarksToVisit: [
          "مملكة ماري (تل الحريري) التاريخية", 
          "موقع دورا أوروبوس (صالحية الفرات)", 
          "قلعة رحبة مالك بن طوق الأثرية", 
          "قلعة جعفر الأثرية على بحيرة الأسد"
        ],
        duration: "3 أيام - ليلتان",
        hotelStay: "تتضمن مبيت فندقي مجهز بالكامل لراحة السياح",
        bookingStart: "ينتهي الحجز قريباً لتنظيم الموافقات",
        tourDate: "الجمعة بعد القادمة الساعة 06:00 صباحاً"
      }
    },
    {
      id: "all-tour-idlib",
      province: "إدلب",
      title: "المدن الميتة ومملكة إيبلا",
      bookingName: "برنامج جولة محافظة إدلب الأثرية",
      description: "رحلة استثنائية لاستكشاف القرى والمدن المنسية البيزنطية ومتحف إيبلا العريق.",
      price: "360,000 ل.س / للشخص",
      image: /* idlib */ null,
      alt: "Idlib Tour",
      featured: false,
      gridClass: "col-span-12 md:col-span-6 h-[350px] p-8",
      titleClass: "font-headline-md text-headline-md font-bold mb-1",
      details: {
        fullDescription: "جولة تاريخية متخصصة في ريف المحافظة الغني بأكبر تجمع للمدن الأثرية المنسية (المدن الميتة) التي تعود للقرون الأولى، مع زيارة حاضرة إيبلا.",
        landmarksToVisit: [
          "موقع مملكة إيبلا الأثرية (تل مرديخ)", 
          "القرى الأثرية المنسية في جبل الزاوية بارا وسيرجيلا", 
          "كنيسة قلب لوزة البيزنطية الشهيرة", 
          "متحف معرة النعمان للفسيفساء الأثرية"
        ],
        duration: "يومين - ليلة واحدة",
        hotelStay: "تتضمن إقامة في بيت ضيافة محلي مجهز",
        bookingStart: "الحجز متاح",
        tourDate: "السبت القادم الساعة 08:00 صباحاً"
      }
    },
    {
      id: "all-tour-sweida",
      province: "السويداء",
      title: "أعمدة البازلت الأسود بمملكة قنوات",
      bookingName: "برنامج جولة محافظة السويداء",
      description: "رحلة عبر العمارة البازلتية الفريدة لروما القديمة والأنباط بجنوب سوريا.",
      price: "310,000 ل.س / للشخص",
      image: /* sweida */ null,
      alt: "Sweida Tour",
      featured: false,
      gridClass: "col-span-12 md:col-span-4 h-[350px] p-6",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1",
      details: {
        fullDescription: "جولة تاريخية ساحرة في جنوب سوريا لاستكشاف المدن المبنية بالكامل من الحجر البازلتي الأسود البركاني، والوقوف على بقايا المعابد النبطية والرومانية الشامخة.",
        landmarksToVisit: [
          "موقع قنوات الأثري معابد ومسارح (كاناثا)", 
          "مدينة شهبا (فليبوبوليس) ومسرحها الإمبراطوري", 
          "متحف السويداء للفسيفساء النادرة", 
          "معبد مشنق النبطي الأثري"
        ],
        duration: "يومين - ليلة واحدة",
        hotelStay: "تتضمن مبيت في نزل سياحي تراثي",
        bookingStart: "الحجز مفتوح",
        tourDate: "الجمعة القادمة الساعة 07:30 صباحاً"
      }
    },
    {
      id: "all-tour-daraa",
      province: "درعا",
      title: "مدرج بصرى الشام الدولي",
      bookingName: "برنامج جولة محافظة درعا الأثرية",
      description: "قف على خشبة أزهى وأكمل المدرجات الرومانية المحفوظة بالكامل في العالم.",
      price: "300,000 ل.س / للشخص",
      image: /* daraa */ null,
      alt: "Daraa Tour",
      featured: false,
      gridClass: "col-span-12 md:col-span-4 h-[350px] p-6",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1",
      details: {
        fullDescription: "رحلة مخصصة بالكامل لزيارة عاصمة حوران القديمة (بصرى الشام) والتجول داخل قلعتها الأيوبية المسورة التي تحمي بداخلها تحفة المعمار الروماني المدرج الدولي.",
        landmarksToVisit: [
          "مدرج بصرى الروماني الشهير وقلعته", 
          "الجامع العمري التاريخي في بصرى", 
          "السرير النبطي وباب الهوى الأثري", 
          "الحمامات الرومانية القديمة والسوق الأثري"
        ],
        duration: "يوم واحد كامل (بدون مبيت)",
        hotelStay: "لا تتضمن حجز فندقي",
        bookingStart: "متاح الآن",
        tourDate: "السبت القادم الساعة 07:00 صباحاً"
      }
    },
    {
      id: "all-tour-hasakah",
      province: "الحسكة والقنيطرة",
      title: "تلال الجزيرة السورية وتاريخ الجولان",
      bookingName: "برنامج جولة الحواضر والمدن المنسية",
      description: "رحلة فريدة تربط عراقة تلال الجزيرة السورية بملامح التاريخ في الجولان وقنيطرة المجد.",
      price: "420,000 ل.س / للشخص",
      image: /* hasakah */ null,
      alt: "Hasakah and Quneitra Tour",
      featured: false,
      gridClass: "col-span-12 md:col-span-4 h-[350px] p-6",
      titleClass: "font-headline-sm text-headline-sm font-bold mb-1",
      details: {
        fullDescription: "جولة توثيقية مميزة صُممت لتغطية تلال الحضارات الأولى بالجزيرة السورية وتاريخ عواصم جنوب غرب سوريا وحصونها التاريخية المشرفة.",
        landmarksToVisit: [
          "تل حلف الأثري التاريخي برأس العين", 
          "تل براك الأثري (مملكة ناغار القديمة)", 
          "مدينة القنيطرة المحررة ومعالمها التاريخية", 
          "بقايا الكنائس والمساجد الأثرية بالجولان"
        ],
        duration: "3 أيام - ليلتان",
        hotelStay: "تتضمن إقامة فندقية مريحة ومؤمنة بالكامل للقروب السياحي",
        bookingStart: "يتطلب حجز مسبق قبل أسبوع",
        tourDate: "الخميس بعد القادم الساعة 05:30 صباحاً"
      }
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