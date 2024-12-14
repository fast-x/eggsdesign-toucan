import pdf from '@react-pdf/renderer';
import hafferConcrete from '../../assets/fonts/HafferPrototypo-Concrete.otf';
import Project from '../../types/Project';
import {
  PDFContentContainer,
  PDFImage,
  PDFLogo,
  PDFPage,
  PDFProjectHeroImageContainer,
  PDFRow,
  PDFTableDot,
  styles,
} from './PDFStyles';
import useTranslation from '../../utils/i18n/useTranslation';

const { View, Font, Text } = pdf;

type Props = {
  project: Project;
};

export function ProjectHeroPage({ project }: Props) {
  Font.register({
    family: 'Haffer',
    fonts: [
      { fontWeight: 'normal', src: hafferConcrete },
      { fontWeight: 'bold', src: hafferConcrete },
    ],
  });

  const hyphenationCallback = (word: string) => [word];
  Font.registerHyphenationCallback(hyphenationCallback);
  const { localeString } = useTranslation();
  const { title, client, images } = project;
  const imageURL = (): string => {
    if (!project.images || project.images.length <= 0) return './placeholder.png';

    if (project.images?.[0]?.asset?.extension === 'gif' && project.images?.[1]) {
      return project.images?.[1]?.url ?? './placeholder.png';
    }

    return project.images?.[0].url ?? './placeholder.png';
  };
  const colorPalette = images?.[0]?.color || { background: '#FFFFFF', foreground: 'black' };
  const imageForegroundColor = colorPalette.foreground ?? '';

  return (
    <PDFPage>
      <PDFContentContainer>
        {images?.[0] && (
          <>
            <PDFProjectHeroImageContainer>
              <PDFImage src={`${imageURL()}?h=1200`} />
            </PDFProjectHeroImageContainer>
          </>
        )}

        <View style={styles.projectHeroTextContainer}>
          <PDFRow>
            <PDFTableDot color="#FFFFFF" />
            <Text style={styles.clientName}>{client}</Text>
          </PDFRow>
          <Text style={styles.projectHeroTitle}>{localeString(title)}</Text>
        </View>
      </PDFContentContainer>
      <PDFLogo color={imageForegroundColor} fixed />
    </PDFPage>
  );
}
