

function Navbar() {

  return (
    <>
    <nav className="bg-surface sticky top-0 z-50 w-full h-16 shadow-sm border-b border-outline-variant">
<div className="flex justify-between items-center px-margin-desktop max-w-container-max mx-auto h-full">
<div className="flex items-center gap-8">
<span className="font-headline-sm text-headline-sm font-bold text-primary">Sawa Travel</span>
<div className="hidden md:flex gap-6">
<a className="text-primary border-b-2 border-primary pb-1 font-body-md text-body-md cursor-pointer transition-colors" href="#">الرئيسية</a>
<a className="text-on-surface-variant hover:text-primary pb-1 font-body-md text-body-md cursor-pointer transition-colors" href="#destinations">الوجهات</a>
<a className="text-on-surface-variant hover:text-primary pb-1 font-body-md text-body-md cursor-pointer transition-colors" href="#offers">العروض</a>
<a className="text-on-surface-variant hover:text-primary pb-1 font-body-md text-body-md cursor-pointer transition-colors" href="#contact">اتصل بنا</a>
</div>
</div>
<div className="flex items-center gap-4">
<button className="hidden md:block text-primary font-label-md text-label-md cursor-pointer active:scale-95 transition-all">تسجيل الدخول</button>
<button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md cursor-pointer active:scale-95 transition-all">اشتراك</button>
</div>
</div>
</nav>
    </>
  );
}

export default Navbar;
