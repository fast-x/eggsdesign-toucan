import { FC } from 'react';
import PdfRenderer from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';
import { Block } from '@sanity/types/dist/dts';
import placeholder from '../../assets/img/eggs-logo.png';
import { ProjectLongPDFPage } from '../../hooks/useProjectPDFPages';
import Project from '../../types/Project';
import { PDFDescriptionText, PDFNoPaddingPage } from './PDFStyles';
import { ProjectCoverPage } from './ProjectCoverPage';
import { Language } from '../../types/Shared';
import { ProjectHeroPage } from './ProjectHeroPage';
import { projectImagesGridStyles } from './ProjectImagesGridStyles';
import { ProjectTeamPage } from './ProjectTeamPage';

const { Document, View, Image } = PdfRenderer;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  project: Project;
  documentTitle: string;
  lang: Language;
  pages: ProjectLongPDFPage[];
}

export const ProjectPDF: FC<Props> = ({ project, documentTitle, lang, pages }) => {
  function blocksToPDFText(blocks: Array<Block & { hidden?: boolean }>): JSX.Element[] | null {
    return blocks.map((block) => {
      if (block.style === 'h2' || block.style === 'h1' || block.style === 'h3')
        return (
          <PDFDescriptionText
            minPresenceAhead={2}
            key={block._key}
            style={{ fontWeight: 'bold', marginBottom: '10pt' }}>
            {block.children.map((child) => child.text).join('')}
          </PDFDescriptionText>
        );
      else
        return (
          <PDFDescriptionText minPresenceAhead={0} key={block._key}>
            {block.children.map((child) => child.text).join('')}
          </PDFDescriptionText>
        );
    });
  }

  const renderImagesGrid = (page: ProjectLongPDFPage) => {
    if (!page.images || page.images.length === 0) {
      return (
        <View style={{}}>
          <Image
            style={{
              height: '200pt',
              objectFit: 'contain',
            }}
            src={`${placeholder}?h=200`}
          />
        </View>
      );
    }
    if (page.images.length === 1) {
      return (
        <View style={projectImagesGridStyles.oneImageOuterContainer}>
          <View style={projectImagesGridStyles.oneImageContainer}>
            <Image
              style={{ ...projectImagesGridStyles.oneImageImage, objectFit: page.images[0]?.url ? 'cover' : 'contain' }}
              src={page.images[0]?.url ? `${page.images[0]?.url}?h=600` : `${placeholder}?h=200`}
            />
          </View>
        </View>
      );
    }
    if (page.images.length === 2) {
      return (
        <>
          <View style={projectImagesGridStyles.twoImageTopContainer}>
            <Image
              style={{ ...projectImagesGridStyles.twoImageImage, objectFit: page.images[0]?.url ? 'cover' : 'contain' }}
              src={page.images[0]?.url ? `${page.images[0]?.url}?h=600` : `${placeholder}?h=200`}
            />
          </View>
          <View style={projectImagesGridStyles.twoImageBottomContainer}>
            <Image
              style={{ ...projectImagesGridStyles.twoImageImage, objectFit: page.images[1]?.url ? 'cover' : 'contain' }}
              src={page.images[1]?.url ? `${page.images[1]?.url}?h=600` : `${placeholder}?h=200`}
            />
          </View>
        </>
      );
    }
    if (page.images.length >= 3) {
      return (
        <>
          <View style={projectImagesGridStyles.threeImageTopRow}>
            <View style={projectImagesGridStyles.threeImageTopRowImageContainer}>
              <Image
                style={{
                  ...projectImagesGridStyles.threeImageTopRowImage,
                  objectFit: page.images[0]?.url ? 'cover' : 'contain',
                }}
                src={page.images[0]?.url ? `${page.images[0]?.url}?h=600` : `${placeholder}?h=200`}
              />
            </View>
            <View style={projectImagesGridStyles.threeImageTopRowImageContainer}>
              <Image
                style={{
                  ...projectImagesGridStyles.threeImageTopRowImage,
                  objectFit: page.images[1]?.url ? 'cover' : 'contain',
                }}
                src={page.images[1]?.url ? `${page.images[1]?.url}?h=600` : `${placeholder}?h=200`}
              />
            </View>
          </View>
          <View style={projectImagesGridStyles.threeImageBottomContainer}>
            <Image
              style={{
                ...projectImagesGridStyles.threeImageBottomImage,
                objectFit: page.images[2]?.url ? 'cover' : 'contain',
              }}
              src={page.images[2]?.url ? `${page.images[2]?.url}?h=600` : `${placeholder}?h=200`}
            />
          </View>
        </>
      );
    }
    return <View></View>;
  };

  return (
    <Document title={documentTitle}>
      {pages[0] && pages[0].type === 'hero' && <ProjectHeroPage project={project} />}
      <ProjectCoverPage project={project} lang={lang} />
      {pages.map((page, index) => {
        if (page.type === 'content' && !page?.blocks?.length) {
          return null;
        }
        if (page.type === 'team') {
          return <ProjectTeamPage key={`page-${index}`} project={project} lang={lang} />;
        }

        if (page.type === 'content' && page.blocks && page.blocks.length > 0) {
          return (
            <PDFNoPaddingPage key={`page-${index}`}>
              <View style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
                <View
                  style={{
                    width: '50%',
                    display: 'flex',
                    padding: '64px 64px 64px 142pt',
                    minHeight: '100vh',
                    justifyContent: 'center',
                  }}>
                  {blocksToPDFText(page.blocks)}
                </View>
                <View
                  style={{
                    height: '100vh',
                    width: '51vw',
                    paddingRight: '142pt',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    marginRight: '-1vw',
                  }}>
                  {renderImagesGrid(page)}
                </View>
              </View>
            </PDFNoPaddingPage>
          );
        }
        return null;
      })}
    </Document>
  );
};
