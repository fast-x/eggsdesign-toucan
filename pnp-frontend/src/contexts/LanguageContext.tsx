import React, { useState } from 'react';
import { Languages, LanguageContext as LanguageContextType, Language } from '../types/Shared';

export const availableLanguages: Languages = {
  en: 'en',
  nb: 'nb',
};

const LanguageContext = React.createContext<LanguageContextType>({
  currentLanguage: availableLanguages.en,
  availableLanguages,
});

export const LanguageProvider: React.FunctionComponent = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(availableLanguages.en);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
