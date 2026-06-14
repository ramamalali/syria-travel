import sets from "@/assets/images/sets.png";
function AboutUs() {
  return (
    <>
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto" id="AboutUs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
            <img
              alt="About Sawa"
              className="relative z-10 w-full rounded-2xl shadow-xl border-4 border-white"
              data-alt="A clean, professionally shot interior of a modern executive luxury coach bus. The seats are upholstered "
              src={sets}
            />
          </div>
          <div>
            <span className="text-secondary font-label-md text-label-md tracking-widest block mb-4">
              لماذا سوريا السياحية؟
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-8 leading-tight">
              الريادة في النقل السياحي  في سوريا
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    verified_user
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-primary mb-1">
                    أمان مطلق
                  </h4>
                  <p className="text-on-surface-variant font-body-md text-body-md">
                    نعتمد أعلى معايير السلامة وصيانة دورية لأسطولنا لضمان وصولكم
                    بسلام.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    airline_seat_recline_extra
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-primary mb-1">
                    راحة لا تضاهى
                  </h4>
                  <p className="text-on-surface-variant font-body-md text-body-md">
                    مقاعد جلدية فاخرة، تكييف متطور، وخدمة إنترنت مجانية طوال
                    الرحلة.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    schedule
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-primary mb-1">
                    التزام بالمواعيد
                  </h4>
                  <p className="text-on-surface-variant font-body-md text-body-md">
                    نقدر وقتكم، لذا نلتزم بمواعيد الانطلاق والوصول بدقة متناهية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default AboutUs;
