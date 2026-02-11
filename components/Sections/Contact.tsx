import React, { useState } from 'react';
import { Phone, Mail, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { t } = useLanguage();

  // Manual submission handler
  const handleSubmit = () => {
    // Basic validation
    const inputs = document.getElementById('contact-form-container')?.querySelectorAll('input, textarea, select');
    let isValid = true;
    inputs?.forEach((input) => {
      if ((input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value.trim() === '') {
        isValid = false;
        (input as HTMLElement).classList.add('border-brand-red');
        (input as HTMLElement).classList.add('bg-red-50');
      } else {
        (input as HTMLElement).classList.remove('border-brand-red');
        (input as HTMLElement).classList.remove('bg-red-50');
      }
    });

    if (!isValid) return;

    setFormState('submitting');

    // Simulate network request
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-cream relative">
      {/* Background shape */}
      <div className="absolute right-0 bottom-0 w-1/3 h-full bg-stone-100 rounded-tl-[100px] z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3">{t('contact.tag')}</h2>
          <h3 className="font-serif text-4xl text-brand-dark font-bold">{t('contact.title')}</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center text-center hover:shadow-lg hover:border-brand-gold/20 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-red/5 rounded-full flex items-center justify-center text-brand-red mb-4">
                <Phone size={24} />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">{t('contact.call.title')}</h4>
              <p className="text-stone-500 text-sm mb-4">{t('contact.call.desc')}</p>
              <a href="tel:+972526348809" className="text-lg font-bold text-brand-red hover:text-brand-gold transition-colors">
                +972 52-634-8809
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center text-center hover:shadow-lg hover:border-brand-gold/20 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-red/5 rounded-full flex items-center justify-center text-brand-red mb-4">
                <Mail size={24} />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">{t('contact.email.title')}</h4>
              <p className="text-stone-500 text-sm mb-4">{t('contact.email.desc')}</p>
              <a href="mailto:Illana@ibh-law.com" className="text-lg font-bold text-brand-red hover:text-brand-gold transition-colors break-all">
                Illana@ibh-law.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center text-center hover:shadow-lg hover:border-brand-gold/20 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-red/5 rounded-full flex items-center justify-center text-brand-red mb-4">
                <Clock size={24} />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">{t('contact.hours.title')}</h4>
              <p className="text-stone-600 text-sm">{t('contact.hours.week')}</p>
              <p className="text-stone-600 text-sm">{t('contact.hours.fri')}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border-t-4 border-brand-red p-8 md:p-12 relative overflow-hidden min-h-[500px]">
            {formState === 'success' ? (
              <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h4 className="font-serif text-3xl font-bold text-brand-dark mb-4">{t('contact.form.success.title')}</h4>
                <p className="text-stone-600 mb-8 text-lg max-w-md">{t('contact.form.success.desc')}</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="bg-brand-red text-white px-8 py-3 rounded-lg hover:bg-brand-light transition-colors font-medium"
                >
                  {t('contact.form.success.button')}
                </button>
              </div>
            ) : (
              <>
                <h4 className="font-serif text-2xl font-bold text-brand-dark mb-2">{t('contact.form.title')}</h4>
                <p className="text-stone-500 mb-8">{t('contact.form.subtitle')}</p>

                <div id="contact-form-container" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-700 uppercase tracking-wide text-xs">{t('contact.form.name')}</label>
                      <input onKeyDown={handleKeyDown} type="text" className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-700 uppercase tracking-wide text-xs">{t('contact.form.phone')}</label>
                      <input onKeyDown={handleKeyDown} type="tel" className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="+972..." />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700 uppercase tracking-wide text-xs">{t('contact.form.email')}</label>
                    <input onKeyDown={handleKeyDown} type="email" className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700 uppercase tracking-wide text-xs">{t('contact.form.area')}</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all">
                      <option>{t('contact.form.areas.realEstate')}</option>
                      <option>{t('contact.form.areas.companies')}</option>
                      <option>{t('contact.form.areas.inheritance')}</option>
                      <option>{t('contact.form.areas.other')}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700 uppercase tracking-wide text-xs">{t('contact.form.message')}</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder={t('contact.form.message')}></textarea>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={formState === 'submitting'}
                    className="w-full bg-brand-red hover:bg-brand-light disabled:bg-stone-400 text-white font-bold py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-4"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        {t('contact.form.sending')}
                      </>
                    ) : t('contact.form.submit')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;