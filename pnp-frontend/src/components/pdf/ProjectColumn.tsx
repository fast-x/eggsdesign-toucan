import pdf from '@react-pdf/renderer';
import hafferConcrete from '../../assets/fonts/HafferPrototypo-Concrete.otf';
import placeholder from '../../assets/img/placeholder.png';
import { blocksToArray } from '../../helpers';
import { ProjectContribution } from '../../types/Project';
import {
  PDFColumnContainer,
  PDFColumnImageContainer,
  PDFColumnTextContainer,
  PDFDescriptionText,
  PDFImage,
  PDFRow,
  PDFTableDot,
  PDFTitleSmall,
} from './PDFStyles';
import useTranslation from '../../utils/i18n/useTranslation';

const { View, Font, Text } = pdf;

type Props = {
  project: ProjectContribution;
  contribution: string[];
  index: number;
};

export function ProjectColumn({ project, contribution, index }: Props) {
  Font.register({
    family: 'Haffer',
    fonts: [
      { fontWeight: 'normal', src: hafferConcrete },
      { fontWeight: 'bold', src: hafferConcrete },
    ],
  });
  const { localeBlocks, localeString } = useTranslation();
  const { title, client, description, images } = project;
  const descriptionParagraphs = blocksToArray(localeBlocks(description));
  const imageURL = (): string => {
    if (project?.images?.[0]?.asset?.extension === 'gif' && project?.images?.[1]) {
      return project.images?.[1]?.url || placeholder;
    } else {
      return project.images?.[0]?.url || placeholder;
    }
  };

  return (
    <PDFColumnContainer index={index}>
      <PDFColumnImageContainer>
        {(images?.length == 0 && <View style={{ height: '100%' }}></View>) || (
          <PDFImage
            style={{
              height: '100%',
              borderRadius: '2pt',
            }}
            src={`${imageURL()}?h=500`}
          />
        )}
      </PDFColumnImageContainer>

      <PDFColumnTextContainer>
        {client && client.name ? (
          <PDFRow>
            <PDFTableDot size={8} />
            <Text style={{ fontSize: '14pt', marginLeft: '8pt' }}>{client.name}</Text>
          </PDFRow>
        ) : (
          <View style={{ height: '14pt' }}></View>
        )}
        <PDFTitleSmall>{localeString(title)}</PDFTitleSmall>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flex: '1 1 auto',
            width: '100%',
            height: 'auto',
            flexWrap: 'wrap',
          }}>
          {descriptionParagraphs?.length > 0 &&
            descriptionParagraphs.map((descriptionParagraph, i) => (
              <PDFDescriptionText key={`descParagraph-${project._id ?? ''}-${i}`}>
                {descriptionParagraph}
              </PDFDescriptionText>
            ))}
          {contribution.map((contributionParagraph, i) => (
            <PDFDescriptionText key={`contribParagraph-${project._id ?? ''}-${i}`}>
              {contributionParagraph}
            </PDFDescriptionText>
          ))}
        </View>
      </PDFColumnTextContainer>
    </PDFColumnContainer>
  );
}
