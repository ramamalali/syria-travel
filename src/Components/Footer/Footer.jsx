

function Footer() {
  return (
    <>
    <footer className="bg-tertiary text-on-tertiary py-12">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-desktop max-w-container-max mx-auto">
<div className="md:col-span-4">
<span className="font-headline-sm text-headline-sm text-on-tertiary font-bold mb-6 block">Syria Travel</span>
<p className="text-tertiary-fixed-dim text-label-md font-label-md max-w-xs mb-8">نفتخر بكوننا شريككم الأول في اكتشاف جمال سوريا وربط مدنها بأحدث أساطيل النقل وأرقى الخدمات السياحية.</p>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-fixed transition-colors" href="#"><span className="material-symbols-outlined text-white">social_leaderboard</span></a>
<a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-fixed transition-colors" href="#"><span className="material-symbols-outlined text-white">camera_alt</span></a>
<a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-fixed transition-colors" href="#"><span className="material-symbols-outlined text-white">share</span></a>
</div>
</div>
<div className="md:col-span-2">
<h4 className="font-bold mb-6 text-secondary-fixed">الروابط السريعة</h4>
<ul className="space-y-4 font-label-md text-label-md text-tertiary-fixed-dim">
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Sitemap</a></li>
<li><a className="hover:text-secondary-fixed transition-colors" href="#destinations">Destinations</a></li>
<li><a className="hover:text-secondary-fixed transition-colors" href="#offers">Offers</a></li>
</ul>
</div>
<div className="md:col-span-2">
<h4 className="font-bold mb-6 text-secondary-fixed">الدعم</h4>
<ul className="space-y-4 font-label-md text-label-md text-tertiary-fixed-dim">
<li><a className="hover:text-secondary-fixed transition-colors" href="#contact">Contact Us</a></li>
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</a></li>
<li><a className="hover:text-secondary-fixed transition-colors" href="#">Terms of Service</a></li>
</ul>
</div>
<div className="md:col-span-4">
<h4 className="font-bold mb-6 text-secondary-fixed">النشرة البريدية</h4>
<p className="text-tertiary-fixed-dim text-sm mb-6">اشترك ليصلك أحدث العروض والرحلات السياحية الجديدة.</p>
<div className="flex gap-2">
<input className=" w-[77%]  flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:border-secondary" placeholder="بريدك الإلكتروني" type="email"/>
<button className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold">اشترك</button>
</div>
</div>
</div>
<div className="mt-12 pt-8 border-t border-white/10 text-center text-tertiary-fixed-dim font-label-md text-label-md px-margin-desktop max-w-container-max mx-auto">
            © 2026  Syria Travel &amp; Tourism. All rights reserved.
        </div>
</footer>
    
    </>
  )
}

export default Footer