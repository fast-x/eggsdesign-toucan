import LanguageContext from '../contexts/LanguageContext';
import { useContext } from 'react';
import styled from 'styled-components';
import { borderRadius, colors } from './styles';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { LanguageIcon } from './editor/LanguageSelectorTools';
import { Language } from '../types/Shared';

export function LanguagePicker() {
  const { currentLanguage, setCurrentLanguage, availableLanguages } = useContext(LanguageContext);
  return (
    <StyledSelectContainer>
      <div className="language-icon">
        <LanguageIcon language={currentLanguage} />
      </div>

      <select onChange={(e): void => setCurrentLanguage && setCurrentLanguage(e.target.value as Language)}>
        <option value={availableLanguages.en}>English</option>
        <option value={availableLanguages.nb}>Norsk</option>
      </select>

      <ChevronDownIcon className="chevron-icon" style={{ color: '#000' }} />
    </StyledSelectContainer>
  );
}

const StyledSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0.8em 0.5em;
  border-radius: 9999px;
  border: 1px solid ${colors.primary.black};
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #efefef;
  }

  .language-icon {
    height: 1.5em;
    width: 1.5em;
    display: flex;
    align-items: center;
    margin-left: 0.5em;
  }

  select {
    border: none;
    background: none;
    padding: 0.5em;
    padding-right: 1.5em;
    padding-left: 2.5em;
    font: inherit;
    cursor: pointer;
    appearance: none;
  }

  .chevron-icon {
    margin-right: 0.5em;
    position: absolute;
    right: 0;
    pointer-events: none;
  }

  .language-icon {
    height: 1.5em;
    width: 1.5em;
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
  }
`;
