import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../i18n/translations';

type Language = 'en' | 'fr' | 'he';
type TranslationType = typeof translations.en;

// Helper to access nested keys like 'hero.title'
function getNestedTranslation(obj: any, path: string): string {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj) || path;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string) => any; // Use simple any for array support or string
    translations: TranslationType;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        // Check localStorage or browser preference
        const savedLang = localStorage.getItem('ibh-language') as Language;
        if (savedLang && ['en', 'fr', 'he'].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ibh-language', language);
        const dir = language === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        document.documentElement.dir = dir;

        // Optional: Add a class to body for specific overrides
        if (language === 'he') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }

    }, [language]);

    const t = (path: string) => {
        return getNestedTranslation(translations[language], path);
    };

    const contextValue: LanguageContextType = {
        language,
        setLanguage,
        t,
        translations: translations[language],
        dir: language === 'he' ? 'rtl' : 'ltr'
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
