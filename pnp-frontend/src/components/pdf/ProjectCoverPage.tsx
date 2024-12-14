import pdf from '@react-pdf/renderer';
import hafferConcrete from '../../assets/fonts/HafferPrototypo-Concrete.otf';
import { blocksToArray, parseTimestamp, truncateString } from '../../helpers';
import Project from '../../types/Project';
import {
  PDFContentContainer,
  PDFDetailsHeading,
  PDFImage,
  PDFLogo,
  PDFPage,
  PDFProjectDetails,
  PDFProjectImageContainer,
  PDFProjectMainGrid,
  PDFProjectTextContainer,
  PDFRow,
  PDFTableDot,
  styles,
} from './PDFStyles';
import { Language } from '../../types/Shared';
import useTranslation from '../../utils/i18n/useTranslation';

const { View, Font, Text } = pdf;

type Props = {
  project: Project;
  lang: Language;
};

const labels = {
  domain: {
    en: 'Domain',
    nb: 'Domene',
  },
  period: {
    en: 'Period',
    nb: 'Periode',
  },
  approach: {
    en: 'Approach',
    nb: 'Approach',
  },
  awards: {
    en: 'Awards',
    nb: 'Priser',
  },
};

export function ProjectCoverPage({ project, lang }: Props) {
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
  const { title, client, description, images, domains, approaches, awards, startYear, endYear } = project;
  const descriptionParagraphs = description?.[lang] ? blocksToArray(description?.[lang]) : [];
  const imageURL = (): string => {
    if (!project.images || project.images.length <= 0) return './placeholder.png';

    if (project.images?.[0]?.asset?.extension === 'gif' && project.images?.[1]) {
      return project.images?.[1]?.url ?? './placeholder.png';
    }

    return project.images?.[0].url ?? './placeholder.png';
  };
  const startDate = startYear ? parseTimestamp(startYear, 'MMM yyyy') : '';
  const endDate = endYear ? parseTimestamp(endYear, 'MMM yyyy') : '';
  const details = [
    {
      heading: localeString(labels.domain),
      entries: domains
        ? domains
            .filter((d) => typeof d !== 'undefined')
            .map((domain, index) => (
              <Text key={`tag-${domain?.name ?? index}`} style={styles.detailsText}>
                {domain?.name ?? '-'}
              </Text>
            ))
        : null,
    },
    {
      heading: localeString(labels.period),
      entries: startYear
        ? [
            <Text key="periodDetail" style={styles.detailsText}>
              {startDate} {endDate && `- ${endDate}`}
            </Text>,
          ]
        : null,
    },
    {
      heading: localeString(labels.approach),
      entries: approaches
        ? approaches.map((approach, index) => (
            <Text key={`tag-${String(approach?._id)}_${index}`} style={styles.detailsText}>
              {approach?.name?.[lang] || 'No translated name'}
            </Text>
          ))
        : null,
    },
    {
      heading: localeString(labels.awards),
      entries: awards
        ? awards.map((award, index) => (
            <Text key={`award-${award?.name ?? index}`} style={styles.detailsText}>
              {award?.name ?? ''}
            </Text>
          ))
        : null,
    },
  ];
  const descriptionString = truncateString(descriptionParagraphs.join(' '), 500);

  return (
    <PDFPage bgColor="#F5F0E6">
      <PDFContentContainer verticalStack>
        <PDFProjectDetails>
          {details.map((detail) =>
            detail.entries ? (
              <View key={`detailCol_${detail.heading}`} style={styles.detailsBlock}>
                <PDFDetailsHeading>{detail.heading}</PDFDetailsHeading>
                <View style={styles.detailsEntriesWrapper}>{detail.entries}</View>
              </View>
            ) : null,
          )}
        </PDFProjectDetails>
        <PDFProjectMainGrid>
          <PDFProjectTextContainer>
            <PDFRow>
              <PDFTableDot size={8} />
              <Text style={styles.clientName}>{client}</Text>
            </PDFRow>
            <View style={{ width: '100%' }}>
              <Text style={styles.projectTitle}>{localeString(title)}</Text>
              <Text style={styles.projectDescription}>{descriptionString}</Text>
            </View>
          </PDFProjectTextContainer>
          <PDFProjectImageContainer>
            <PDFImage src={`${imageURL()}?h=1200`} />
          </PDFProjectImageContainer>
        </PDFProjectMainGrid>
      </PDFContentContainer>

      <PDFLogo />
    </PDFPage>
  );
}
