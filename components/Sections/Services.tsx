import React from 'react';
import { Building2, Briefcase, FileSignature, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Building2 className="w-10 h-10 text-white" />,
      title: t('services.realEstate.title'),
      description: t('services.realEstate.description'),
      features: t('services.realEstate.features')
    },
    {
      icon: <Briefcase className="w-10 h-10 text-white" />,
      title: t('services.companies.title'),
      description: t('services.companies.description'),
      features: t('services.companies.features')
    },
    {
      icon: <FileSignature className="w-10 h-10 text-white" />,
      title: t('services.inheritance.title'),
      description: t('services.inheritance.description'),
      features: t('services.inheritance.features')
    }
  ];

  return (
    <section id="expertise" className="py-24 bg-brand-cream relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3">{t('services.title')}</h2>
          <h3 className="font-serif text-4xl text-brand-dark font-bold mb-6">{t('services.subtitle')}</h3>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            {t('services.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-stone-100 hover:border-brand-gold/30 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              <div className="mb-8 w-20 h-20 rounded-2xl bg-brand-red flex items-center justify-center shadow-lg shadow-brand-red/20 group-hover:rotate-3 transition-transform duration-300">
                {service.icon}
              </div>

              <h4 className="font-serif text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-red transition-colors">{service.title}</h4>
              <p className="text-stone-600 mb-8 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-4">
                {Array.isArray(service.features) && service.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-stone-700 text-start">
                    <CheckCircle2 size={18} className="text-brand-gold mt-0.5 shrink-0 rtl:ml-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;