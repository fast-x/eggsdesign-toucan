import styled from 'styled-components';
import { colors } from '../styles';
import { IconEnglish, IconNorwegian } from '../Icons';
import { Language } from '../../types/Shared';

export function LanguageIcon({ language, ...props }: { language: Language }) {
  switch (language) {
    case 'en':
      return <IconEnglish {...props} />;
    case 'nb':
      return <IconNorwegian {...props} />;
    default:
      return <IconEnglish {...props} />;
  }
}

export const LanguageSelectorButton = styled.button`
  background: none;
  font-size: inherit;
  font-family: inherit;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 4px 0;
  color: ${colors.neutral2};
  margin: 4px 0;
`;

export const ExpandedLanguages = styled.div`
  border-left: 1px solid ${colors.neutral3};
  padding-left: 16px;
`;

export const LanguageLabel = styled.label`
  color: ${colors.neutral2};
  position: relative;
  display: flex;
  align-items: center;
`;

export function LanguageIndicator({
  language,
  anchor = 'center',
}: {
  language: Language;
  anchor?: 'center' | 'bottom';
}) {
  return (
    <LanguageIndicatorContainer className={anchor}>
      <LanguageIndicatorText>{language}</LanguageIndicatorText>
      <LanguageIcon language={language} />
    </LanguageIndicatorContainer>
  );
}

export const LanguageIndicatorContainer = styled.span`
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 0.4em;
  padding: 4px;
  background: #ffffffdd;
  border-radius: 4px;
  border: 1px solid ${colors.neutral3}cc;

  &.bottom {
    bottom: 8px;
  }

  svg {
    height: 1.3em;
    width: 1.3em;
  }
`;

export const LanguageIndicatorText = styled.span`
  text-transform: uppercase;
`;

export function getLanguageNameFromLanguageCode(language: Language): string {
  switch (language) {
    case 'en':
      return 'English';
    case 'nb':
      return 'Norwegian';
    default:
      return language;
  }
}
