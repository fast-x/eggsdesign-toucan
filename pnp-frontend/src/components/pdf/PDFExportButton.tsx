import styled from 'styled-components';
import useTranslation from '../../utils/i18n/useTranslation';
import { AnchorButton, Button } from '../input/Button';
import { colors } from '../styles';

const labels = {
  generate: {
    en: 'Generate PDF',
    nb: 'Generere PDF',
  },
  download: {
    en: 'Download PDF',
    nb: 'Last ned PDF',
  },
  open: {
    en: 'Or open in browser',
    nb: 'Eller åpen i nettleseren',
  },
  error: {
    en: 'Something went wrong',
    nb: 'Noe gikk feil',
  },
};

interface Props {
  label?: string;
  fileName: string;
  pdfUrl?: string | null;
  isError?: string | null;
  isLoading?: boolean;
}
/**
 * A PDF export button
 *
 * Essentially, if the pdf document data has been updated after the PDF was last generated, prompt the user to generate the PDF again.
 * It can take a few seconds to generate the PDF, so we let the user do this manually.
 */
const PDFExportButton = ({ label, fileName, pdfUrl, isError, isLoading }: Props) => {
  const { localeString } = useTranslation();

  // If the PDF document failed to generate
  if (isError) {
    return (
      <Button variant="secondary" className="disabled">
        {localeString(labels.error)}
      </Button>
    );
  }

  // If the PDF document data has been updated after the PDF was last generated, prompt the user to generate the PDF again.
  if (!pdfUrl && !isLoading) {
    return (
      <Button variant="secondary" className="disabled">
        {localeString(labels.generate)} {label}
      </Button>
    );
  }

  return (
    <>
      <DownloadButton href={pdfUrl ?? ''} download={fileName}>
        {localeString(labels.download)}
      </DownloadButton>

      <DownloadLink href={pdfUrl ?? ''} target="_blank">
        {localeString(labels.open)}
      </DownloadLink>
    </>
  );
};

export default PDFExportButton;

const DownloadButton = styled(AnchorButton)`
  display: inline-flex;

  &.disabled {
    opacity: 0.8;
    background: ${colors.neutral3};
  }
`;

const DownloadLink = styled.a`
  color: ${colors.neutral1};
`;
