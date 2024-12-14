import { useContext } from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import { BlockDefinition as Block } from '@sanity/types';
import { Language } from '../../types/Shared';

const defaultFallback = 'Translation unavailable';

const useTranslation = () => {
  const { currentLanguage } = useContext(LanguageContext);

  const localeString = (localString: Partial<Record<Language, string>> | undefined, fallback?: string): string => {
    if (!localString) {
      return fallback ?? defaultFallback;
    }

    if (localString[currentLanguage]) {
      return localString[currentLanguage] ?? defaultFallback;
    }

    return localString.en ?? localString.nb ?? defaultFallback;
  };

  const localeBlocks = (localeBlock: Partial<Record<Language, Block[]>> | undefined, fallback?: Block[]): Block[] => {
    const defFallback: Block = {
      type: 'block',
      name: 'Default',
    };
    if (!localeBlock) {
      return fallback ?? [defFallback];
    }

    if (localeBlock[currentLanguage]) {
      return localeBlock[currentLanguage] ?? [defFallback];
    }

    return localeBlock.en ?? localeBlock.nb ?? [defFallback];
  };

  return {
    localeString,
    localeBlocks,
  };
};

export default useTranslation;
