import { useState } from 'react';

import { Document, Page } from 'react-pdf';
import styled from 'styled-components';
import useTranslation from '../../utils/i18n/useTranslation';

import { Button } from '../input/Button';

interface Props {
  blob: Blob | null;
  withNav?: boolean;
}

const labels = {
  next: {
    en: 'Next page',
    nb: 'Neste side',
  },
  prev: {
    en: 'Previous page',
    nb: 'Forrige side',
  },
  of: {
    en: 'out of',
    nb: 'av',
  },
};

export default function PDFPreview({ withNav = false, blob }: Props) {
  const { localeString } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<number>();

  function handleLoadSuccess({ numPages }: { numPages: number }) {
    setPages(numPages);
  }

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  if (pages && currentPage > pages) {
    setCurrentPage(pages);
  }

  return (
    <Container>
      <Document file={blob} onLoadSuccess={handleLoadSuccess}>
        <Page pageNumber={currentPage || 1} />
      </Document>

      {withNav && (
        <nav>
          <Button variant="secondary" size="compact" onClick={prevPage} disabled={currentPage <= 1}>
            {localeString(labels.prev)}
          </Button>
          <div>
            {currentPage} {localeString(labels.of)} {pages || '?'}
          </div>
          <Button
            variant="secondary"
            size="compact"
            onClick={nextPage}
            disabled={(pages && currentPage >= pages) || false}>
            {localeString(labels.next)}
          </Button>
        </nav>
      )}
    </Container>
  );
}

const Container = styled.section`
  margin-bottom: 1.5rem;
  overflow: hidden;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    div {
      text-align: center;
    }
    button {
      padding-left: 21px;
      padding-right: 21px;
      letter-spacing: 0;
    }
  }
  .react-pdf {
    &__Document {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
    }
    &__Page {
      max-width: calc('100% - 2em');
      react-pdf__Page {
        max-width: 100%;
        height: auto !important;
      }
      canvas {
        max-width: 100%;
        height: auto !important;
      }
    }
    &__message {
      padding: 20px;
      color: white;
    }
  }
`;
