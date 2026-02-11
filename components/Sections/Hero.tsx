import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with MUCH lighter overlay */}
      <div className="absolute inset-0 z-0">
        <img
          // src="/hero-bg.png"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
          alt="Modern Law Office"
          className="w-full h-full object-cover object-center"
        />
        {/* Changed from slate-900/50 to black/30 to keep it bright but readable */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Subtle warm gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-red/40 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 border border-white/50 rounded-full bg-white/10 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
            <span className="text-white text-xs font-bold tracking-widest uppercase">{t('hero.badge')}</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
            {t('hero.title')}
          </h1>

          <p className="text-white/90 text-lg md:text-2xl mb-12 font-light max-w-2xl leading-relaxed drop-shadow-md border-l-4 border-brand-gold pl-6 md:ml-0 mx-auto text-left">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <a
              href="#contact"
              className="bg-brand-red hover:bg-brand-light text-white px-10 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl shadow-brand-red/30 flex items-center justify-center gap-3 border border-brand-red"
            >
              {t('hero.consultation')} <ArrowRight size={20} />
            </a>
            <a
              href="#expertise"
              className="bg-white hover:bg-stone-100 text-brand-dark px-10 py-4 rounded-full font-semibold text-lg transition-all shadow-lg flex items-center justify-center border-2 border-white"
            >
              {t('hero.expertise')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/80 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em]">{t('hero.scroll')}</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

export default Hero;