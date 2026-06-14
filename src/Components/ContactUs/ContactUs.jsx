

function ContactUs() {
  return (
    <>
    <section className="py-24 bg-surface-container" id="contact">
<div className="px-margin-desktop max-w-container-max mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
<div>
<h2 className="font-headline-lg text-headline-lg text-primary mb-6">تواصل معنا</h2>
<p className="text-on-surface-variant mb-10 font-body-md text-body-md">نحن هنا للإجابة على استفساراتكم وتلقي ملاحظاتكم على مدار الساعة. تفضلوا بزيارتنا في مكاتبنا أو اتصلوا بنا مباشرة.</p>
<div className="space-y-6">
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-primary text-2xl">location_on</span>
<div>
<h6 className="font-bold">المكتب الرئيسي</h6>
<p className="text-on-surface-variant">دمشق، شارع البرامكة، بناء شركة سوا، سوريا.</p>
</div>
</div>
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-primary text-2xl">phone_in_talk</span>
<div>
<h6 className="font-bold">خدمة العملاء</h6>
<p className="text-on-surface-variant" dir="ltr">+963 11 222 3333</p>
<p className="text-on-surface-variant" dir="ltr">+963 999 000 111</p>
</div>
</div>
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-primary text-2xl">mail</span>
<div>
<h6 className="font-bold">البريد الإلكتروني</h6>
<p className="text-on-surface-variant">info@sawa-travel.sy</p>
</div>
</div>
</div>
<div className="mt-10 rounded-2xl overflow-hidden h-64 border-2 border-white shadow-lg">
<img alt="Map Location" className="w-full h-full object-cover" data-alt="A stylized, high-contrast map focused on the Damascus Baramkeh district in Syria, featuring clean linework and deep blue watermarks for rivers. The map is designed with a modern professional aesthetic, using a soft sandy background and primary blue accents to highlight key landmarks like the Sawa Travel head office." data-location="Damascus, Syria" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPE8I6km-2KOGEIpYJFGiEr_toMZkxTCei3HHa39jpcatCJMgHeW8T68dCGRI-V6fNr5x3fVhlgJyw7zNd3-NgAAYu4JNSKJ8y-PWA2TqOYq_VBrGmiZ0Qf1D3mR_bQOyKdPLqbs6YSBFpO3EY75bm7wcBw0_tPKmjcVSvqsU2M0dlAAnWmZkexbTKfugFHKW0daPfsR1_SQ9hcSmAgcDXBClSO03fAsZC7msSb85P29oQ1QilQTlcPZ4XOR4ckPRqX6Cb7BhF1K0"/>
</div>
</div>
<div className="bg-white p-10 rounded-3xl shadow-xl border border-outline-variant/30">
<form className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="font-label-md text-label-md">الاسم الكامل</label>
<input className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" placeholder="أدخل اسمك" type="text"/>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md">رقم الهاتف</label>
<input className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" placeholder="09XX XXX XXX" type="tel"/>
</div>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md">البريد الإلكتروني</label>
<input className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" placeholder="example@mail.com" type="email"/>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md">نوع الاستفسار</label>
<select className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none appearance-none">
<option>استفسار عن حجز</option>
<option>شكوى أو مقترح</option>
<option>رحلات المجموعات</option>
<option>أخرى</option>
</select>
</div>
<div className="space-y-2">
<label className="font-label-md text-label-md">رسالتك</label>
<textarea className="w-full p-4 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none" placeholder="كيف يمكننا مساعدتك؟" rows="4"></textarea>
</div>
<button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-lg shadow-lg hover:bg-primary-container active:scale-95 transition-all">إرسال الرسالة</button>
</form>
</div>
</div>
</div>
</section>
        </>
  )
}

export default ContactUs