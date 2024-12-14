import { useContext } from 'react';
import LanguageContext from '../../contexts/LanguageContext';

type Props<T> = {
  translation?: {
    en?: T;
    nb?: T;
  } | null;
  children: (translation: T) => JSX.Element | null;
  fallback?: JSX.Element;
};

/**
 * This function takes in a translation object and checks if data has been entered for the currently selected locale.
 * If the data has been entered it runs the child function with the translated value
 */
export default function WithTranslationView<T>({ translation, children, fallback }: Props<T>) {
  const { currentLanguage } = useContext(LanguageContext);

  if (!translation || !translation[currentLanguage]) {
    return fallback ?? null;
  }

  return children(translation[currentLanguage] as T);
}

/**
 * Hanne er designer i EGGS og brenner for alt som skjer i mellommenneskelige relasjoner, så vel som i møtet mellom mennesker og produkter. Hun er lidenskapelig opptatt av å forstå menneskelig atferd, og å omsette denne forståelsen til gode løsninger. Kombinasjonen av å være designer og ingeniør med bakgrunn som visuell markedsfører, gjør at det ligger naturlig å se etter teknologisk nyvinnende og samtidig lønnsomme løsninger som er brukervennlige, estetisk tiltalende og bærekraftige.
 */
