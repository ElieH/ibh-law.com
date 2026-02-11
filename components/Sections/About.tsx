import React from 'react';
import { Scale, Award, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white text-stone-900 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 rtl:left-auto rtl:right-0 w-1/2 h-full bg-stone-50 skew-x-12 transform -translate-x-32 rtl:translate-x-32 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-gold/20 rounded-lg transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 rtl:-translate-x-4 rtl:translate-y-4 rtl:group-hover:-translate-x-6"></div>
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop"
                alt="Meeting in office"
                className="rounded-lg shadow-2xl relative z-10 w-full object-cover h-[500px]"
              />

              {/* Quote box */}
              <div className="absolute -left-4 md:-left-12 rtl:left-auto rtl:-right-4 rtl:md:-right-12 bottom-12 bg-brand-red text-white p-8 rounded-tr-3xl rtl:rounded-tr-none rtl:rounded-tl-3xl shadow-xl max-w-xs hidden md:block z-20">
                <p className="font-serif italic text-lg opacity-90">"{t('about.quote')}"</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3">{t('about.title')}</h2>
            <h3 className="font-serif text-4xl font-bold mb-6 text-brand-dark">{t('about.subtitle')}</h3>
            <p className="text-stone-600 text-lg mb-6 leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="text-stone-600 mb-10 leading-relaxed">
              {t('about.p2')}
            </p>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-stone-50 transition-colors">
                <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-brand-dark">{t('about.values.integrity.title')}</h4>
                  <p className="text-sm text-stone-500">{t('about.values.integrity.desc')}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-stone-50 transition-colors">
                <div className="bg-brand-gold/10 p-3 rounded-full text-brand-gold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-brand-dark">{t('about.values.excellence.title')}</h4>
                  <p className="text-sm text-stone-500">{t('about.values.excellence.desc')}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-stone-50 transition-colors">
                <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-brand-dark">{t('about.values.availability.title')}</h4>
                  <p className="text-sm text-stone-500">{t('about.values.availability.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;