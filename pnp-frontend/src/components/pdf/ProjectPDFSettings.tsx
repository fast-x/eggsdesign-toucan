import { useState } from 'react';
import useDebounce from 'react-use/lib/useDebounce';
import styled from 'styled-components';
import { DetailsPageSettings } from '../../hooks/useProjectPDFPages';
import useTranslation from '../../utils/i18n/useTranslation';
import Checkbox from '../input/Checkbox';
import Project from '../../types/Project';

type Props = {
  setSettings: (settings: DetailsPageSettings) => void;
  settings: DetailsPageSettings;
  project: Project;
};

const labels = {
  heroSlide: {
    en: 'Hero slide (one-pager)',
    nb: 'Hero slide (one-pager)',
  },
  longForm: {
    en: 'Long form text',
    nb: 'Langformtekst',
  },
  longFormSlideTitle: {
    en: 'Slide title for long form text',
    nb: 'Sidetittel for langformtekst',
  },
  details: {
    en: 'Project details',
    nb: 'Prosjektdetaljer',
  },
  clientName: {
    en: 'Client name',
    nb: 'Klientens navn',
  },
  reference: {
    en: 'Reference',
    nb: 'Referanse',
  },
  period: {
    en: 'Start and end date',
    nb: 'Start- og sluttdato',
  },
  budget: {
    en: 'Budget',
    nb: 'Budsjett',
  },
  domain: {
    en: 'Domain',
    nb: 'Domene',
  },
  approaches: {
    en: 'Approaches',
    nb: 'Approaches',
  },
  awards: {
    en: 'Awards',
    nb: 'Priser',
  },
  team: {
    en: 'Team',
    nb: 'Team',
  },
  referenceValue: {
    en: 'Reference',
    nb: 'Referanse',
  },
};

const ProjectPDFSettings = ({ setSettings, settings, project }: Props) => {
  const { localeString } = useTranslation();
  const [referenceValue, setReferenceValue] = useState(settings.referenceValue);
  const { longtext } = project;

  const toggleDetailsInformation = (settingKey: keyof DetailsPageSettings) => () => {
    setSettings({ ...settings, [settingKey]: !settings[settingKey] });
  };

  useDebounce(
    () => {
      setSettings({ ...settings, referenceValue });
    },
    800,
    [referenceValue],
  );

  const SettingsCheckbox = ({ settingsKey }: { settingsKey: keyof Omit<DetailsPageSettings, 'referenceValue'> }) => (
    <Checkbox
      id={settingsKey}
      label={localeString(labels[settingsKey])}
      checked={settings[settingsKey]}
      onChange={toggleDetailsInformation(settingsKey)}
    />
  );

  return (
    <DetailsCheckboxContainer>
      <SettingsCheckbox settingsKey="heroSlide" />
      {/* settings.details && (
        <CheckboxListContainer>
          <SettingsCheckbox settingsKey="clientName" />
          <SettingsCheckbox settingsKey="reference" />
          {settings.reference && (
            <textarea
              name="referenceValue"
              id="referenceValue"
              cols={30}
              rows={5}
              value={referenceValue}
              onChange={(e) => setReferenceValue(e.target.value)}></textarea>
          )}
          <SettingsCheckbox settingsKey="period" />
          <SettingsCheckbox settingsKey="budget" />
          <SettingsCheckbox settingsKey="domain" />
          <SettingsCheckbox settingsKey="approaches" />
          <SettingsCheckbox settingsKey="awards" />
        </CheckboxListContainer>
      )*/}
      {longtext && <SettingsCheckbox settingsKey="longForm" />}
      <SettingsCheckbox settingsKey="team" />
    </DetailsCheckboxContainer>
  );
};

export default ProjectPDFSettings;

const DetailsCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 12px;
  label {
    font-weight: 500;
  }
`;

const CheckboxListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 12px;
  margin-left: 10px;
`;
