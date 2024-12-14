import React, { useContext, useEffect } from 'react';

import { usePDF } from '@react-pdf/renderer';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import useProjectPDFPages from '../../hooks/useProjectPDFPages';
import Project from '../../types/Project';
import useTranslation from '../../utils/i18n/useTranslation';
import PDFExportButton from '../pdf/PDFExportButton';
import PDFPreview from '../pdf/PDFPreview';
import { ProjectPDF } from '../pdf/ProjectPDF';
import ProjectPDFSettings from '../pdf/ProjectPDFSettings';
import { Modal } from './Modal';

interface Props {
  project: Project;
  closeModal: () => void;
}

const labels = {
  export: {
    en: 'Export to PDF',
    nb: 'Exporter til PDF',
  },
  needToEdit: {
    en: 'Need to adjust longform text?',
    nb: 'Trenger du å justere lang tekst?',
  },
  goToLongForm: {
    en: 'Go to longform edit in project',
    nb: 'Gå til longform redigering i prosjekt',
  },
};

export const ModalExportProject: React.FC<Props> = ({ project, closeModal }) => {
  const { localeString } = useTranslation();
  const { currentLanguage } = useContext(LanguageContext);
  const filename = `${project?.client ?? ''} – ${localeString(project.title)}`;

  const { pages, settings, setSettings } = useProjectPDFPages(project);

  const [pdfInstance, update] = usePDF({
    document: <ProjectPDF project={project} documentTitle={filename} lang={currentLanguage} pages={pages} />,
  });

  useEffect(() => {
    update();
  }, [update, project, settings, pages]);

  const footerContent = (
    <ExportButtonContainer>
      <PDFExportButton
        fileName={filename}
        isError={pdfInstance.error}
        isLoading={pdfInstance.loading}
        pdfUrl={pdfInstance.url}
      />
    </ExportButtonContainer>
  );

  return (
    <Modal handleClose={closeModal} headline={localeString(labels.export)} footerContent={footerContent}>
      <PDFPreview blob={pdfInstance.blob} withNav />

      <LinkContainer>
        {localeString(labels.needToEdit)}
        <Link to="edit#Longtext">{localeString(labels.goToLongForm)}</Link>
      </LinkContainer>
      <ProjectPDFSettings settings={settings} setSettings={setSettings} project={project} />
    </Modal>
  );
};

const ExportButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 10px;
  background: #f0f3f4;
  border-radius: 4px;

  font-size: 12px;
`;
