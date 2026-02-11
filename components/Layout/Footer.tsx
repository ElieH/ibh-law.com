import React from 'react';
import { Linkedin, Facebook } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handlePlaceholderClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-1">IBH LAW</h2>
            <p className="text-sm text-slate-500 tracking-widest uppercase">{t('footer.tagline')}</p>
          </div>

          <div className="flex gap-6">
            <button onClick={handlePlaceholderClick} className="text-slate-400 hover:text-brand-red transition-colors cursor-pointer" aria-label="LinkedIn"><Linkedin size={24} /></button>
            <button onClick={handlePlaceholderClick} className="text-slate-400 hover:text-brand-red transition-colors cursor-pointer" aria-label="Facebook"><Facebook size={24} /></button>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} IBH Law & Notary. {t('footer.rights')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button onClick={handlePlaceholderClick} className="hover:text-brand-red transition-colors">{t('footer.privacy')}</button>
            <button onClick={handlePlaceholderClick} className="hover:text-brand-red transition-colors">{t('footer.terms')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;