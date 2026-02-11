import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();

    // Check if it's a route (starts with /) and not a hash link (e.g., /#home)
    // Actually, our navLinks have '/#home', '#expertise', '/blog'.

    if (href.startsWith('/#')) {
      // Special case for home anchor
      const targetId = href.split('#')[1];
      if (location.pathname === '/' || location.pathname === '') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsScrolled(window.scrollY > 20); // Re-check scroll
        }
      } else {
        // Navigate to home, then scroll (simulated by just going to home for now)
        navigate('/');
        // In a real app, use a context or url param to trigger scroll after nav
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (href.startsWith('#')) {
      // Just anchor
      const targetId = href.substring(1);
      if (location.pathname === '/' || location.pathname === '') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (href.startsWith('/')) {
      // Standard route
      navigate(href);
      window.scrollTo(0, 0);
    }

    setMobileMenuOpen(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const navLinks = [
    { name: t('nav.home'), href: '/#home' }, // Always go to home
    { name: t('nav.expertise'), href: '#expertise' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.contact'), href: '#contact' },
  ];



  const toggleLanguage = () => {
    if (language === 'en') setLanguage('fr');
    else if (language === 'fr') setLanguage('he');
    else setLanguage('en');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${isScrolled || location.pathname !== '/'
        ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-stone-200'
        : 'bg-gradient-to-b from-black/20 to-transparent py-4 border-transparent'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Image */}
        <Link to="/" className="relative z-50 flex items-center">
          {/* 
                We use a white background on the logo when scrolled to ensure contrast if the logo is transparent.
            */}
          <div className={`transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-transparent' : ''} rounded p-1`}>
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Illana Bensoussan Hayot Law Office"
              className={`transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'h-14 md:h-16' : 'h-20 md:h-24'} w-auto object-contain`}
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => {

              return (
                <a
                  key={link.name}
                  href={link.href} // Keep href for semantics/SEO
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`cursor-pointer text-sm font-medium tracking-wide transition-colors duration-300 ${isScrolled || location.pathname !== '/'
                    ? 'text-stone-600 hover:text-brand-red'
                    : 'text-white/90 hover:text-white hover:scale-105 shadow-black/10 drop-shadow-sm'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className={`w-px h-6 mx-2 ${isScrolled || location.pathname !== '/' ? 'bg-stone-300' : 'bg-white/30'}`}></div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${isScrolled || location.pathname !== '/'
                ? 'text-stone-600 border-stone-200 hover:border-brand-red hover:text-brand-red'
                : 'text-white border-white/30 hover:bg-white/10'
                }`}
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'EN' : language === 'fr' ? 'FR' : 'HE'}</span>
            </button>

            <a
              href="tel:+972526348809"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isScrolled || location.pathname !== '/' ? 'text-brand-red hover:text-brand-gold' : 'text-white hover:text-brand-gold'
                }`}
            >
              <Phone size={16} />
              <span className="hidden lg:inline">+972 52-634-8809</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg cursor-pointer ${isScrolled || location.pathname !== '/'
                ? 'bg-brand-red text-white hover:bg-brand-dark'
                : 'bg-white text-brand-red hover:bg-stone-100'
                }`}
            >
              {t('nav.consultation')}
            </a>
          </div>
        </nav>

        {/* Mobile Toggle & Language */}
        <div className="flex items-center gap-4 md:hidden relative z-50">
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full border transition-all ${isScrolled || mobileMenuOpen || location.pathname !== '/'
              ? 'text-stone-800 border-stone-200'
              : 'text-white border-white/30'
              }`}
          >
            {language === 'en' ? 'EN' : language === 'fr' ? 'FR' : 'HE'}
          </button>

          <button
            className={`p-2 relative ${isScrolled || mobileMenuOpen || location.pathname !== '/' ? 'text-brand-dark' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} className="text-brand-dark" /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-8 animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 text-center w-full max-w-sm">
            {navLinks.map((link) => {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="cursor-pointer text-2xl font-serif font-medium text-stone-800 hover:text-brand-red py-2 border-b border-stone-100"
                >
                  {link.name}
                </a>
              );
            })}
            <div className="mt-8 flex flex-col gap-4">
              <a href="tel:+972526348809" className="flex items-center justify-center gap-3 text-stone-600 font-medium bg-stone-50 py-4 rounded-lg">
                <Phone size={20} className="text-brand-gold" />
                +972 52-634-8809
              </a>
              <a href="mailto:Illana@ibh-law.com" className="flex items-center justify-center gap-3 text-stone-600 font-medium bg-stone-50 py-4 rounded-lg">
                <Mail size={20} className="text-brand-gold" />
                Illana@ibh-law.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;